import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import Cursor from './components/Cursor.jsx'
import Scene3D from './components/Scene3D.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Work from './components/Work.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Education from './components/Education.jsx'
import Dashboard from './components/Dashboard.jsx'
import CommandPalette from './components/CommandPalette.jsx'
import KonamiEasterEgg from './components/KonamiEasterEgg.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import Meta from './pages/Meta.jsx'

function Home() {
  return (
    <div className="site">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  )
}

export default function App() {
  const lenisRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    lenis.scrollTo(0, { immediate: true })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    lenisRef.current?.scrollTo(0, { immediate: true })
  }, [location.pathname])

  return (
    <>
      <Cursor />
      <Scene3D />
      <CommandPalette />
      <KonamiEasterEgg />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="/meta" element={<Meta />} />
      </Routes>
    </>
  )
}