const items = ['Free demo delivery over $30', 'Smash burgers made to order', 'New: Truffle Stack', 'Combo deals up to 20% off', 'Fresh dough pizzas', 'Shakes thick enough for a spoon']

export default function Marquee() {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t) => <li key={t}>✦ {t}</li>)}
    </ul>
  )
  return <div id="promo" className="marquee">{row(false)}{row(true)}</div>
}
