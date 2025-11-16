import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Spline from '@splinetool/react-spline'

function App() {
  const slides = useMemo(
    () => [
      {
        id: 'intro',
        kicker: 'Dark Presentation',
        title: 'Shadows & Stories',
        subtitle: 'An educational look at violent crime in media & real life',
        points: [
          'This is a thematic, awareness-first presentation — no instructions or glorification',
          'Focus: impact, investigation, media portrayals, and prevention resources',
          'Use arrow keys or the controls to navigate'
        ]
      },
      {
        id: 'define',
        kicker: 'Framing the topic',
        title: 'What does the term “homicide” mean?',
        subtitle: 'Clear terms help avoid myths and misconceptions',
        points: [
          'Legal definitions vary by jurisdiction (e.g., murder vs. manslaughter)',
          'Not all killings are unlawful (e.g., self-defense may be justified in some regions)',
          'Language in media often compresses nuance — be precise when discussing cases'
        ]
      },
      {
        id: 'impact',
        kicker: 'Human impact',
        title: 'The ripple effect on communities',
        subtitle: 'Beyond headlines are victims, families, and neighborhoods',
        points: [
          'Trauma and long-term mental health effects for survivors and loved ones',
          'Community trust, local businesses, and public spaces can be affected',
          'Victim support services and trauma-informed care are critical resources'
        ]
      },
      {
        id: 'investigation',
        kicker: 'Process, not spectacle',
        title: 'How investigations move forward',
        subtitle: 'Procedural overview (non-instructional)',
        points: [
          'Initial response: scene safety, medical aid, and securing the area',
          'Evidence handling: documentation and chain-of-custody practices',
          'Collaboration: detectives, forensics, prosecutors, and community tips'
        ]
      },
      {
        id: 'media',
        kicker: 'Media vs. reality',
        title: 'Stories we watch vs. facts we need',
        subtitle: 'Separating cinematic drama from real-world complexity',
        points: [
          'Fiction compresses time and certainty — real cases can be slow and uncertain',
          'Dramatization can unintentionally glamorize — beware of aestheticizing harm',
          'Ethical storytelling centers dignity, context, and verified information'
        ]
      },
      {
        id: 'prevention',
        kicker: 'Do something that helps',
        title: 'Prevention, support, and learning more',
        subtitle: 'Constructive directions for action',
        points: [
          'Learn de-escalation basics and local bystander-safety guidance',
          'Support victim advocacy groups and trauma services in your area',
          'Consume and share responsible media; avoid spreading unverified claims'
        ]
      }
    ],
    []
  )

  const [index, setIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (!autoPlay) return
    const t = setTimeout(next, 7000)
    return () => clearTimeout(t)
  }, [index, autoPlay, next])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const current = slides[index]

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white overflow-hidden">
      {/* Hero with Spline background */}
      <section className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/fvh1rcczCU4MCcKH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Vignette + gradient overlay (don’t block interactions) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <div className="mb-3 text-sm tracking-widest uppercase text-purple-300/80">{current.kicker}</div>
            <h1 className="text-4xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-300 via-fuchsia-300 to-rose-300 drop-shadow-[0_0_25px_rgba(168,85,247,0.25)]">
              {current.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80">{current.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Slide body */}
      <section className="relative w-full px-6 pb-28 -mt-10">
        <div className="mx-auto max-w-5xl rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 sm:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.ul
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45 }}
              className="grid gap-3 text-white/90"
            >
              {current.points.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.35 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.65)]" />
                  <span className="text-base sm:text-lg leading-relaxed">{p}</span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 transition"
                aria-label="Previous slide"
              >
                ← Prev
              </button>
              <button
                onClick={next}
                className="px-4 py-2 rounded-md bg-fuchsia-500/80 hover:bg-fuchsia-500 text-black font-semibold shadow"
                aria-label="Next slide"
              >
                Next →
              </button>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={autoPlay}
                  onChange={(e) => setAutoPlay(e.target.checked)}
                  className="accent-fuchsia-400"
                />
                Auto-play
              </label>
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === index ? 'bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.75)]' : 'bg-white/25 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="mx-auto max-w-5xl text-center text-xs sm:text-sm text-white/50 mt-6">
          This presentation is for awareness and educational purposes. If you or someone you know needs help, seek local resources and emergency services.
        </div>
      </section>
    </div>
  )
}

export default App
