import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const KONAMI = ['h', 'a', 'r', 's', 'h']

export default function KonamiEasterEgg() {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    let buffer = []
    function handleKeyDown(e) {
      buffer.push(e.key.length === 1 ? e.key.toLowerCase() : e.key)
      buffer = buffer.slice(-KONAMI.length)
      if (buffer.join(',') === KONAMI.join(',')) {
        setTriggered(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTriggered(false)}
        >
          <motion.div
            className="glass konami-panel"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          >
            <div className="konami-title">H A R S H</div>
            <p>You found the secret code. Respect.</p>
            <Link to="/meta" className="btn primary" onClick={() => setTriggered(false)}>
              See how this site was built ↗
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}