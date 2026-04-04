import { useState } from 'react'

export default function CommandCard({ cmd, title, desc, tags = [] }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="cmd-card">
      <div className="cmd-card-top">
        <code className="cmd-name">{cmd}</code>
        <button
          className={`copy-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>

      <p className="cmd-title">{title}</p>
      <p className="cmd-desc">{desc}</p>

      {tags.length > 0 && (
        <div className="cmd-tags">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`tag ${
                tag === 'danger' ? 'danger'
                : tag === 'safe' ? 'safe'
                : tag === 'info' ? 'info'
                : ''
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}