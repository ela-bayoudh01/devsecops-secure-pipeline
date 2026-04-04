import { navSections } from '../data/commands'

export default function Sidebar({ activeSection, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Git Survival<br />Guide</h1>
        <span className="logo-tag">$ git --help-me</span>
      </div>

      {navSections.map((group) => (
        <nav className="nav-group" key={group.label}>
          <span className="nav-group-label">{group.label}</span>
          {group.items.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeSection === item.key ? 'active' : ''}`}
              onClick={() => onSelect(item.key)}
            >
              <span className="nav-dot" />
              {item.label}
            </button>
          ))}
        </nav>
      ))}
    </aside>
  )
}