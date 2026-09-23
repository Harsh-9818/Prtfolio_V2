import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const [githubGraphFailed, setGithubGraphFailed] = useState(false)

  return (
    <section className="hero" id="hero">
      <motion.div className="container" variants={container} initial="hidden" animate="show">
        <motion.div className="eyebrow" variants={item}>
          <span className="dot" />
          Delhi, India — open to remote &amp; relocation
        </motion.div>

        <motion.h1 className="hero-name" variants={item}>
          Harsh <span className="accent">Tanwar</span>
        </motion.h1>

        <motion.p className="hero-tagline" variants={item}>
          Software Engineer turning ideas into products people love to use —
          across frontend, backend, and intelligent applications.
        </motion.p>

        <motion.div className="hero-cta" variants={item}>
          <MagneticButton>
            <motion.a
              href="#work"
              className="btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              See the work
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="#contact"
              className="btn ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Get in touch
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
              <Link to="/dashboard" className="btn ghost">
                Snapshot ↗
              </Link>
            </motion.div>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="https://drive.google.com/file/d/1kz5ammuvsJKr0eNCnoVczYIAX8n4e0ym/view"
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Resume ↗
            </motion.a>
          </MagneticButton>
        </motion.div>

        {!githubGraphFailed && (
          <motion.div className="glass hero-github" variants={item}>
            <div className="hero-github-head">
              <span className="hero-github-label">GitHub activity</span>
              <a
                href="https://github.com/Harsh-9818"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-github-link"
              >
                @Harsh-9818 ↗
              </a>
            </div>
            <img
              src="https://ghchart.rshah.org/FF3D57/Harsh-9818"
              alt="Harsh Tanwar's GitHub contribution graph"
              className="hero-github-img"
              loading="lazy"
              onError={() => setGithubGraphFailed(true)}
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}