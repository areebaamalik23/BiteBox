import { useEffect, useRef, useState } from 'react'

const fallback = (label) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="500"><rect width="100%" height="100%" fill="#3a2a20"/><text x="50%" y="46%" font-size="90" text-anchor="middle" dominant-baseline="middle">🍽️</text><text x="50%" y="76%" font-family="sans-serif" font-size="26" fill="#f6d9b8" text-anchor="middle">${label}</text></svg>`
  )

export default function FoodImage({ src, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(null)
  useEffect(() => { if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true) }, [])
  return (
    <img
      ref={ref}
      className={`${className} fimg ${loaded ? 'loaded' : ''}`}
      src={failed ? fallback(alt.replace(/[<>&]/g, '')) : src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={() => { setFailed(true); setLoaded(true) }}
    />
  )
}
