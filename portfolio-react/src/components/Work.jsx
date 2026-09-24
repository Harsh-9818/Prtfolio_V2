import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-work', {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef}>
      <div className="container">
        <div className="sec-label reveal-work">03 — Featured work</div>
        <h2 className="sec-title reveal-work">Selected projects</h2>
        <div className="projects-grid">
          {projects.map((p) => (
            <motion.div
              key={p.slug}
              className="glass project-card reveal-work"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <span className="project-cat">{p.category}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="project-links">
                <Link to={`/work/${p.slug}`}>Case study ↗</Link>
                <a href={p.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
                <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}