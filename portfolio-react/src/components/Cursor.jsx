import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let rx = mx, ry = my
    let raf

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px' }
    }
    const loop = () => {
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px' }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', onMove)
    loop()

    const grow = () => { if (ringRef.current) { ringRef.current.style.width = '48px'; ringRef.current.style.height = '48px'; ringRef.current.style.borderColor = 'var(--accent)' } }
    const shrink = () => { if (ringRef.current) { ringRef.current.style.width = '32px'; ringRef.current.style.height = '32px'; ringRef.current.style.borderColor = 'rgba(244,244,241,.35)' } }
    const attach = () => {
      document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    const t = setTimeout(attach, 400)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}
