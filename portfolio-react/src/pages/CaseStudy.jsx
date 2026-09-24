import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjectBySlug } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

function ArchitectureDiagram({ nodes }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.arch-node', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.15,
        ease: 'back.out(1.6)',
        scrollTrigger: { trigger: svgRef.current, start: 'top 80%' },
      })
      gsap.from('.arch-line', {
        strokeDashoffset: 100,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: svgRef.current, start: 'top 80%' },
      })
    }, svgRef)
    return () => ctx.revert()
  }, [])

  const spacing = 190
  const y = 70

  return (
    <div className="arch-diagram glass" ref={svgRef}>
      <svg width="100%" height="220" viewBox={`0 0 ${spacing * nodes.length} 220`}>
        {nodes.map((n, i) =>
          i < nodes.length - 1 ? (
            <line
              key={`line-${n.id}`}
              className="arch-line"
              x1={spacing * i + spacing / 2 + 60}
              y1={y}
              x2={spacing * (i + 1) + spacing / 2 - 60}
              y2={y}
              stroke="var(--accent2)"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          ) : null
        )}
        {nodes.map((n, i) => (
          <g key={n.id} className="arch-node">
            <rect
              x={spacing * i + spacing / 2 - 60}
              y={y - 30}
              width="120"
              height="60"
              rx="12"
              fill="rgba(255,255,255,0.04)"
              stroke="var(--line)"
            />
            <text
              x={spacing * i + spacing / 2}
              y={y - 4}
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="12"
              fontFamily="var(--body)"
              fontWeight="600"
            >
              {n.label}
            </text>
            <text
              x={spacing * i + spacing / 2}
              y={y + 14}
              textAnchor="middle"
              fill="var(--dim)"
              fontSize="9.5"
              fontFamily="var(--mono)"
            >
              {n.desc}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const ctx = gsap.context(() => {
      gsap.from('.reveal-case', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [project])

  if (!project) return <Navigate to="/" replace />

  return (
    <section id="case-study" ref={sectionRef} className="case-study">
      <div className="container">
        <Link to="/" className="btn ghost dash-back">← Back to portfolio</Link>

        <div className="reveal-case">
          <span className="project-cat">{project.category}</span>
          <h1 className="sec-title" style={{ marginTop: '1rem' }}>{project.name}</h1>
          <p className="hero-tagline" style={{ maxWidth: '700px' }}>{project.description}</p>
          <div className="project-links" style={{ marginTop: '1.5rem' }}>
            <a href={project.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
            <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>

        <div className="case-grid reveal-case">
          <div className="glass case-block">
            <h3>The problem</h3>
            <p>{project.problem}</p>
          </div>
          <div className="glass case-block">
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </div>
        </div>

        <div className="reveal-case">
          <h2 className="sec-title" style={{ fontSize: '1.6rem', marginTop: '2.5rem' }}>Architecture</h2>
          <ArchitectureDiagram nodes={project.architecture} />
        </div>

        <div className="case-grid reveal-case" style={{ marginTop: '2rem' }}>
          <div className="glass case-block">
            <h3>Tech stack</h3>
            {Object.entries(project.stack).map(([key, values]) =>
              values.length ? (
                <div key={key} className="case-stack-row">
                  <span className="case-stack-label">{key}</span>
                  <div className="skill-tags">
                    {values.map((v) => (
                      <span key={v} className="skill-tag sm">{v}</span>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
          <div className="glass case-block">
            <h3>Challenges &amp; learnings</h3>
            <ul className="case-list">
              {project.challenges.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </div>

        <div className="glass case-block reveal-case" style={{ marginTop: '2rem' }}>
          <h3>Roadmap</h3>
          <ul className="case-list">
            {project.roadmap.map((r) => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}