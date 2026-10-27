export default function PageHeader({ eyebrow, title, sub }) {
  return (
    <header className="page-head">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {sub && <p className="lead">{sub}</p>}
      </div>
    </header>
  )
}
