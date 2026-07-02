// src/components/Navbar.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { language, toggleLanguage } = useLanguage()

  const navLinks = {
    en: ['Home', 'About', 'Skills', 'Services', 'Projects', 'Contact'],
    uz: ['Bosh Sahifa', 'Men Haqimda', 'Ko\'nikmalar', 'Xizmatlar', 'Loyihalar', 'Aloqa']
  }
console.log(language);
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
      'Ko\'nikmalar': 'skills',
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
          <div className={styles.logo}>
            <span className="gradient-text">Ammorxon</span>
          </div>

          <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
            {navLinks[language].map((link) => (
              <li key={link}>
                <button onClick={() => scrollTo(link)}>{link}</button>
              </li>
            ))}
            
            <li>
              
              <button onClick={toggleLanguage} className={styles.langBtn}>
                <FaGlobe /> {language === 'en' ? 'UZ' : 'EN'}
              </button>
            </li>
          </ul>

          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
             
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar