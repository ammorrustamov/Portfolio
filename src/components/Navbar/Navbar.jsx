// src/components/Navbar.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLangHovered, setIsLangHovered] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const navLinks = {
    en: ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'],
    uz: ['Bosh Sahifa', 'Men Haqimda', "Ko'nikmalar", 'Xizmatlar', 'Loyihalar', 'Aloqa']
  }

  const scrollTo = (id) => {
    const sectionMap = {
      'Home': 'home',
      'About': 'about',
      'Skills': 'skills',
      'Services': 'services',
      'Projects': 'projects',
      'Contact': 'contact',
      'Bosh Sahifa': 'home',
      'Men Haqimda': 'about',
      "Ko'nikmalar": 'skills',
      'Xizmatlar': 'services',
      'Loyihalar': 'projects',
      'Aloqa': 'contact'
    }
    const el = document.getElementById(sectionMap[id])
    if (el) el.scrollIntoView({ behavior: 'smooth' })
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
          {/* ===== LOGO + TIL TUGMASI ===== */}
          <div className={styles.logoSection}>
            <motion.div 
              className={styles.logo}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="gradient-text">Ammorxon</span>
            </motion.div>

            {/* Til o'zgartirish tugmasi - logoning yonida */}
            <motion.button
              className={styles.langBtn}
              onClick={toggleLanguage}
              onMouseEnter={() => setIsLangHovered(true)}
              onMouseLeave={() => setIsLangHovered(false)}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                rotate: isLangHovered ? [0, -10, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                animate={{ rotate: language === 'en' ? 0 : 360 }}
                transition={{ duration: 0.6, type: 'spring' }}
              >
                🌐
              </motion.span>
              <span className={styles.langText}>
                {language === 'en' ? 'UZ' : 'EN'}
              </span>
            </motion.button>
          </div>

          {/* ===== MENYU LINKLARI ===== */}
          <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
            {navLinks[language].map((link, index) => (
              <motion.li 
                key={link}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button onClick={() => scrollTo(link)}>{link}</button>
              </motion.li>
            ))}
          </ul>

          {/* ===== HAMBURGER ===== */}
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

      {/* ===== TIL O'ZGARGANDA ANIMATSIYA ===== */}
      {/* <AnimatePresence>
        <motion.div
          key={language}
          className={styles.langChangeIndicator}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          {language === 'en' ? '🇬🇧 English' : '🇺🇿 O\'zbekcha'}
        </motion.div>
      </AnimatePresence> */}
    </motion.nav>
  )
}

export default Navbar