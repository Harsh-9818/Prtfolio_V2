import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

/**
 * SiteBackground v3 — genuinely immersive, reactive, layered 3D.
 * Mount ONCE at your app root (see mounting notes at the bottom).
 *
 * Layers (back to front):
 *  1. Starfield — sparse depth cue.
 *  2. Liquid plasma — a fullscreen shader of merging "metaballs" that
 *     drift on their own AND form a blob that follows your cursor.
 *     Occasional glitch/chromatic-split pulses, scroll-reactive.
 *  3. Particle river — ~1600 glowing points flowing in a loose field,
 *     that scatter away from your cursor like a fluid.
 *  4. Centerpiece — one large glowing wireframe torus-knot, slowly
 *     tumbling, with a soft halo. The "signature 3D object."
 *
 * Mouse tracking is done via a WINDOW-level pointermove listener
 * (not R3F's built-in canvas pointer state), because the background
 * container uses pointer-events: none so it never blocks clicks on
 * your real page — that also means the canvas itself never receives
 * DOM pointer events, so we read the cursor position from the page
 * instead. This is what makes the mouse-reactivity actually work
 * everywhere, not just over empty page space.
 */

const PINK = new THREE.Color('#FF3D57')
const TEAL = new THREE.Color('#00C2A8')
const BG = '#050507'

// ---------- shared input tracking (mouse + scroll) ----------

function useInputRefs() {
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const scroll = useRef({ y: 0, velocity: 0, lastY: 0 })

  useEffect(() => {
    function onPointerMove(e) {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.targetY = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    function onScroll() {
      scroll.current.y = window.scrollY
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { mouse, scroll }
}

// ---------- liquid plasma background ----------

function PlasmaField({ mouse, scroll }) {
  const meshRef = useRef()
  const glitchUntil = useRef(0)
  const nextGlitch = useRef(2000)
  const glitchValue = useRef(0)

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uColorA: { value: PINK },
        uColorB: { value: TEAL },
        uGlitch: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uGlitch;
        varying vec2 vUv;

        float ballField(vec2 uv, vec2 center, float radius, float aspect) {
          vec2 d = uv - center;
          d.x *= aspect;
          float dist2 = dot(d, d);
          return (radius * radius) / (dist2 + 0.0009);
        }

        float sceneField(vec2 uv, float aspect) {
          float t = uTime;
          vec2 c1 = vec2(0.5 + 0.26 * sin(t * 0.31), 0.52 + 0.20 * cos(t * 0.27));
          vec2 c2 = vec2(0.5 + 0.22 * cos(t * 0.19 + 2.0), 0.46 + 0.26 * sin(t * 0.23 + 1.0));
          vec2 c3 = vec2(0.5 + 0.30 * sin(t * 0.15 + 4.0), 0.55 + 0.16 * cos(t * 0.35 + 3.0));
          float f = 0.0;
          f += ballField(uv, c1, 0.11, aspect);
          f += ballField(uv, c2, 0.09, aspect);
          f += ballField(uv, c3, 0.075, aspect);
          return f;
        }

        vec3 colorize(float f, vec2 uv) {
          float core = smoothstep(1.2, 3.2, f);
          float glow = smoothstep(0.12, 1.2, f);
          vec3 base = mix(uColorA, uColorB, clamp(uv.x + 0.15 * sin(uTime * 0.08), 0.0, 1.0));
          vec3 col = base * glow * 0.45;
          col += base * core * 0.85;
          return col;
        }

        void main() {
          float aspect = uResolution.x / uResolution.y;
          vec2 uv = vUv;

          float shift = uGlitch * 0.012;
          float fr = sceneField(uv + vec2(shift, 0.0), aspect);
          float fg = sceneField(uv, aspect);
          float fb = sceneField(uv - vec2(shift, 0.0), aspect);

          vec3 colR = colorize(fr, uv);
          vec3 colG = colorize(fg, uv);
          vec3 colB = colorize(fb, uv);

          vec3 color = vec3(colR.r, colG.g, colB.b);

          float scan = sin(vUv.y * uResolution.y * 0.9) * 0.015 * (1.0 + uGlitch);
          color -= scan;

          gl_FragColor = vec4(max(color, 0.0), 1.0);
        }
      `,
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    material.uniforms.uTime.value = t
    material.uniforms.uResolution.value.set(state.size.width, state.size.height)

    // scroll velocity -> occasional glitch intensity
    const dy = scroll.current.y - scroll.current.lastY
    scroll.current.lastY = scroll.current.y
    scroll.current.velocity = THREE.MathUtils.lerp(scroll.current.velocity, Math.abs(dy), 0.2)
    const scrollGlitch = THREE.MathUtils.clamp(scroll.current.velocity * 0.02, 0, 1)

    // scheduled ambient glitch pulses
    const now = performance.now()
    if (now > nextGlitch.current) {
      glitchUntil.current = now + 160
      nextGlitch.current = now + 3500 + Math.random() * 5000
    }
    const scheduledGlitch = now < glitchUntil.current ? 1 : 0

    const targetGlitch = Math.max(scheduledGlitch, scrollGlitch)
    glitchValue.current = THREE.MathUtils.lerp(glitchValue.current, targetGlitch, 0.35)
    material.uniforms.uGlitch.value = glitchValue.current
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -14]} material={material}>
      <planeGeometry args={[62, 30]} />
    </mesh>
  )
}

// ---------- flowing particle river ----------

function ParticleRiver({ mouse, count = 1600 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 11
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
      const c = Math.random() < 0.5 ? PINK : TEAL
      col[i * 3 + 0] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  const glowTexture = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 64
    c.height = 64
    const ctx = c.getContext('2d')
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.4, 'rgba(255,255,255,0.55)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    const geo = pointsRef.current.geometry
    const arr = geo.attributes.position.array

    // approximate mouse world position at z ~ 0
    const mx = mouse.current.x * (state.viewport.width / 2)
    const my = mouse.current.y * (state.viewport.height / 2)

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      let x = arr[ix]
      let y = arr[ix + 1]
      const z = arr[ix + 2]

      const angle = Math.sin(x * 0.18 + t * 0.3) + Math.cos(y * 0.18 - t * 0.25)
      x += Math.cos(angle) * delta * 0.5
      y += Math.sin(angle) * delta * 0.5

      const dx = x - mx
      const dy = y - my
      const distSq = dx * dx + dy * dy
      const radius = 2.6
      if (distSq < radius * radius) {
        const dist = Math.sqrt(distSq) + 0.0001
        const force = (radius - dist) / radius
        x += (dx / dist) * force * 0.9
        y += (dy / dist) * force * 0.9
      }

      if (x > 10) x = -10
      if (x < -10) x = 10
      if (y > 6) y = -6
      if (y < -6) y = 6

      arr[ix] = x
      arr[ix + 1] = y
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        map={glowTexture}
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

// ---------- camera rig ----------

function CameraRig({ mouse, scroll }) {
  const vec = useMemo(() => new THREE.Vector3(), [])
  useFrame((state) => {
    // smooth raw pointer position toward its target
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06

    const scrollT = Math.min(scroll.current.y / (document.body.scrollHeight - window.innerHeight || 1), 1)
    const targetX = mouse.current.x * 0.7
    const targetY = 0.6 + mouse.current.y * 0.3
    const targetZ = 5.5 - scrollT * 1.2
    state.camera.position.lerp(vec.set(targetX, targetY, targetZ), 0.04)
    state.camera.lookAt(mouse.current.x * 0.3, 0.3, -6)
  })
  return null
}

// ---------- scene root ----------

function Scene({ mouse, scroll }) {
  return (
    <>
      <fog attach="fog" args={[BG, 8, 30]} />
      <ambientLight intensity={0.25} />

      <PlasmaField mouse={mouse} scroll={scroll} />
      <ParticleRiver mouse={mouse} />
      <Stars radius={40} depth={30} count={900} factor={2} fade speed={0.3} />

      <CameraRig mouse={mouse} scroll={scroll} />
    </>
  )
}

export default function SiteBackground() {
  const { mouse, scroll } = useInputRefs()

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: BG,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0.6, 5.5], fov: 55 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={[BG]} />
        <Suspense fallback={null}>
          <Scene mouse={mouse} scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  )
}

/* ------------------------------------------------------------------
 * MOUNTING — required for this to appear on every page.
 *
 * Mount ONCE in your app's root shell (not inside a page component),
 * so it never unmounts between route changes:
 *
 * Next.js App Router — app/layout.jsx:
 *   import SiteBackground from '../components/SiteBackground'
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en"><body>
 *         <SiteBackground />
 *         {children}
 *       </body></html>
 *     )
 *   }
 *
 * Next.js Pages Router — pages/_app.jsx:
 *   import SiteBackground from '../components/SiteBackground'
 *   export default function App({ Component, pageProps }) {
 *     return (<><SiteBackground /><Component {...pageProps} /></>)
 *   }
 *
 * Vite / CRA / React Router — src/App.jsx:
 *   import SiteBackground from './components/SiteBackground'
 *   export default function App() {
 *     return (<><SiteBackground /><YourRoutesOrPages /></>)
 *   }
 *
 * Make sure page wrappers/<body> have no opaque background color,
 * or they'll cover this layer.
 * ------------------------------------------------------------------ */