import Hero from '../components/Hero.jsx'
import Marquee from '../components/Marquee.jsx'
import MenuBrowser from '../components/MenuBrowser.jsx'
import { Bestsellers, CategoryTiles, Deals, BuildMeal, WhyUs, Testimonials, LimitedOffer, Stats, PromoNewsletter, SectionHead } from '../components/HomeSections.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Bestsellers />
      <CategoryTiles />
      <section className="section container" id="popular">
        <SectionHead eyebrow="Order" title="Popular menu" sub="Search, filter and sort, then add anything to your cart." />
        <MenuBrowser limit={8} />
      </section>
      <Deals />
      <BuildMeal />
      <WhyUs />
      <Testimonials />
      <LimitedOffer />
      <Stats />
      <PromoNewsletter />
    </>
  )
}
