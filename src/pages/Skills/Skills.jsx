// src/components/Skills.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaDatabase } from 'react-icons/fa'
import { SiRedux, SiExpress, SiMongodb, SiFigma, SiVercel } from 'react-icons/si'
import { useLanguage } from '../../LanguageContext/LanguageContext'
import styles from './Skills.module.css'

const Skills = () => {
  const { language } = useLanguage()

  const categories = {
    en: [
      {
        title: 'Frontend',
        items: [
          { name: 'HTML', icon: <FaHtml5 /> },
          { name: 'CSS', icon: <FaCss3Alt /> },
          { name: 'JavaScript', icon: <FaJs /> },
          { name: 'React', icon: <FaReact /> },
          { name: 'Redux', icon: <SiRedux /> }
        ]
      },
      {
        title: 'Backend',
        items: [
          { name: 'Node.js', icon: <FaNodeJs /> },
          { name: 'Express', icon: <SiExpress /> },
          { name: 'REST APIs', icon: <FaDatabase /> }
        ]
      },
      {
        title: 'Database',
        items: [
          { name: 'MongoDB', icon: <SiMongodb /> }
        ]
      },
      {
        title: 'Tools',
        items: [
          { name: 'Git', icon: <FaGitAlt /> },
          { name: 'GitHub', icon: <FaGithub /> },
          { name: 'Figma', icon: <SiFigma /> },
          { name: 'Vercel', icon: <SiVercel /> }
        ]
      }
    ],
    uz: [
      {
        title: 'Frontend',
        items: [
          { name: 'HTML', icon: <FaHtml5 /> },
          { name: 'CSS', icon: <FaCss3Alt /> },
          { name: 'JavaScript', icon: <FaJs /> },
          { name: 'React', icon: <FaReact /> },
          { name: 'Redux', icon: <SiRedux /> }
        ]
      },
      {
        title: 'Backend',
        items: [
          { name: 'Node.js', icon: <FaNodeJs /> },
          { name: 'Express', icon: <SiExpress /> },
          { name: 'REST API', icon: <FaDatabase /> }
        ]
      },
      {
        title: 'Ma’lumotlar bazasi',
        items: [
          { name: 'MongoDB', icon: <SiMongodb /> }
        ]
      },
      {
        title: 'Asboblar',
        items: [
          { name: 'Git', icon: <FaGitAlt /> },
          { name: 'GitHub', icon: <FaGithub /> },
          { name: 'Figma', icon: <SiFigma /> },
          { name: 'Vercel', icon: <SiVercel /> }
        ]
      }
    ]
  }

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
          <h2 className={styles.sectionTitle}>{language === 'en' ? 'Skills' : "Ko'nikmalar"}</h2>
          <div className={styles.skillGroups}>
            {categories[language].map((group, idx) => (
              <motion.div
                key={group.title}
                className={styles.skillGroup}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <h3>{group.title}</h3>
                <div className={styles.skillList}>
                  {group.items.map((skill) => (
                    <div key={skill.name} className={styles.skillCard}>
                      <span className={styles.skillIcon}>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
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