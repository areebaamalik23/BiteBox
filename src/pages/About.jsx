import { Link } from 'react-router-dom'
import { Sprout, Smile, Recycle } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import FoodImage from '../components/FoodImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { Stats } from '../components/HomeSections.jsx'

const values = [
  { icon: Sprout, title: 'Simple, fresh food', text: 'Short ingredient lists and honest flavours.' },
  { icon: Smile, title: 'Easy for everyone', text: 'Clear prices, readable pages and keyboard-friendly controls.' },
  { icon: Recycle, title: 'Less waste', text: 'Made-to-order thinking, so nothing sits around.' },
]

export default function About() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="About BiteBox" sub="A fictional food brand created to showcase a complete React ordering experience." />
      <section className="container page-body about-grid">
        <Reveal>
          <h2>Comfort food, made effortless</h2>
          <p>BiteBox imagines a kitchen that cooks classic comfort food (burgers, pizza, fried chicken, desserts and shakes) and makes ordering feel effortless.</p>
          <p>Everything here, including dishes, reviews, statistics and contact details, is sample content for a portfolio demo. No real restaurant sits behind it.</p>
          <Link to="/menu" className="btn btn-primary">See the menu</Link>
        </Reveal>
        <Reveal delay={120} className="about-photos">
          <FoodImage className="about-img a1" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=70" alt="A warm restaurant interior" />
          <FoodImage className="about-img a2" src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=70" alt="A juicy cheeseburger" />
        </Reveal>
      </section>
      <section className="container page-body" style={{ paddingTop: 0 }}>
        <h2 className="section-title">What we care about</h2>
        <div className="reasons three">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="reason"><span className="reason-icon"><Icon size={24} /></span><h3>{title}</h3><p>{text}</p></Reveal>
          ))}
        </div>
      </section>
      <Stats />
    </>
  )
}
