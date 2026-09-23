import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const sectionCommands = [
  { id: 'hero', label: 'Go to Home', hint: '#hero' },
  { id: 'about', label: 'Go to About', hint: '#about' },
  { id: 'experience', label: 'Go to Experience', hint: '#experience' },
  { id: 'work', label: 'Go to Work', hint: '#work' },
  { id: 'skills', label: 'Go to Skills', hint: '#skills' },
  { id: 'education', label: 'Go to Education', hint: '#education' },
  { id: 'contact', label: 'Go to Contact', hint: '#contact' },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef(null)
  const navigate = useNavigate()

  const actionCommands = useMemo(() => [
    {
      id: 'github',
      label: 'Open GitHub',
      hint: 'github.com/Harsh-9818',
      run: () => window.open('https://github.com/Harsh-9818', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      hint: 'linkedin.com/in/harshtanwar',
      run: () => window.open('https://www.linkedin.com/in/harshtanwar/', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'email',
      label: 'Copy email address',
      hint: 'harsh.tanwar9818@gmail.com',
      run: () => navigator.clipboard.writeText('harsh.tanwar9818@gmail.com'),
    },
    {
      id: 'resume',
      label: 'Open Resume',
      hint: 'PDF ↗',
      run: () => window.open('https://drive.google.com/file/d/1kz5ammuvsJKr0eNCnoVczYIAX8n4e0ym/view', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'dashboard',
      label: 'Open Dashboard',
      hint: '/dashboard',
      run: () => navigate('/dashboard'),
    },
  ], [navigate])

  const sectionActions = useMemo(() =>
    sectionCommands.map((c) => ({
      ...c,
      run: () => {
        navigate('/')
        requestAnimationFrame(() => {
          const el = document.getElementById(c.id)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        })
      },
    })), [navigate])

  const allCommands = useMemo(() => [...sectionActions, ...actionCommands], [sectionActions, actionCommands])

  const filtered = useMemo(() => {
    if (!query.trim()) return allCommands
    const q = query.toLowerCase()
    return allCommands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q))
  }, [query, allCommands])

  const closePalette = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  // Lock native page scroll while the palette is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    function handleKeyDown(e) {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k'
      if (isCmdK) {
        e.preventDefault()
        setOpen((prev) => !prev)
        return
      }
      if (!open) return
      if (e.key === 'Escape') {
        closePalette()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const cmd = filtered[activeIndex]
        if (cmd) {
          cmd.run()
          closePalette()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, filtered, activeIndex, closePalette])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Stop wheel events inside the list from bubbling to window/Lenis
  function handleListWheel(e) {
    e.stopPropagation()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmdk-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={closePalette}
          onWheel={(e) => e.preventDefault()}
        >
          <motion.div
            className="cmdk-panel glass"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmdk-input-row">
              <span className="cmdk-prompt">$</span>
              <input
                autoFocus
                className="cmdk-input"
                placeholder="Type a command or search…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="cmdk-esc">esc</span>
            </div>
            <div
              className="cmdk-list"
              ref={listRef}
              onWheel={handleListWheel}
            >
              {filtered.length === 0 && (
                <div className="cmdk-empty">No matching commands.</div>
              )}
              {filtered.map((cmd, i) => (
                <div
                  key={cmd.id}
                  className={`cmdk-item ${i === activeIndex ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => {
                    cmd.run()
                    closePalette()
                  }}
                >
                  <span>{cmd.label}</span>
                  <span className="cmdk-hint">{cmd.hint}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}