import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const about = {
  text: "I'm a Software Engineer working across frontend and backend development, with a growing focus on intelligent, modern applications. I enjoy turning ideas into clean, scalable products and solving real-world problems through technology.",
  meta: [
    { label: 'Based in', value: 'Delhi, India' },
    { label: 'Focus', value: 'Full-Stack / Gen AI' },
    { label: 'Availability', value: 'Remote & Relocation' },
    { label: 'Status', value: 'Open to work' },
  ],
}

const experience = [
  { company: 'Tulip Compression Pvt. Ltd.', role: 'Software Engineer', type: 'Full-time', period: '2026 — Present' },
  { company: 'Atelier', role: 'Fullstack Developer', type: 'Freelance', period: '2024 — 2026' },
]

const education = [
  { school: 'Lovely Professional University (LPU)', degree: 'MCA', type: "Master's", period: '2026 — Present' },
  { school: 'Delhi Skill & Entrepreneurship University (DSEU)', degree: 'BCA', type: "Bachelor's", period: '2023 — 2026' },
]

const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'HTML5', 'CSS3'] },
  { title: 'Frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind', 'Bootstrap', 'Framer Motion'] },
  { title: 'Backend & DB', items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'MySQL'] },
  { title: 'Cloud & Tools', items: ['AWS', 'GCP', 'Git', 'GitHub', 'Postman', 'Figma', 'Linux', 'Vercel'] },
]

const projects = [
  { name: 'Velfora', category: 'E-Commerce Platform', description: 'A modern clothing storefront built for fast browsing and a smooth checkout experience.', live: 'https://velforaclothing.vercel.app/', github: 'https://github.com/Harsh-9818' },
  { name: 'Enhance Through AI', category: 'Generative AI Tool', description: 'An AI-powered image enhancement tool that improves quality and resolution in the browser.', live: 'https://enhancethroughai.vercel.app/', github: 'https://github.com/Harsh-9818' },
  { name: 'Atelier', category: 'Web Application', description: 'A clean, componentized web application focused on usability and performance.', live: 'https://dev-atelier.vercel.app/', github: 'https://github.com/Harsh-9818' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com/Harsh-9818' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshtanwar/' },
  { label: 'Twitter / X', href: 'https://twitter.com/ezharsh' },
  { label: 'Resume', href: 'https://drive.google.com/file/d/1kz5ammuvsJKr0eNCnoVczYIAX8n4e0ym/view' },
]

function Card({ delay = 0, className = '', children }) {
  return (
    <motion.div
      className={`glass bento-card ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function Dashboard() {
  return (
    <section id="dashboard" className="dashboard-fixed">
      <Link to="/" className="btn ghost dash-back">← Back</Link>

      <div className="bento-grid">
        {/* Know Me */}
        <Card delay={0.02} className="bento-about">
          <h2 className="bento-title">Know Me</h2>
          <div className="bento-about-inner">
            <div className="bento-about-text">
              <p>{about.text}</p>
            </div>
            <div className="bento-meta-col">
              {about.meta.map((m) => (
                <div key={m.label} className="meta-row">
                  <span>{m.label}</span>
                  <b>{m.value}</b>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Work experience */}
        <Card delay={0.08} className="bento-experience">
          <h2 className="bento-title">Work experience</h2>
          <div className="bento-sub-grid">
            {experience.map((e) => (
              <div key={e.company} className="bento-sub-card">
                <span className="project-cat">{e.type}</span>
                <h3>{e.company}</h3>
                <p>{e.role}</p>
                <p className="exp-period">{e.period}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Selected projects */}
        <Card delay={0.14} className="bento-projects">
          <h2 className="bento-title">Selected projects</h2>
          <div className="bento-sub-grid three">
            {projects.map((p) => (
              <div key={p.name} className="bento-sub-card">
                <span className="project-cat">{p.category}</span>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="project-links sm">
                  <a href={p.live} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* What I work with */}
        <Card delay={0.2} className="bento-skills">
          <h2 className="bento-title">What I work with</h2>
          <div className="bento-sub-grid four">
            {skillGroups.map((g) => (
              <div key={g.title} className="bento-sub-card">
                <span className="project-cat">{g.title}</span>
                <div className="skill-tags">
                  {g.items.map((s) => (
                    <span key={s} className="skill-tag sm">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Education */}
        <Card delay={0.26} className="bento-education">
          <h2 className="bento-title">Education</h2>
          <div className="bento-sub-grid">
            {education.map((e) => (
              <div key={e.school} className="bento-sub-card">
                <span className="project-cat">{e.type}</span>
                <h3>{e.degree}</h3>
                <p>{e.school}</p>
                <p className="exp-period">{e.period}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact */}
        <Card delay={0.32} className="bento-contact">
          <h2 className="contact-title sm">
            Let's build something<br /><span className="accent">worth using.</span>
          </h2>
          <div className="bento-contact-bottom">
            <ul className="socials sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
            <a href="mailto:harsh.tanwar9818@gmail.com" className="btn primary sm">
              harsh.tanwar9818@gmail.com
            </a>
          </div>
        </Card>
      </div>
    </section>
  )
}