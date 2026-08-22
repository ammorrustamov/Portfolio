// src/components/Footer.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowUp, FaGithub, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '../..//LanguageContext/LanguageContext'
import styles from './Footer.module.css'

const Footer = () => {
  const { language } = useLanguage()
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerInner}>
          <p>&copy; {new Date().getFullYear()} Ammorxon. {language === 'en' ? 'All rights reserved.' : 'Barcha huquqlar himoyalangan.'}</p>
          <div className={styles.socials}>
            <a href="https://github.com/ammorrustamov" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
            <a href="https://t.me/rustamoov_pm" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><FaTelegram /></a>
          </div>
          <motion.button
            className={styles.backToTop}
            onClick={scrollToTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer