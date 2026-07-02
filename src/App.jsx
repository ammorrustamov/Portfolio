// src/App.jsx
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './pages/About/About'
import Skills from './pages/Skills/Skills'
import Services from './pages/Services/Services'
import Timeline from './pages/Timeline/Timeline'
import Projects from './pages/Projects/Projects'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { LanguageProvider } from '../src/LanguageContext/LanguageContext'
import './App.css'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <LanguageProvider>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Timeline />
      <Projects />
      <Contact />
      <Footer />
    </LanguageProvider>
  )
}

export default App