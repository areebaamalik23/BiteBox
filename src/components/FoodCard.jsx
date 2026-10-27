import { useEffect, useRef, useState } from 'react'
import { Star, Plus, Check, Eye } from 'lucide-react'
import FoodImage from './FoodImage.jsx'
import Reveal from './Reveal.jsx'
import QuickView from './QuickView.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/foods.js'

export default function FoodCard({ food, index = 0 }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [quick, setQuick] = useState(false)
  const timer = useRef(null)
  const trigger = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  const handleAdd = () => {
    addItem(food.id)
    setAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1400)
  }
  const closeQuick = () => { setQuick(false); trigger.current?.focus() }
  const discount = food.oldPrice ? Math.round((1 - food.price / food.oldPrice) * 100) : 0

  return (
    <Reveal as="article" className="food-card" delay={(index % 4) * 70}>
      <div className="food-img-wrap">
        <FoodImage src={food.image} alt={food.name} />
        <div className="badges">
          {discount > 0 && <span className="badge badge-deal">-{discount}%</span>}
          {food.badge && food.badge !== 'Deal' && <span className={`badge badge-${food.badge.toLowerCase()}`}>{food.badge}</span>}
        </div>
        <button ref={trigger} className="qv-btn" onClick={() => setQuick(true)} aria-label={`Quick view ${food.name}`}><Eye size={18} /></button>
      </div>
      <div className="food-body">
        <span className="food-cat">{food.category}</span>
        <div className="food-row">
          <h3>{food.name}</h3>
          <span className="rating" aria-label={`Rated ${food.rating} out of 5`}><Star size={14} fill="currentColor" /> {food.rating}</span>
        </div>
        <p className="food-desc">{food.description}</p>
        <div className="food-row food-foot">
          <span className="price">{formatPrice(food.price)}{food.oldPrice && <s>{formatPrice(food.oldPrice)}</s>}</span>
          <button className={`btn btn-small ${added ? 'btn-success pop' : 'btn-primary'}`} onClick={handleAdd} aria-label={`Add ${food.name} to cart`}>
            {added ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add</>}
          </button>
        </div>
      </div>
      {quick && <QuickView food={food} added={added} onAdd={handleAdd} onClose={closeQuick} />}
    </Reveal>
  )
}
