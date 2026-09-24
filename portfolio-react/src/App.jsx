import { useLayoutEffect, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

  // 1. Force native scroll restoration off globally on mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const handleBeforeUnload = () => {
      if (window.location.pathname === '/') {
        sessionStorage.removeItem(HOME_SCROLL_KEY)
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  // 2. Initialize Lenis Smooth Scroll
  useLayoutEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

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
    lenis.on('scroll', ScrollTrigger.update)

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

  // 3. Precise Route Scroll Restoration Handler
  useLayoutEffect(() => {
    const prevPath = prevPathRef.current
    const currentPath = location.pathname
    const lenis = lenisRef.current

    // Store position when leaving home
    if (prevPath === '/' && currentPath !== '/') {
      sessionStorage.setItem(HOME_SCROLL_KEY, String(scrollYRef.current))
    }

    if (currentPath === '/' && prevPath !== null && prevPath !== '/') {
      // Returning to Home from Sub-page
      const saved = sessionStorage.getItem(HOME_SCROLL_KEY)
      if (saved !== null) {
        const targetY = Number(saved)

        // Wait for DOM & GSAP triggers to finish mounting before scrolling
        requestAnimationFrame(() => {
          setTimeout(() => {
            lenis?.resize()
            ScrollTrigger.refresh()
            window.scrollTo(0, targetY)
            lenis?.scrollTo(targetY, { immediate: true })
          }, 60)
        })
      }
    } else if (currentPath !== '/') {
      // Direct visit to sub-page (e.g. /dashboard or /work/:slug) -> Reset to top
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true })
    }

    // Update path reference
    prevPathRef.current = currentPath
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