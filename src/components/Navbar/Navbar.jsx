// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import styles from './Navbar.module.css'

const navLinks = {
  en: [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ],
  uz: [
    { label: 'Bosh Sahifa', id: 'home' },
    { label: 'Men Haqimda', id: 'about' },
    { label: "Ko'nikmalar", id: 'skills' },
    { label: 'Xizmatlar', id: 'services' },
    { label: 'Loyihalar', id: 'projects' },
    { label: 'Aloqa', id: 'contact' }
  ]
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLangHovered, setIsLangHovered] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  useEffect(() => {
    const sections = navLinks[language]
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180
      let current = 'home'

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          current = section.id
        }
      })

      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [language])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
  }

  return (
    <motion.nav
      className={`${styles.navbar} glass`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <div className={styles.navInner}>
          <div className={styles.logoSection}>
            <motion.div
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="gradient-text">Ammorxon</span>
            </motion.div>

            <motion.button
              className={styles.langBtn}
              onClick={toggleLanguage}
              onMouseEnter={() => setIsLangHovered(true)}
              onMouseLeave={() => setIsLangHovered(false)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isLangHovered ? [0, -10, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ rotate: language === 'en' ? 0 : 360 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                
              </motion.span>
              <span className={styles.langText}>{language === 'en' ? 'UZ' : 'EN'}</span>
            </motion.button>

            <ThemeToggle />
          </div>

          <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
            {navLinks[language].map((link, index) => (
              <motion.li
                key={link.id}
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <button
                  className={activeSection === link.id ? styles.activeLink : ''}
                  onClick={() => scrollTo(link.id)}
                >
                  {link.label}
                </button>
              </motion.li>
            ))}
          </ul>

          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          </button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar