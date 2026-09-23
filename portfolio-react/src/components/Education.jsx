import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    school: 'Lovely Professional University (LPU)',
    degree: 'MCA',
    type: "Master's",
    period: '2026 — Present',
  },
  {
    school: 'Delhi Skill and Entrepreneurship University (DSEU)',
    degree: 'BCA',
    type: "Bachelor's",
    period: '2023 — 2026',
  },
]

export default function Education() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-edu', {
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
    <section id="education" ref={sectionRef}>
      <div className="container">
        <div className="sec-label reveal-edu">03 — Education</div>
        <h2 className="sec-title reveal-edu">Education</h2>
        <div className="projects-grid">
          {education.map((item) => (
            <motion.div
              key={item.school}
              className="glass project-card reveal-edu"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            >
              <span className="project-cat">{item.type}</span>
              <h3>{item.degree}</h3>
              <p>{item.school}</p>
              <p className="exp-period">{item.period}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}