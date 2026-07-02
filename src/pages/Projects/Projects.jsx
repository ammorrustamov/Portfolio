  // src/components/Projects.jsx
  import React from 'react'
  import { motion } from 'framer-motion'
  import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
  import { useLanguage } from '../../LanguageContext/LanguageContext'
  import styles from './Projects.module.css'
  import a from '../../assets/Exclusive.png'
  import uzum from '../../assets/uzum.png'
  import kugo from '../../assets/kugo.png'
  import Positivus from '../../assets/Positivus.png'
  import phone from '../../assets/phone.png'
  import Ex from '../../assets/image.png'

  const Projects = () => {
    const { language } = useLanguage()

    const projectsData = {
      en: [
        {
          id: 1,
          name: 'Frontend-Backend connected',
          desc: 'Weather forecast app with interactive maps and hourly updates.',
          tags: ['React', 'API', 'Express.js', 'MongoDB', 'css'],
          github: 'https://github.com/ammorrustamov/Exclusive-0',
          demo: 'https://exclusive-0.vercel.app/',
          image: Ex
        },
        {
          id: 2,
          name: 'Uzum Clone',
          desc: '"A modern e-commerce website inspired by Uzum Market, featuring product browsing, category filtering, responsive design, and a smooth shopping experience."',
          tags: ["Java Script", "Html", "Css"],
          github: 'https://github.com/ammorrustamov/2025uzum',
          demo: 'https://2025uzum.vercel.app/',
          image: uzum 
        },
        {
          id: 3,
          name: 'KUGOO Store',
          desc: 'A modern e-commerce website for KUGOO electric scooters, featuring responsive design, product listings, interactive UI, and a seamless shopping experience.',
          tags: ['React', 'Css', "Java Script", "Html"],
          github: 'https://github.com/ammorrustamov/kugo',
          demo: 'https://kugo-tan.vercel.app/',
          image: kugo
        },
        {
          id: 4,
          name: 'Positivus',
          desc: 'Real-time messaging app with user authentication and private rooms.',
          tags: ['JavaScript', "html", "css"],
          github: 'https://github.com/ammorrustamov/qiynalib-qildim',
          demo: 'https://qiynalib-qildim.vercel.app/',
          image: Positivus
        },
        {
          id: 5,
          name: 'Exclusive-2',
          desc: '"Exclusive is a full-featured e-commerce platform with Stripe payment, admin panel, and a modern React frontend."',
          tags: ['React', "Java Script", "Html", "Css"],
          github: 'https://github.com/ammorrustamov/imtixon',
          demo: 'https://imtixon-gamma-six.vercel.app/',
          image: a // BU RASM
        },
        {
          id: 6,
          name: 'Phone Market',
          desc: 'Full-featured blog with markdown support, comments, and search.',
          tags: ['React', 'Node.js', 'Express', 'MongoDB'],
          github: 'https://github.com/ammorrustamov/projeckt',
          demo: 'https://projeckt-ten.vercel.app/',
          image: phone
        }
      ],
      uz: [
        {
          id: 1,
          name: 'Exclusive',
          desc: '"Exclusive - bu Stripe to\'lovi, boshqaruv paneli va zamonaviy React frontendiga ega to\'liq xususiyatli elektron tijorat platformasi."',
          tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          github: 'https://github.com/ammorrustamov/imtixon',
          demo: 'https://imtixon-gamma-six.vercel.app/',
          image: a // BU RASM
        },
        {
          id: 2,
          name: 'Vazifalarni Boshqarish',
          desc: 'Kanban uslubidagi vazifalar paneli, drag-and-drop va jamoa ishi.',
          tags: ['React', 'Redux', 'Express', 'Socket.io'],
          github: 'https://github.com/ammorrustamov/task-app',
          demo: 'https://task-app-demo.vercel.app/',
          image: null
        },
        {
          id: 3,
          name: 'Portfolio Sayti',
          desc: 'Zamonaviy shaxsiy portfolio, animatsiyalar va responsive dizayn.',
          tags: ['React', 'Framer Motion', 'CSS'],
          github: 'https://github.com/ammorrustamov/portfolio',
          demo: 'https://ammorxon.vercel.app/',
          image: null
        },
        {
          id: 4,
          name: 'Chat Ilovasi',
          desc: 'Real-vaqtda xabar almashish, foydalanuvchi autentifikatsiyasi va xonalar.',
          tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          github: 'https://github.com/ammorrustamov/chat-app',
          demo: 'https://chat-app-demo.vercel.app/',
          image: null
        },
        {
          id: 5,
          name: 'Ob-havo Panel',
          desc: 'Ob-havo prognozi, interaktiv xaritalar va soatlik yangilanishlar.',
          tags: ['React', 'API', 'Chart.js'],
          github: 'https://github.com/ammorrustamov/weather-app',
          demo: 'https://weather-app-demo.vercel.app/',
          image: null
        },
        {
          id: 6,
          name: 'Blog Platformasi',
          desc: 'To\'liq funksiyali blog, markdown qo\'llab-quvvatlashi, izohlar va qidiruv.',
          tags: ['React', 'Node.js', 'Express', 'MongoDB'],
          github: 'https://github.com/ammorrustamov/blog-app',
          demo: 'https://blog-app-demo.vercel.app/',
          image: null
        }
      ]
    }

    return (
      <section id="projects" className={`${styles.projects} section-padding`}>
        <div className="container">
          <motion.div
            className="reveal"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.sectionTitle}>{language === 'en' ? 'Projects' : 'Loyihalar'}</h2>
            <div className={styles.projectsGrid}>
              {projectsData[language].map((project) => (
                <motion.div
                  key={project.id}
                  className={styles.projectCard}
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* ===== RASM KO'RSATISH ===== */}
                  <div className={styles.imagePlaceholder}>
                    {project.image ? (
                      // Agar rasm bo'lsa - rasmni ko'rsat
                      <img 
                        src={project.image} 
                        alt={project.name}
                        className={styles.projectImage}
                      />
                    ) : (
                      // Agar rasm bo'lmasa - emoji ko'rsat
                      <>
                        <span style={{ fontSize: '3rem' }}>📸</span>
                        <span style={{ fontSize: '0.9rem', marginTop: '8px' }}>
                          {language === 'en' ? 'Project Preview' : 'Loyiha Ko\'rinishi'}
                        </span>
                      </>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <h3>{project.name}</h3>
                    <p>{project.desc}</p>
                    <div className={styles.tags}>
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className={styles.cardActions}>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <FaGithub /> {language === 'en' ? 'Code' : 'Kod'}
                      </a>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <FaExternalLinkAlt /> {language === 'en' ? 'Demo' : 'Namuna'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  export default Projects