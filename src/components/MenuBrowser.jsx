import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SearchX, ArrowRight } from 'lucide-react'
import FoodCard from './FoodCard.jsx'
import { foods, categories } from '../data/foods.js'

const sorters = {
  popular: (a, b) => b.popularity - a.popularity,
  rating: (a, b) => b.rating - a.rating,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
}

export default function MenuBrowser({ limit, syncUrl = false }) {
  const [params, setParams] = useSearchParams()
  const [localQ, setLocalQ] = useState('')
  const [localC, setLocalC] = useState('All')
  const [sort, setSort] = useState('popular')
  const [loading, setLoading] = useState(true)
  useEffect(() => { const t = setTimeout(() => setLoading(false), 450); return () => clearTimeout(t) }, [])

  const query = syncUrl ? params.get('q') || '' : localQ
  const rawCat = syncUrl ? params.get('category') : localC
  const category = categories.some((c) => c.name === rawCat) ? rawCat : 'All'

  const update = (patch) => {
    if (syncUrl) {
      const next = new URLSearchParams(params)
      Object.entries(patch).forEach(([k, v]) => (v && v !== 'All' ? next.set(k, v) : next.delete(k)))
      setParams(next, { replace: true })
    } else {
      if ('q' in patch) setLocalQ(patch.q)
      if ('category' in patch) setLocalC(patch.category)
    }
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = foods.filter((f) => (category === 'All' || f.category === category) &&
      (f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)))
    return [...list].sort(sorters[sort])
  }, [query, category, sort])
  const shown = limit ? results.slice(0, limit) : results

  return (
    <div className="browser">
      <div className="toolbar">
        <div className="search">
          <Search size={18} aria-hidden="true" />
          <label htmlFor={`search-${syncUrl}`} className="sr-only">Search foods</label>
          <input id={`search-${syncUrl}`} type="search" placeholder="Search by name or ingredient" value={query} onChange={(e) => update({ q: e.target.value })} />
        </div>
        <div className="sort">
          <label htmlFor={`sort-${syncUrl}`}>Sort by</label>
          <select id={`sort-${syncUrl}`} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Most popular</option>
            <option value="rating">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>
      <div className="filter-row" role="group" aria-label="Filter by category">
        {['All', ...categories.map((c) => c.name)].map((name) => (
          <button key={name} className={`pill ${category === name ? 'active' : ''}`} aria-pressed={category === name} onClick={() => update({ category: name })}>{name}</button>
        ))}
      </div>
      <p className="muted small" role="status">{results.length} {results.length === 1 ? 'dish' : 'dishes'} found</p>

      {loading ? (
        <div className="food-grid" aria-busy="true">{Array.from({ length: limit || 8 }, (_, i) => <div key={i} className="skeleton-card"><div className="sk sk-img" /><div className="sk sk-line" /><div className="sk sk-line short" /></div>)}</div>
      ) : shown.length > 0 ? (
        <div className="food-grid">{shown.map((f, i) => <FoodCard key={f.id} food={f} index={i} />)}</div>
      ) : (
        <div className="empty-state">
          <SearchX size={48} aria-hidden="true" />
          <h2>No dishes match "{query}"</h2>
          <p>Try a different word, or clear the filters to see everything.</p>
          <button className="btn btn-primary" onClick={() => { update({ q: '', category: 'All' }); setSort('popular') }}>Clear filters</button>
        </div>
      )}
      {limit && results.length > limit && !loading && (
        <div className="center"><Link to="/menu" className="btn btn-ghost btn-lg">View full menu <ArrowRight size={18} /></Link></div>
      )}
    </div>
  )
}
