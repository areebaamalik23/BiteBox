import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, Star, ShoppingBag, Check } from 'lucide-react'
import FoodImage from './FoodImage.jsx'
import { formatPrice } from '../data/foods.js'

export default function QuickView({ food, added, onAdd, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="qv-title" onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className="modal-close" onClick={onClose} aria-label="Close quick view"><X size={20} /></button>
        <FoodImage className="modal-img" src={food.image.replace('w=700', 'w=900')} alt={food.name} eager />
        <div className="modal-body">
          <span className="eyebrow">{food.category}</span>
          <h2 id="qv-title">{food.name}</h2>
          <p className="rating"><Star size={15} fill="currentColor" /> {food.rating} <span className="muted">· popularity {food.popularity}/100</span></p>
          <p className="muted">{food.description}</p>
          <div className="modal-price">
            <strong>{formatPrice(food.price)}</strong>
            {food.oldPrice && <s>{formatPrice(food.oldPrice)}</s>}
          </div>
          <button className={`btn btn-lg ${added ? 'btn-success' : 'btn-primary'}`} onClick={onAdd}>
            {added ? <><Check size={18} /> Added to cart</> : <><ShoppingBag size={18} /> Add to cart</>}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
