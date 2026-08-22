// src/components/Hero.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaEnvelope, FaGithub, FaTelegram } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Hero.module.css'
import profilePlaceholder from '../../assets/Ammorxon.jpg'

const Hero = () => {
  const { language } = useLanguage()

  const handleDownloadClick = (event) => {
    event.preventDefault()

    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('DOWNLOAD_APP')
      return
    }
  }

  const content = {
    en: {
      greeting: 'Hello, I’m',
      title: 'Full Stack Developer',
      headline: 'Building polished digital products with purpose.',
      subtitle: 'I design and develop responsive web experiences that are clean, fast, and built to perform.',
      location: 'Namangan, Uzbekistan · Available for work',
      download: 'Download CV',
      contact: 'Contact'
    },
    uz: {
      greeting: 'Salom, men',
      title: 'Full Stack Dasturchi',
      headline: 'Maqsadga yo‘naltirilgan, zamonaviy web mahsulotlar yarataman.',
      subtitle: 'Men tezkor, responsive va foydalanuvchi uchun qulay veb-ilovalarni loyihalayman va ishlab chiqaraman.',
      location: 'Namangan, O‘zbekiston · Ish uchun tayyor',
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
            <div className={styles.kickerRow}>
              <span className={styles.kicker}>{content[language].greeting}</span>
              <span className={styles.statusBadge}>Available</span>
            </div>
            <h1 className={styles.name}>
              <span className="gradient-text">Ammorxon</span>
            </h1>
            <h2 className={styles.title}>{content[language].title}</h2>
            <p className={styles.headline}>{content[language].headline}</p>
            <p className={styles.subtitle}>{content[language].subtitle}</p>
            <p className={styles.location}>{content[language].location}</p>

            <div className={styles.ctaGroup}>
              <a href="#" className="btn-primary" onClick={handleDownloadClick}>
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