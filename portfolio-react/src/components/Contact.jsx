import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-contact', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="glass contact-box reveal-contact">
          <div className="sec-label">04 — Contact</div>
          <h2 className="contact-title">
            Let's build something<br /><span className="accent">worth using.</span>
          </h2>
          <div className="contact-row">
            <ul className="socials">
              <li><a href="https://github.com/Harsh-9818" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/harshtanwar/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com/ezharsh" target="_blank" rel="noopener noreferrer">Twitter / X</a></li>
              <li><a href="https://www.linkedin.com/in/harshtanwar/" target="_blank" rel="noopener noreferrer">Resume</a></li>
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
      </div>
    </section>
  )
}
