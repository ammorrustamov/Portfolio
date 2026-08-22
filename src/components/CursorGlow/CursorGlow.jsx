import React, { useEffect, useRef } from 'react'
import './CursorGlow.css'

const CursorGlow = () => {
  const glowRef = useRef(null)
  const trailRef = useRef(null)

  useEffect(() => {
    if (window.innerWidth < 768) return

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event

      if (glowRef.current) {
        glowRef.current.style.left = `${clientX}px`
        glowRef.current.style.top = `${clientY}px`
      }

      if (trailRef.current && Math.random() > 0.55) {
        const particle = document.createElement('span')
        particle.className = 'cursorParticle'
        particle.style.left = `${clientX + (Math.random() - 0.5) * 10}px`
        particle.style.top = `${clientY + (Math.random() - 0.5) * 10}px`
        particle.style.width = `${4 + Math.random() * 4}px`
        particle.style.height = particle.style.width

        trailRef.current.appendChild(particle)

        setTimeout(() => particle.remove(), 400)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursorGlow" />
      <div ref={trailRef} className="cursorTrail" />
    </>
  )
}

export default CursorGlow
