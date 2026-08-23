// src/components/About.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaUser, FaMapMarkerAlt, FaGlobe, FaBriefcase } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './About.module.css'

const About = () => {
  const { language } = useLanguage()

  const content = {
    en: {
      title: 'About Me',
      description: 'I am Ammorxon, a passionate Full Stack Developer from Uzbekistan. I have completed both Frontend and Backend development training. I enjoy building modern, responsive and user-friendly web applications. I work with React, Node.js, Express and MongoDB and continuously improve my programming skills through real-world projects.',
      role: 'Full Stack Developer',
      experience: '2+ Year of Learning Experience',
      location: 'Namangan, Uzbekistan',
      languages: 'Uzbek · English',
      journey: 'My Journey',
      start: 'Started Frontend Development',
      backend: 'Backend & Full Stack Training',
      projects: 'Real-world Projects & Freelance'
    },
    uz: {
      title: 'Men Haqimda',
      description: 'Men Ammorxon, O\'zbekistondan kelgan ishtiyoqli Full Stack dasturchiman. Men Frontend va Backend dasturlash bo\'yicha to\'liq ta\'limni tamomlaganman. Men zamonaviy, responsive va foydalanuvchilarga qulay veb-ilovalar yaratishni yoqtiraman. Men React, Node.js, Express va MongoDB bilan ishlayman va real loyihalar orqali dasturlash ko\'nikmalarimni doimiy ravishda oshirib boraman.',
      role: 'Full Stack Dasturchi',
      experience: '2+ Yil oqish tajribasi',
      location: 'Namangan, O\'zbekiston',
      languages: 'O\'zbek · Ingliz',
      journey: 'Mening Yo\'lim',
      start: 'Frontend Dasturlashni Boshladim',
      backend: 'Backend va Full Stack Ta\'limi',
      projects: 'Real Loyihalar va Freelance'
    }
  }

  return (
    <section id="about" className={`${styles.about} section-padding`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>{content[language].title}</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p>{content[language].description}</p>
              <div className={styles.infoGrid}>
                <div><FaUser /> <span>{content[language].role}</span></div>
                <div><FaBriefcase /> <span>{content[language].experience}</span></div>
                <div><FaMapMarkerAlt /> <span>{content[language].location}</span></div>
                <div><FaGlobe /> <span>{content[language].languages}</span></div>
              </div>
            </div>
            <div className={styles.timelineCard}>
              <h3>{content[language].journey}</h3>
              <div className={styles.timelineItem}>
                <span className={styles.timelineYear}>2024</span>
                <p>{content[language].start}</p>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineYear}>2025</span>
                <p>{content[language].backend}</p>
              </div>
              <div className={styles.timelineItem}>
                <span className={styles.timelineYear}>2026</span>
                <p>{content[language].projects}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About