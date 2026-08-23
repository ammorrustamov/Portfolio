// src/components/Services.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaServer, FaMobileAlt, FaPlug, FaPaintBrush } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Services.module.css'

const Services = () => {
  const { language } = useLanguage()

  const services = {
    en: [
      { icon: <FaCode />, title: 'Frontend Development', desc: 'React, Redux, responsive UIs with modern design.' },
      { icon: <FaServer />, title: 'Backend Development', desc: 'Node.js, Express, REST APIs, MongoDB.' },
      { icon: <FaMobileAlt />, title: 'Responsive Design', desc: 'Pixel-perfect, mobile-first layouts.' },
      { icon: <FaPlug />, title: 'REST API Integration', desc: 'Seamless third-party API integration.' },
      { icon: <FaPaintBrush />, title: 'UI Development', desc: 'Interactive, accessible components.' },
    ],
    uz: [
      { icon: <FaCode />, title: 'Frontend Dasturlash', desc: 'React, Redux, zamonaviy dizayn bilan responsive interfeyslar.' },
      { icon: <FaServer />, title: 'Backend Dasturlash', desc: 'Node.js, Express, REST API, MongoDB.' },
      { icon: <FaMobileAlt />, title: 'Responsive Dizayn', desc: 'Pixel-perfect, mobil-birinchi dizayn.' },
      { icon: <FaPlug />, title: 'REST API Integratsiya', desc: 'Uchinchi tomon API lari bilan uzluksiz integratsiya.' },
      { icon: <FaPaintBrush />, title: 'UI Dasturlash', desc: 'Interaktiv, qulay komponentlar.' },
    ]
  }

  return (
    <section id="services" className={`${styles.services} section-padding`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>{language === 'en' ? 'Services' : 'Xizmatlar'}</h2>
          <div className={styles.servicesGrid}>
            {services[language].map((svc, idx) => (
              <motion.div
                key={idx}
                className={styles.serviceCard}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.iconWrapper}>{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services