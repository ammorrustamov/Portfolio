// src/components/Contact.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaTelegram, FaGithub, FaMapMarkerAlt } from 'react-icons/fa'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Contact.module.css'

const Contact = () => {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    telegramUsername: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const content = {
    en: {
      title: 'Contact',
      subtitle: "Let's Connect",
      desc: 'Feel free to reach out for collaborations or just a chat.',
      name: 'Your Name',
      telegram: 'Your Telegram Username (e.g., @username)',
      message: 'Your Message',
      send: 'Send Message',
      sending: 'Sending...',
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.'
    },
    uz: {
      title: 'Aloqa',
      subtitle: "Bog'lanamiz",
      desc: 'Hamkorlik yoki shunchaki suhbat uchun murojaat qiling.',
      name: 'Ismingiz',
      telegram: 'Telegram usernamingiz (masalan, @username)',
      message: 'Xabaringiz',
      send: 'Xabar Yuborish',
      sending: 'Yuborilmoqda...',
      success: 'Xabar muvaffaqiyatli yuborildi!',
      error: 'Xabar yuborilmadi. Qayta urinib ko\'ring.'
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Telegram bot orqali xabar yuborish
      const BOT_TOKEN = '8697859480:AAF8d-lJk8Y0-qLsKucWCMXFZ97PYumEg-w' // BotFather dan olingan token
      const CHAT_ID = '8513337432' // Sizning Telegram ID'ingiz
      
      const message = `
📩 Yangi xabar:

👤 Ism: ${formData.name}
📱 Telegram: ${formData.telegramUsername}
💬 Xabar: ${formData.message}
      `

      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', telegramUsername: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Xatolik:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
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
            
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder={content[language].name} 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              
              <input 
                type="text" 
                name="telegramUsername"
                placeholder={content[language].telegram} 
                value={formData.telegramUsername}
                onChange={handleChange}
                required 
              />
              
              <textarea 
                name="message"
                rows="5" 
                placeholder={content[language].message} 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              
              <button 
                type="submit" 
                className="btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? content[language].sending : content[language].send}
              </button>
              
              {submitStatus === 'success' && (
                <p className={styles.successMessage}>{content[language].success}</p>
              )}
              {submitStatus === 'error' && (
                <p className={styles.errorMessage}>{content[language].error}</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact