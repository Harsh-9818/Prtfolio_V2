import { motion } from 'framer-motion'

export default function Nav() {
  return (
    <motion.nav
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="nav-inner">
        <div className="logo">HT.</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a
          className="nav-cta"
          href="https://www.linkedin.com/in/harshtanwar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume ↗
        </a>
      </div>
    </motion.nav>
  )
}
