import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react'
import Logo from './Logo.jsx'

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com' },
  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com' },
  { Icon: Twitter, label: 'X (Twitter)', href: 'https://x.com' },
  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-note">A portfolio demo built with React. No real orders are taken, nothing is delivered and no payments are processed.</p>
          <div className="socials">
            {socials.map(({ Icon, label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (demo link to the platform home page)`}><Icon size={18} /></a>
            ))}
          </div>
        </div>
        <nav aria-label="Footer">
          <h4>Explore</h4>
          <Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/cart">Cart</Link>
        </nav>
        <nav aria-label="Menu categories">
          <h4>Popular</h4>
          <Link to="/menu?category=Classic%20Burgers">Burgers</Link>
          <Link to="/menu?category=Pizza">Pizza</Link>
          <Link to="/menu?category=Desserts">Desserts</Link>
          <Link to="/menu?category=Combos">Combo deals</Link>
        </nav>
        <div>
          <h4>Sample contact details</h4>
          <p><Mail size={16} /> hello@example.com</p>
          <p><Phone size={16} /> +00 000 000 0000</p>
          <p><MapPin size={16} /> 123 Sample Street, Demo City</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} BiteBox demo. All details are placeholders.</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
      </div>
    </footer>
  )
}
