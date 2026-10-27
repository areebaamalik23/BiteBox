import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Star, Truck, Leaf, ShieldCheck, HeartHandshake, Plus, Check, Smartphone } from 'lucide-react'
import Reveal from './Reveal.jsx'
import FoodCard from './FoodCard.jsx'
import FoodImage from './FoodImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useInView, prefersReducedMotion } from '../hooks/useInView.js'
import { foods, categories, reviews, stats, formatPrice } from '../data/foods.js'

export function SectionHead({ eyebrow, title, sub, action }) {
  return (
    <Reveal className="section-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {sub && <p className="muted">{sub}</p>}
      </div>
      {action}
    </Reveal>
  )
}

export function Bestsellers() {
  const list = [...foods].filter((f) => f.badge === 'Bestseller').slice(0, 4)
  return (
    <section className="section container" id="bestsellers">
      <SectionHead eyebrow="Crowd favourites" title="Featured bestsellers" action={<Link to="/menu" className="text-link">See all <ArrowRight size={16} /></Link>} />
      <div className="food-grid">{list.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}</div>
    </section>
  )
}

export function CategoryTiles() {
  const navigate = useNavigate()
  return (
    <section className="section container">
      <SectionHead eyebrow="Browse" title="Pick your craving" />
      <div className="cat-grid">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={(i % 4) * 60} className={`cat-tile ${i === 0 ? 'big' : ''}`}>
            <button onClick={() => navigate(`/menu?category=${encodeURIComponent(c.name)}`)} aria-label={`Browse ${c.name}`}>
              <FoodImage src={c.image} alt="" />
              <span className="cat-label"><span aria-hidden="true">{c.emoji}</span> {c.name}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export function Deals() {
  const { addItem } = useCart()
  const [added, setAdded] = useState(null)
  const deals = foods.filter((f) => f.oldPrice)
  const add = (id) => { addItem(id); setAdded(id); setTimeout(() => setAdded(null), 1300) }
  return (
    <section className="section deals-band">
      <div className="container">
        <SectionHead eyebrow="Save more" title="Combo deals" sub="Bundles priced below buying each item separately." />
        <div className="deal-grid">
          {deals.map((d, i) => (
            <Reveal key={d.id} delay={i * 90} className="deal-card">
              <FoodImage src={d.image} alt={d.name} />
              <div className="deal-shade" />
              <span className="badge badge-deal big">Save {Math.round((1 - d.price / d.oldPrice) * 100)}%</span>
              <div className="deal-body">
                <h3>{d.name}</h3>
                <p>{d.description}</p>
                <div className="food-row">
                  <span className="price">{formatPrice(d.price)}<s>{formatPrice(d.oldPrice)}</s></span>
                  <button className={`btn btn-small ${added === d.id ? 'btn-success pop' : 'btn-primary'}`} onClick={() => add(d.id)} aria-label={`Add ${d.name} to cart`}>
                    {added === d.id ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add</>}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const groups = [
  { key: 'burger', title: '1. Choose a burger', cats: ['Classic Burgers', 'Premium Burgers', 'Chicken Burgers'] },
  { key: 'side', title: '2. Add a side', cats: ['Fries & Sides'] },
  { key: 'drink', title: '3. Pick a drink', cats: ['Drinks & Shakes'] },
]

export function BuildMeal() {
  const { addItem } = useCart()
  const options = Object.fromEntries(groups.map((g) => [g.key, foods.filter((f) => g.cats.includes(f.category))]))
  const [pick, setPick] = useState(() => Object.fromEntries(groups.map((g) => [g.key, options[g.key][0].id])))
  const [done, setDone] = useState(false)
  const chosen = groups.map((g) => foods.find((f) => f.id === pick[g.key]))
  const total = chosen.reduce((n, f) => n + f.price, 0)
  const addAll = () => { chosen.forEach((f) => addItem(f.id)); setDone(true); setTimeout(() => setDone(false), 1500) }
  return (
    <section className="section container">
      <SectionHead eyebrow="Your way" title="Build your meal" sub="Pick a burger, a side and a drink, and add the three to your cart together." />
      <Reveal className="build">
        <div className="build-steps">
          {groups.map((g) => (
            <fieldset key={g.key}>
              <legend>{g.title}</legend>
              <div className="build-options">
                {options[g.key].map((f) => (
                  <label key={f.id} className={`opt ${pick[g.key] === f.id ? 'on' : ''}`}>
                    <input type="radio" name={`build-${g.key}`} checked={pick[g.key] === f.id} onChange={() => setPick((p) => ({ ...p, [g.key]: f.id }))} />
                    <FoodImage src={f.image} alt="" />
                    <span>{f.name}<small>{formatPrice(f.price)}</small></span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <aside className="build-sum">
          <h3>Your meal</h3>
          <ul>{chosen.map((f) => <li key={f.id}><span>{f.name}</span><span>{formatPrice(f.price)}</span></li>)}</ul>
          <div className="sum-row sum-total"><span>Items total</span><span>{formatPrice(total)}</span></div>
          <button className={`btn btn-block ${done ? 'btn-success' : 'btn-primary'}`} onClick={addAll}>{done ? 'Added to cart' : 'Add meal to cart'}</button>
          <p className="muted small">No bundle discount here: you pay the listed price of each item.</p>
        </aside>
      </Reveal>
    </section>
  )
}

const reasons = [
  { icon: Truck, title: 'Clear delivery fee', text: 'Delivery is always shown separately, so there are no surprises at checkout.' },
  { icon: Leaf, title: 'Freshness first', text: 'Menu written around fresh produce, made-to-order patties and real dough.' },
  { icon: ShieldCheck, title: 'Quality you can see', text: 'Honest photos and descriptions, plus transparent ratings on every dish.' },
  { icon: HeartHandshake, title: 'Friendly service', text: 'A simple, accessible flow that works on any screen and with a keyboard.' },
]

export function WhyUs() {
  return (
    <section className="section why">
      <div className="container">
        <SectionHead eyebrow="The BiteBox way" title="Why choose BiteBox?" />
        <div className="reasons">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="reason"><span className="reason-icon"><Icon size={24} /></span><h3>{title}</h3><p>{text}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = reviews.length
  useEffect(() => {
    if (paused || prefersReducedMotion()) return
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000)
    return () => clearInterval(t)
  }, [paused, n])
  return (
    <section className="section container">
      <SectionHead eyebrow="Kind words" title="What people say"  />
      <Reveal className="slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)} role="region" aria-roledescription="carousel" aria-label="Customer reviews">
        <div className="slider-track" style={{ transform: `translateX(-${i * 100}%)` }}>
          {reviews.map((r, idx) => (
            <figure key={r.id} className="slide" aria-hidden={idx !== i} aria-label={`Review ${idx + 1} of ${n}`}>
              <div className="stars" aria-label={`${r.rating} out of 5 stars`}>{Array.from({ length: r.rating }, (_, k) => <Star key={k} size={18} fill="currentColor" />)}</div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption><span className="avatar" aria-hidden="true">{r.name.slice(-1)}</span><span><b>{r.name}</b><small>{r.role}</small></span></figcaption>
            </figure>
          ))}
        </div>
        <div className="slider-ctrl">
          <button className="icon-circle" onClick={() => setI((x) => (x - 1 + n) % n)} aria-label="Previous review"><ChevronLeft size={20} /></button>
          <div className="dots">{reviews.map((r, idx) => <button key={r.id} className={idx === i ? 'on' : ''} onClick={() => setI(idx)} aria-label={`Go to review ${idx + 1}`} aria-current={idx === i} />)}</div>
          <button className="icon-circle" onClick={() => setI((x) => (x + 1) % n)} aria-label="Next review"><ChevronRight size={20} /></button>
        </div>
      </Reveal>
    </section>
  )
}

const KEY = 'bitebox-offer-end'
const DURATION = 8 * 3600 * 1000
function getEnd() {
  try {
    let end = Number(localStorage.getItem(KEY))
    if (!end || end <= Date.now()) { end = Date.now() + DURATION; localStorage.setItem(KEY, String(end)) }
    return end
  } catch { return Date.now() + DURATION }
}

export function LimitedOffer() {
  const { addItem } = useCart()
  const deal = foods.find((f) => f.id === 32)
  const [end, setEnd] = useState(getEnd)
  const [now, setNow] = useState(() => Date.now())
  const [added, setAdded] = useState(false)
  useEffect(() => {
    const t = setInterval(() => { const n = Date.now(); setNow(n); if (n >= end) setEnd(getEnd()) }, 1000)
    return () => clearInterval(t)
  }, [end])
  const left = Math.max(0, end - now)
  const parts = [['Hours', Math.floor(left / 3600000)], ['Minutes', Math.floor(left / 60000) % 60], ['Seconds', Math.floor(left / 1000) % 60]]
  return (
    <section className="section container">
      <Reveal className="offer">
        <FoodImage src={deal.image} alt={deal.name} />
        <div className="offer-body">
          <span className="eyebrow">Limited-time offer</span>
          <h2>{deal.name}</h2>
          <p>{deal.description}</p>
          <p className="price big">{formatPrice(deal.price)}<s>{formatPrice(deal.oldPrice)}</s></p>
          <div className="countdown" role="timer" aria-label="Time left on the offer">
            {parts.map(([label, v]) => <div key={label}><b>{String(v).padStart(2, '0')}</b><span>{label}</span></div>)}
          </div>
          <button className={`btn btn-lg ${added ? 'btn-success' : 'btn-primary'}`} onClick={() => { addItem(deal.id); setAdded(true); setTimeout(() => setAdded(false), 1400) }}>{added ? 'Added' : 'Grab the deal'}</button>
          {/* <p className="demo-note"> timer: it restarts automatically so the page always has a live example.</p> */}
        </div>
      </Reveal>
    </section>
  )
}

function Counter({ to, suffix = '', decimals = 0 }) {
  const [ref, inView] = useInView(0.4)
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) { setVal(to); return }
    let raf, start
    const tick = (t) => {
      start = start ?? t
      const p = Math.min((t - start) / 1600, 1)
      setVal(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref}>{Number(val.toFixed(decimals)).toLocaleString('en-US', { minimumFractionDigits: decimals })}{suffix}</span>
}

export function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stat-grid">
          {stats.map((s) => <div key={s.label} className="stat"><b><Counter to={s.value} suffix={s.suffix} decimals={s.decimals || 0} /></b><span>{s.label}</span></div>)}
        </div>
        {/* <p className="demo-note center">Figures are sample data for this demo, not real restaurant results.</p> */}
      </div>
    </section>
  )
}

export function PromoNewsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', msg: '' })
  const subscribe = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus({ type: 'error', msg: 'Enter a valid email address, like name@example.com.' }); return }
    setStatus({ type: 'success', msg: 'Thanks! This is a demo, so your email was not saved or sent anywhere.' })
    setEmail('')
  }
  return (
    <section className="section container">
      <Reveal className="promo">
        <div>
          <span className="eyebrow">Stay in the loop</span>
          <h2>Get menu drops and secret deals</h2>
          {/* <p>Join the (demo) list for new dishes and offers. A BiteBox mobile app is only a concept for now.</p> */}
          <form onSubmit={subscribe} noValidate>
            <label htmlFor="news-email" className="sr-only">Email address</label>
            <div className="news-row">
              <input id="news-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={status.type === 'error'} />
              <button className="btn btn-dark" type="submit">Subscribe</button>
            </div>
            {status.msg && <p className={`form-msg ${status.type}`} role="status">{status.msg}</p>}
          </form>
        </div>
        <div className="phone" aria-hidden="true">
          <div className="phone-screen"><Smartphone size={26} /><b>BiteBox</b><span>App concept</span><i /><i /><i className="short" /></div>
        </div>
      </Reveal>
    </section>
  )
}
