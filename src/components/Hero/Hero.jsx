// src/components/Hero.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaEnvelope, FaGithub, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Hero.module.css'
import profilePlaceholder from '../../assets/Ammor.jpg'

const Hero = () => {
  const { language } = useLanguage()

  const content = {
    en: {
      greeting: "👋 Hello, I'm",
      title: 'Full Stack Developer',
      subtitle: 'Frontend Developer · React Developer · Node.js Developer',
      location: '📍 Namangan, Uzbekistan · 1+ Year',
      download: 'Download CV',
      contact: 'Contact'
    },
    uz: {
      greeting: "👋 Salom, Men",
      title: 'Full Stack Dasturchi',
      subtitle: 'Frontend Dasturchi · React Dasturchi · Node.js Dasturchi',
      location: '📍 Namangan, O\'zbekiston · 1+ Yil',
      download: 'CV Yuklab Olish',
      contact: 'Aloqa'
    }
  }

  return (
    <section id="home" className={`${styles.hero} section-padding`}>
      <div className="container">
        <div className={styles.heroGrid}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className={styles.greeting}>{content[language].greeting}</p>
            <h1 className={styles.name}>
              <span className="gradient-text">Ammorxon</span>
            </h1>
            <h2 className={styles.title}>{content[language].title}</h2>
            <p className={styles.subtitle}>{content[language].subtitle}</p>
            <p className={styles.location}>{content[language].location}</p>

            <div className={styles.ctaGroup}>
              <a href="#" className="btn-primary">
                <FaDownload /> {content[language].download}
              </a>
              <a href="#contact" className="btn-outline">
                <FaEnvelope /> {content[language].contact}
              </a>
            </div>

            <div className={styles.socialLinks}>
<a href="https://github.com/ammorrustamov" aria-label="GitHub"><FaGithub /></a>
              <a href="https://t.me/rustamoov_pm" aria-label="Telegram"><FaTelegram /></a>
            </div>
          </motion.div>

          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className={styles.imageWrapper}>
              <img src={profilePlaceholder} alt="Ammorxon" />
              <div className={styles.blurOrb}></div>
              <div className={styles.floatingOrb}></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero