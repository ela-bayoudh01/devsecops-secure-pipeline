import { useState, useMemo } from 'react'
import CommandCard from './CommandCard'

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

export default function CommandSection({ section }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return section.commands
    const q = query.toLowerCase()
    return section.commands.filter(
      (c) =>
        c.cmd.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q)
    )
  }, [query, section])

  // reset search when section changes
  const handleSectionChange = () => setQuery('')

  return (
    <main className="main">
      <div className="section-header">
        <span className="section-tag">{section.tag}</span>
        <h2 className="section-title">{section.title}</h2>
        <p className="section-desc">{section.desc}</p>
      </div>

      <div className="search-wrap">
        <span className="search-icon">
          <SearchIcon />
        </span>
        <input
          className="search-input"
          type="text"
          placeholder="search commands..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map((command, i) => (
            <CommandCard key={command.cmd} {...command} index={i} />
          ))
        ) : (
          <div className="empty-state">
            no commands match "{query}"
          </div>
        )}
      </div>
    </main>
  )
}