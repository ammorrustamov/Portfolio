// src/components/Contact.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaTelegram, FaGithub, FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Contact.module.css'

const Contact = () => {
  const { language } = useLanguage()

  const content = {
    en: {
      title: 'Contact',
      subtitle: "Let's Connect",
      desc: 'Feel free to reach out for collaborations or just a chat.',
      name: 'Your Name',
      email: 'Your Email',
      message: 'Your Message',
      send: 'Send Message'
    },
    uz: {
      title: 'Aloqa',
      subtitle: "Bog'lanamiz",
      desc: 'Hamkorlik yoki shunchaki suhbat uchun murojaat qiling.',
      name: 'Ismingiz',
      email: 'Emailingiz',
      message: 'Xabaringiz',
      send: 'Xabar Yuborish'
    }
  }

  return (
    <section id="contact" className={`${styles.contact} section-padding`}>
      <div className="container">
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>{content[language].title}</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactInfo}>
              <h3>{content[language].subtitle}</h3>
              <p>{content[language].desc}</p>
              <div className={styles.infoItem}>
              <FaEnvelope /> <span>ammorrustamoov@gmail.com</span>
              </div>
              <div className={styles.infoItem}>
                <FaTelegram /> <span>@rustamoov_pm</span>
              </div>
              <div className={styles.infoItem}>
                <FaGithub /> <span>github.com/ammorrustamov</span>
              </div>
       
              <div className={styles.infoItem}>
                <FaMapMarkerAlt /> <span>{language === 'en' ? 'Namangan, Uzbekistan' : 'Namangan, O\'zbekiston'}</span>
              </div>
            </div>
            <form className={styles.contactForm}>
              <input type="text" placeholder={content[language].name} required />
              <input type="email" placeholder={content[language].email} required />
              <textarea rows="5" placeholder={content[language].message} required></textarea>
              <button type="submit" className="btn-primary">{content[language].send}</button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact