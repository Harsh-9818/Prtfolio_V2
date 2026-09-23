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

export default function App() {
  return (
    <>
      <Cursor />
      <Scene3D />
      <div className="site">
        <Nav />
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  )
}