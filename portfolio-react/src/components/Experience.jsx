import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experience = [
  {
    company: 'Tulip Compression Pvt. Ltd.',
    role: 'Software Engineer',
    type: 'Full-time',
    period: '2026 — Present',
  },
  {
    company: 'Atelier',
    role: 'Fullstack Developer',
    type: 'Freelance',
    period: '2024 — 2026',
  },
]

export default function Education() {
  const sectionRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.reveal-exp', {
        y: 34,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%', // Slightly lower trigger start so it doesn't fire prematurely on mount
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    // Delay a ScrollTrigger refresh so production layout shifts don't cause scroll jumping
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [])

  return (
    <section id="education" ref={sectionRef}>
      <div className="container">
        <div className="sec-label reveal-exp">02 — Experience</div>
        <h2 className="sec-title reveal-exp">Work experience</h2>
        <div className="projects-grid">
          {experience.map((item) => (
            <motion.div
              key={item.company}
              className="glass project-card reveal-exp"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <span className="project-cat">{item.type}</span>
              <h3>{item.company}</h3>
              <p>{item.role}</p>
              <p className="exp-period">{item.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}