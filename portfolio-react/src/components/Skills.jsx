import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C++', 'HTML5', 'CSS3'] },
  { name: 'Frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind', 'Bootstrap', 'Framer Motion'] },
  { name: 'Backend & DB', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL'] },
  { name: 'Cloud & Tools', items: ['AWS', 'GCP', 'Git', 'Postman', 'Figma', 'Linux'] },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-skill', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <div className="sec-label reveal-skill">03 — Technical skills</div>
        <h2 className="sec-title reveal-skill">What I work with</h2>
        <div className="skills-grid">
          {categories.map((cat) => (
            <div className="glass skill-card reveal-skill" key={cat.name}>
              <h4>{cat.name}</h4>
              <div className="skill-pills">
                {cat.items.map((it) => (
                  <span className="pill" key={it}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
