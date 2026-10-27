import { Minus, Plus, Trash2 } from 'lucide-react'
import FoodImage from './FoodImage.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/foods.js'

export default function CartItem({ item }) {
  const { changeQty, removeItem } = useCart()
  return (
    <li className="cart-item">
      <FoodImage src={item.image} alt={item.name} className="cart-thumb" />
      <div className="cart-info">
        <h3>{item.name}</h3>
        <span className="muted">{formatPrice(item.price)} each</span>
      </div>
      <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
        <button onClick={() => changeQty(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus size={16} /></button>
        <span aria-live="polite">{item.qty}</span>
        <button onClick={() => changeQty(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus size={16} /></button>
      </div>
      <strong className="line-total">{formatPrice(item.price * item.qty)}</strong>
      <button className="icon-btn" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={18} /></button>
    </li>
  )
}
