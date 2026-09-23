import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-about', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="sec-label reveal-about">01 — About</div>
        <h2 className="sec-title reveal-exp">Know Me</h2>
        <div className="about-grid">
          <div className="glass about-text reveal-about">
            <p>
              I'm a Software Engineer working across frontend and backend
              development, with a growing focus on{' '}
              <strong>intelligent, modern applications.</strong> I enjoy
              turning ideas into clean, scalable products and solving
              real-world problems through technology.
            </p>
          </div>
          <div className="glass meta-list reveal-about">
            <div className="meta-row"><span>Based in</span><b>Delhi, India</b></div>
            <div className="meta-row"><span>Focus</span><b>Full-Stack / AI Apps</b></div>
            <div className="meta-row"><span>Availability</span><b>Remote &amp; Relocation</b></div>
            <div className="meta-row"><span>Status</span><b>Open to work</b></div>
          </div>
        </div>
      </div>
    </section>
  )
}
