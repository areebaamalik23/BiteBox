import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Pause, Play, ChevronDown, Flame, Star } from 'lucide-react'
import FoodImage from './FoodImage.jsx'

// Put your MP4 at public/videos/hero.mp4 (see public/videos/README.txt)
export const HERO_VIDEO = '/videos/hero.mp4'
const POSTER = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=70'
const PLATE = 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=75'

export default function Hero() {
  const videoRef = useRef(null)
  const [videoOk, setVideoOk] = useState(true)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { v.pause(); return }
    const p = v.play()
    if (p && p.catch) p.catch(() => setPlaying(false))
  }, [videoOk])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => {}); else v.pause()
  }

  return (
    <section className="hero" aria-label="Welcome">
      <div className="hero-media" style={{ backgroundImage: `url(${POSTER})` }}>
        {videoOk ? (
          <video ref={videoRef} className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={POSTER}
            onError={() => setVideoOk(false)} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-hidden="true">
            <source src={HERO_VIDEO} type="video/mp4" onError={() => setVideoOk(false)} />
          </video>
        ) : (
          <div className="hero-fallback" aria-hidden="true" />
        )}
        <div className="hero-overlay" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-in" style={{ '--i': 0 }}><Flame size={14} /> Fresh off the grill</span>
          <h1 className="hero-in" style={{ '--i': 1 }}>Cravings Deserve <span className="accent">Better.</span></h1>
          <p className="hero-in" style={{ '--i': 2 }}>Smashed patties, melted cheese and everything you love, built your way. Browse a 33-dish menu and see how a modern ordering flow feels.</p>
          <div className="hero-actions hero-in" style={{ '--i': 3 }}>
            <Link to="/menu" className="btn btn-primary btn-lg">Order Now <ArrowRight size={18} /></Link>
            <a href="#popular" className="btn btn-glass btn-lg" onClick={(e) => { e.preventDefault(); document.getElementById('popular')?.scrollIntoView({ behavior: 'smooth' }) }}>Explore Menu</a>
          </div>
          {/* <p className="demo-note hero-in" style={{ '--i': 4 }}>Demo site: no real orders or payments.</p> */}
        </div>
        <div className="hero-plate hero-in" style={{ '--i': 2 }}>
          <FoodImage className="plate-img" src={PLATE} alt="Truffle Stack burger" eager />
          <span className="float-chip chip-a"><Star size={14} fill="currentColor" /> 4.9 Truffle Stack</span>
          <span className="float-chip chip-b">🔥 Grilled to order</span>
        </div>
      </div>

      {videoOk && (
        <button className="video-toggle" onClick={toggle} aria-label={playing ? 'Pause background video' : 'Play background video'}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}
      <button className="scroll-cue" onClick={() => document.getElementById('promo')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll down"><ChevronDown size={22} /></button>
    </section>
  )
}
