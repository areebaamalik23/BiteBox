import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/foods.js'

const empty = { name: '', phone: '', address: '', notes: '' }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name (at least 2 characters).'
  if (!/^\+?[\d\s()-]{7,15}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number with 7 to 15 digits.'
  if (v.address.trim().length < 10) e.address = 'Enter a delivery address of at least 10 characters.'
  return e
}

export default function Checkout() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    setLoading(true)
    setTimeout(() => {
      setOrder({ number: `BB-${Date.now().toString(36).toUpperCase().slice(-6)}`, total, name: values.name.trim() })
      clearCart()
      setLoading(false)
    }, 800)
  }

  if (order) {
    return (
      <section className="container empty-state page" aria-live="polite">
        <CheckCircle2 size={56} className="ok-icon" aria-hidden="true" />
        <h1>Demo order confirmed</h1>
        <p>Thanks, {order.name}. Your order number is <strong>{order.number}</strong> (total {formatPrice(order.total)}).</p>
        <p className="muted small">This is a frontend demo. No order was sent to a restaurant and no payment was taken.</p>
        <Link to="/menu" className="btn btn-primary">Back to menu</Link>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="container empty-state page">
        <h1>Nothing to check out</h1>
        <p>Your cart is empty. Add a dish first.</p>
        <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
      </section>
    )
  }

  const field = (id, label, props = {}) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {props.as === 'textarea'
        ? <textarea id={id} name={id} rows="3" value={values[id]} onChange={onChange} />
        : <input id={id} name={id} value={values[id]} onChange={onChange} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} {...props} />}
      {errors[id] && <p className="field-error" id={`${id}-err`}>{errors[id]}</p>}
    </div>
  )

  return (
    <>
    <PageHeader eyebrow="Checkout" title="Almost there" sub="Demo only: no payment is processed and no order is sent anywhere." />
    <section className="container page-body">
      <div className="cart-layout">
        <form onSubmit={onSubmit} noValidate className="form-card">
          {field('name', 'Full name', { autoComplete: 'name' })}
          {field('phone', 'Phone number', { type: 'tel', autoComplete: 'tel' })}
          {field('address', 'Delivery address', { autoComplete: 'street-address' })}
          {field('notes', 'Order notes (optional)', { as: 'textarea' })}
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>{loading ? 'Placing order...' : `Place demo order · ${formatPrice(total)}`}</button>
        </form>
        <aside className="summary" aria-label="Order summary">
          <h2>Order summary</h2>
          <ul className="sum-list">
            {items.map((i) => <li key={i.id}><span>{i.qty} × {i.name}</span><span>{formatPrice(i.qty * i.price)}</span></li>)}
          </ul>
          <div className="sum-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="sum-row"><span>Delivery fee</span><span>{formatPrice(deliveryFee)}</span></div>
          <div className="sum-row sum-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <Link to="/cart" className="text-link">Edit cart</Link>
        </aside>
      </div>
    </section>
    </>
  )
}
