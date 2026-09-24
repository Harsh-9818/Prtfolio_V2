import { useLayoutEffect, useRef } from 'react'
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

const HOME_SCROLL_KEY = 'home-scroll-y'

export default function App() {
  const lenisRef = useRef(null)
  const scrollYRef = useRef(0)
  const prevPathRef = useRef(null)
  const location = useLocation()

  // Initialize Lenis smooth scroll
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Strip hash if present to prevent native browser auto-scroll to ID
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    // Force instantaneous scroll reset to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    function handleScroll({ scroll }) {
      scrollYRef.current = scroll
    }
    lenis.on('scroll', handleScroll)

    lenis.scrollTo(0, { immediate: true })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off('scroll', handleScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Handle route transitions & refresh scroll restoration
  useLayoutEffect(() => {
    const prevPath = prevPathRef.current
    const lenis = lenisRef.current
    const goingHome = location.pathname === '/'
    const cameFromElsewhere = prevPath !== null && prevPath !== location.pathname

    // Leaving Home for another route -> save scroll position
    if (prevPath === '/' && !goingHome) {
      sessionStorage.setItem(HOME_SCROLL_KEY, String(scrollYRef.current))
    }

    if (goingHome && cameFromElsewhere) {
      // Returning to Home from another page -> restore position
      const saved = sessionStorage.getItem(HOME_SCROLL_KEY)
      if (saved !== null) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            lenis?.resize()
            const y = Number(saved)
            window.scrollTo(0, y)
            lenis?.scrollTo(y, { immediate: true })
          })
        })
      }
    } else {
      // Fresh load or page refresh on Home -> enforce top scroll position
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      lenis?.scrollTo(0, { immediate: true })

      // Double RAF to prevent layout shifts or autofocus in lower components from jumping down
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        lenis?.scrollTo(0, { immediate: true })
      })
    }

    prevPathRef.current = location.pathname
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