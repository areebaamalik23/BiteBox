import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function Toast() {
  const { toast } = useCart()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!toast) return
    setShow(true)
    const t = setTimeout(() => setShow(false), 2400)
    return () => clearTimeout(t)
  }, [toast])
  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      {toast && (
        <>
          <CheckCircle2 size={18} />
          <span><b>{toast.name}</b> added to cart</span>
          <Link to="/cart" tabIndex={show ? 0 : -1}>View cart</Link>
        </>
      )}
    </div>
  )
}
