import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu as MenuIcon, X, Search, Sun, Moon } from 'lucide-react'
import Logo from './Logo.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useTheme } from '../hooks/useTheme.js'

const links = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()
  const [theme, toggleTheme] = useTheme()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const searchRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false); setSearchOpen(false) }, [pathname])
  useEffect(() => { if (searchOpen) searchRef.current?.focus() }, [searchOpen])
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setSearchOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/menu${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`)
    setSearchOpen(false)
  }
  const onHero = pathname === '/' && !scrolled && !open

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${onHero ? 'on-hero' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" aria-label="BiteBox home"><Logo /></Link>
        <nav className="nav-links" aria-label="Main">
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'}>{l.label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <button className="icon-circle" onClick={() => setSearchOpen((s) => !s)} aria-label="Search the menu" aria-expanded={searchOpen}><Search size={20} /></button>
          <button className="icon-circle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/cart" className="icon-circle cart-link" aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={20} />
            {count > 0 && <span key={count} className="cart-badge">{count}</span>}
          </Link>
          <button className="icon-circle nav-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><MenuIcon size={22} /></button>
        </div>
      </div>

      <div className={`search-panel ${searchOpen ? 'open' : ''}`}>
        <form className="container" onSubmit={submitSearch} role="search">
          <label htmlFor="nav-search" className="sr-only">Search foods</label>
          <Search size={18} aria-hidden="true" />
          <input id="nav-search" ref={searchRef} type="search" placeholder="Search burgers, pizza, shakes..." value={q} onChange={(e) => setQ(e.target.value)} tabIndex={searchOpen ? 0 : -1} />
          <button className="btn btn-primary btn-small" type="submit" tabIndex={searchOpen ? 0 : -1}>Search</button>
        </form>
      </div>

      <div className={`drawer-backdrop ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-label="Mobile menu" aria-hidden={!open}>
        <div className="drawer-top"><Logo /><button className="icon-circle" onClick={() => setOpen(false)} aria-label="Close menu"><X size={22} /></button></div>
        <nav>
          {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === '/'} tabIndex={open ? 0 : -1}>{l.label}</NavLink>)}
          <NavLink to="/cart" tabIndex={open ? 0 : -1}>Cart {count > 0 && `(${count})`}</NavLink>
        </nav>
      </aside>
    </header>
  )
}
