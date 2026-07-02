// src/components/Timeline.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Timeline.module.css'

const Timeline = () => {
  const { language } = useLanguage()

  const timelineData = {
    en: [
      { year: '2024', title: 'Frontend Learning', desc: 'HTML, CSS, JavaScript, React basics.' },
      { year: '2025', title: 'Backend Learning', desc: 'Node.js, Express, MongoDB, full stack.' },
      { year: '2026', title: 'Projects & Growth', desc: 'Real-world apps, freelance, open source.' },
    ],
    uz: [
      { year: '2024', title: 'Frontend O\'rganish', desc: 'HTML, CSS, JavaScript, React asoslari.' },
      { year: '2025', title: 'Backend O\'rganish', desc: 'Node.js, Express, MongoDB, full stack.' },
      { year: '2026', title: 'Loyihalar va O\'sish', desc: 'Real ilovalar, freelance, ochiq kod.' },
    ]
  }

  return (
    <section id="experience" className={`${styles.timeline} section-padding`}>
      <div className="container">
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>{language === 'en' ? 'Experience Timeline' : 'Tajriba Vaqt Jadvalli'}</h2>
          <div className={styles.timelineList}>
            {timelineData[language].map((item, idx) => (
              <motion.div
                key={idx}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <span className={styles.year}>{item.year}</span>
                <div className={styles.content}>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline