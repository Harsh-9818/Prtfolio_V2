import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const commandHandlers = {
  help: () => [
    'Available commands:',
    '  whoami        — who am I',
    '  skills        — tech stack',
    '  contact       — how to reach me',
    '  projects      — selected work',
    '  clear         — clear the terminal',
  ],
  whoami: () => [
    'Harsh Tanwar — Software Engineer, Delhi, India.',
    'Full-Stack / Gen AI focus. Open to remote work.',
  ],
  skills: () => [
    'JavaScript, TypeScript, React, Next.js, Node.js, Express,',
    'MongoDB, PostgreSQL, AWS, GCP.',
  ],
  contact: () => [
    'Email: harsh.tanwar9818@gmail.com',
    'GitHub: github.com/Harsh-9818',
    'LinkedIn: linkedin.com/in/harshtanwar',
  ],
  projects: () => [
    'Velfora — E-Commerce Platform',
    'Enhance Through AI — Generative AI Tool',
    'Atelier — Web Application',
  ],
}

function Terminal() {
  const [lines, setLines] = useState([
    { type: 'system', text: "Type 'help' to see available commands." },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)
  const inputRef = useRef(null)

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setLines([])
      return
    }

    const newLines = [...lines, { type: 'input', text: cmd }]
    const handler = commandHandlers[cmd]
    if (handler) {
      handler().forEach((text) => newLines.push({ type: 'output', text }))
    } else {
      newLines.push({ type: 'error', text: `command not found: ${cmd} (try 'help')` })
    }
    setLines(newLines)
  }

  function handleSubmit(e) {
    e.preventDefault()
    runCommand(input)
    setInput('')
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [lines])

  return (
    <div className="glass terminal-box reveal-contact" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-head">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">harsh@portfolio: ~</span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            {line.type === 'input' ? (
              <>
                <span className="terminal-caret">$</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="terminal-input-row">
          <span className="terminal-caret">$</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-contact', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact-layout">
          <div className="glass contact-box reveal-contact">
            <div className="sec-label">06 — Contact</div>
            <h2 className="contact-title">
              Let's build something<br /><span className="accent">worth using.</span>
            </h2>
            <div className="contact-row">
              <ul className="socials">
                <li><a href="https://github.com/Harsh-9818" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/harshtanwar/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://twitter.com/ezharsh" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
                <li><a href="https://drive.google.com/file/d/1kz5ammuvsJKr0eNCnoVczYIAX8n4e0ym/view" target="_blank" rel="noopener noreferrer">Resume</a></li>
              </ul>
              <motion.a
                href="mailto:harsh.tanwar9818@gmail.com"
                className="btn primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                harsh.tanwar9818@gmail.com
              </motion.a>
            </div>
          </div>

          <Terminal />
        </div>
      </div>
    </section>
  )
}