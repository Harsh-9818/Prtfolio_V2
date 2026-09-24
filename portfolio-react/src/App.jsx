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

  // Create Lenis once
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname)
  }
  
    window.scrollTo(0, 0)

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

  // Save/restore scroll position on route change
  useLayoutEffect(() => {
    const prevPath = prevPathRef.current
    const lenis = lenisRef.current
    const goingHome = location.pathname === '/'
    const cameFromElsewhere = prevPath !== null && prevPath !== location.pathname

    console.log('[scroll debug]', {
      prevPath,
      newPath: location.pathname,
      goingHome,
      cameFromElsewhere,
      scrollYRefBeforeSave: scrollYRef.current,
    })

    // Leaving Home for another route -> remember exactly where we were
    if (prevPath === '/' && !goingHome) {
      console.log('[scroll debug] SAVING', scrollYRef.current)
      sessionStorage.setItem(HOME_SCROLL_KEY, String(scrollYRef.current))
    }

    if (goingHome && cameFromElsewhere) {
      // Returning to Home from another page
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true })

      const saved = sessionStorage.getItem(HOME_SCROLL_KEY)
      console.log('[scroll debug] RESTORING, saved value =', saved)

      if (saved !== null) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            lenis?.resize()
            const y = Number(saved)
            console.log(
              '[scroll debug] applying scroll y =', y,
              'document height =', document.documentElement.scrollHeight
            )
            window.scrollTo(0, y)
            lenis?.scrollTo(y, { immediate: true })
          })
        })
      }
    } else {
      // Fresh load of Home, or any non-Home route -> always top
      window.scrollTo(0, 0)
      lenis?.scrollTo(0, { immediate: true })
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