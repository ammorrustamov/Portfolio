import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './ThreeBackground.css'

const ThreeBackground = () => {
  const containerRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetMouseRef = useRef({ x: 0, y: 0 })
  const animationIdRef = useRef(null)
  const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth < 768)
  const reducedMotionRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 120

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0x8bd3ff, 0.45)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x38bdf8, 1.2, 220)
    pointLight.position.set(20, 15, 70)
    scene.add(pointLight)

    const particleCount = isMobileRef.current ? 28 : 62
    const particlePositions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)
    const particles = []

    const colorPalette = [
      new THREE.Color('#7dd3fc'),
      new THREE.Color('#67e8f9'),
      new THREE.Color('#a78bfa'),
      new THREE.Color('#60a5fa')
    ]

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 150
      const y = (Math.random() - 0.5) * 110
      const z = (Math.random() - 0.5) * 100

      particlePositions[i * 3] = x
      particlePositions[i * 3 + 1] = y
      particlePositions[i * 3 + 2] = z

      const color = colorPalette[i % colorPalette.length]
      particleColors[i * 3] = color.r
      particleColors[i * 3 + 1] = color.g
      particleColors[i * 3 + 2] = color.b

      particles.push({
        x,
        y,
        z,
        speed: 0.08 + Math.random() * 0.18,
        drift: Math.random() * Math.PI * 2,
        radius: 0.8 + Math.random() * 1.1
      })
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    })

    const particlesMesh = new THREE.Points(geometry, material)
    particlesMesh.rotation.x = 0.3
    scene.add(particlesMesh)

    const orbGeometry = new THREE.IcosahedronGeometry(2.6, 1)
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    })
    const orb = new THREE.Mesh(orbGeometry, orbMaterial)
    orb.position.set(28, -12, -18)
    scene.add(orb)

    const ringGeometry = new THREE.TorusGeometry(18, 0.09, 12, 180)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7dd3fc,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.set(-18, 12, -32)
    ring.rotation.x = Math.PI / 2.2
    scene.add(ring)

    const onMouseMove = (event) => {
      if (isMobileRef.current) return
      targetMouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2
      targetMouseRef.current.y = -(event.clientY / window.innerHeight - 0.5) * 2
    }

    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    }

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04

      const positions = particlesMesh.geometry.attributes.position.array
      const time = performance.now() * 0.0005

      for (let i = 0; i < particleCount; i++) {
        const index = i * 3
        const p = particles[i]

        p.y += Math.sin(time * 3 + p.drift) * 0.02 + p.speed * 0.015
        p.x += Math.cos(time * 2.3 + p.drift) * 0.025

        if (p.y > 55) p.y = -55
        if (p.y < -55) p.y = 55
        if (p.x > 75) p.x = -75
        if (p.x < -75) p.x = 75

        if (!isMobileRef.current) {
          const dx = p.x - mouseRef.current.x * 28
          const dy = p.y - mouseRef.current.y * 22
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 18) {
            p.x += (dx / (dist || 1)) * 0.13
            p.y += (dy / (dist || 1)) * 0.13
          }
        }

        positions[index] = p.x
        positions[index + 1] = p.y
        positions[index + 2] = p.z
      }

      particlesMesh.geometry.attributes.position.needsUpdate = true
      particlesMesh.rotation.y += reducedMotionRef.current ? 0.0008 : 0.0015
      particlesMesh.rotation.x = 0.25 + mouseRef.current.y * 0.2

      camera.position.x += (mouseRef.current.x * 2.5 - camera.position.x) * 0.03
      camera.position.y += (mouseRef.current.y * 1.2 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      orb.rotation.x += 0.003
      orb.rotation.y += 0.005
      orb.position.x += (28 + mouseRef.current.x * 10 - orb.position.x) * 0.03
      orb.position.y += (-12 + mouseRef.current.y * 8 - orb.position.y) * 0.03

      ring.rotation.z += 0.002
      ring.rotation.y += 0.003

      renderer.render(scene, camera)
    }

    animate()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animationIdRef.current)

      geometry.dispose()
      material.dispose()
      orbGeometry.dispose()
      orbMaterial.dispose()
      ringGeometry.dispose()
      ringMaterial.dispose()
      renderer.dispose()

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="threeContainer" />
}

export default ThreeBackground
