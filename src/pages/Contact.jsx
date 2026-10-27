import { useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

import PageHeader from '../components/PageHeader.jsx'

const empty = { name: '', email: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    setSent(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = {}
    if (values.name.trim().length < 2) found.name = 'Enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) found.email = 'Enter a valid email, like name@example.com.'
    if (values.message.trim().length < 10) found.message = 'Write a message of at least 10 characters.'
    setErrors(found)
    if (Object.keys(found).length) return
    setSent(true)
    setValues(empty)
  }

  return (
    <>
    <PageHeader eyebrow="Say hello" title="Contact us" sub="This is a demo form. Messages are validated but not sent anywhere." />
    <section className="container page-body">
      <div className="cart-layout">
        <form onSubmit={onSubmit} noValidate className="form-card">
          {sent && <p className="form-msg success" role="status">Message validated. Since this is a demo, nothing was actually sent.</p>}
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={values.name} onChange={onChange} aria-invalid={!!errors.name} />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={values.email} onChange={onChange} aria-invalid={!!errors.email} />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" value={values.message} onChange={onChange} aria-invalid={!!errors.message} />
            {errors.message && <p className="field-error">{errors.message}</p>}
          </div>
          <button className="btn btn-primary" type="submit">Send message</button>
        </form>
        <aside className="summary">
          <h2>Sample details</h2>
          <p className="muted small">These are placeholders, not a real business.</p>
          <p className="info-line"><Mail size={18} /> hello@example.com</p>
          <p className="info-line"><Phone size={18} /> +00 000 000 0000</p>
          <p className="info-line"><MapPin size={18} /> 123 Sample Street, Demo City</p>
          <p className="info-line muted">Hours: sample 10:00 – 22:00</p>
        </aside>
      </div>
    </section>
    </>
  )
}
