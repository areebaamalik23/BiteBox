export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo-light' : ''}`}>
      <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="#F26B1D" />
        <path d="M12 18h24v16a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3z" fill="#FFF6E9" />
        <path d="M10 18l4-7h20l4 7z" fill="#1F1B18" />
        <circle cx="36" cy="18" r="4" fill="#F26B1D" />
      </svg>
      <span className="logo-text">Bite<b>Box</b></span>
    </span>
  )
}
