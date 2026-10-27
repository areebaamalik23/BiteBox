import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import CartItem from '../components/CartItem.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatPrice } from '../data/foods.js'

export default function Cart() {
  const { items, subtotal, deliveryFee, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <section className="container empty-state page">
        <ShoppingBag size={52} aria-hidden="true" />
        <h1>Your cart is empty</h1>
        <p>Add a few dishes and they will show up here.</p>
        <Link to="/menu" className="btn btn-primary">Browse the menu</Link>
      </section>
    )
  }

  return (
    <>
    <PageHeader eyebrow="Review" title="Your cart" sub="Check your items, then head to checkout." />
    <section className="container page-body">
      <div className="cart-layout">
        <ul className="cart-list">{items.map((i) => <CartItem key={i.id} item={i} />)}</ul>
        <aside className="summary" aria-label="Order summary">
          <h2>Summary</h2>
          <div className="sum-row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="sum-row"><span>Delivery fee</span><span>{formatPrice(deliveryFee)}</span></div>
          <div className="sum-row sum-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <Link to="/checkout" className="btn btn-primary btn-block">Go to checkout</Link>
          <Link to="/menu" className="btn btn-ghost btn-block">Add more food</Link>
          <button className="text-btn" onClick={clearCart}>Clear cart</button>
        </aside>
      </div>
    </section>
    </>
  )
}
