// src/components/Skills.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub } from 'react-icons/fa'
import { SiRedux, SiExpress, SiMongodb } from 'react-icons/si'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Skills.module.css'

const Skills = () => {
  const { language } = useLanguage()

  const skillData = [
    { name: { en: 'HTML', uz: 'HTML' }, icon: <FaHtml5 />, level: 90 },
    { name: { en: 'CSS', uz: 'CSS' }, icon: <FaCss3Alt />, level: 85 },
    { name: { en: 'JavaScript', uz: 'JavaScript' }, icon: <FaJs />, level: 60 },
    { name: { en: 'React', uz: 'React' }, icon: <FaReact />, level: 75 },
    { name: { en: 'Redux', uz: 'Redux' }, icon: <SiRedux />, level: 45 },
    { name: { en: 'Node.js', uz: 'Node.js' }, icon: <FaNodeJs />, level: 50 },
    { name: { en: 'Express', uz: 'Express' }, icon: <SiExpress />, level: 55 },
    { name: { en: 'MongoDB', uz: 'MongoDB' }, icon: <SiMongodb />, level: 60 },
    { name: { en: 'Git', uz: 'Git' }, icon: <FaGitAlt />, level: 40 },
    { name: { en: 'GitHub', uz: 'GitHub' }, icon: <FaGithub />, level: 55 },
  ]

  return (
    <section id="skills" className={`${styles.skills} section-padding`}>
      <div className="container">
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>{language === 'en' ? 'Skills' : 'Ko\'nikmalar'}</h2>
          <div className={styles.skillsGrid}>
            {skillData.map((skill, idx) => (
              <motion.div
                key={idx}
                className={styles.skillCard}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.skillIcon}>{skill.icon}</div>
                <h4>{skill.name[language]}</h4>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills