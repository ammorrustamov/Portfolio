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
      desc: "A modern full-stack e-commerce platform featuring product browsing, category filtering, shopping cart, wishlist, responsive design, and a seamless user experience.",
      tags: ['React', 'API', 'Express.js', 'MongoDB', 'CSS', "JavaScript", "HTML"],
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
      name: 'Frontend-Backend ulanishi', // Nomi ham to'g'irlandi
      desc: "Mahsulotlarni ko'rish, kategoriyalar bo'yicha filtrlash, savat, sevimlilar ro'yxati, moslashuvchan dizayn va qulay foydalanuvchi tajribasiga ega zamonaviy to'liq to'plamli elektron tijorat platformasi.",
      tags: ['React', 'API', 'Express.js', 'MongoDB', 'css'],
      github: 'https://github.com/ammorrustamov/Exclusive-0',
      demo: 'https://exclusive-0.vercel.app/',
      image: Ex
    },
    {
      id: 2,
      name: 'Uzum Kloni',
      desc: "Uzum Marketdan ilhomlangan zamonaviy elektron tijorat veb-sayti. Mahsulotlarni ko'rish, kategoriyalar bo'yicha filtrlash, moslashuvchan dizayn va qulay xarid qilish tajribasi.",
      tags: ["Java Script", "Html", "Css"],
      github: 'https://github.com/ammorrustamov/2025uzum',
      demo: 'https://2025uzum.vercel.app/',
      image: uzum 
    },
    {
      id: 3,
      name: 'KUGOO Do‘koni',
      desc: "KUGOO elektr skuterlari uchun zamonaviy elektron tijorat veb-sayti. Moslashuvchan dizayn, mahsulot ro'yxatlari, interaktiv interfeys va qulay xarid qilish tajribasi.",
      tags: ['React', 'Css', "Java Script", "Html"],
      github: 'https://github.com/ammorrustamov/kugo',
      demo: 'https://kugo-tan.vercel.app/',
      image: kugo
    },
    {
      id: 4,
      name: 'Positivus',
      desc: "Foydalanuvchi autentifikatsiyasi va shaxsiy xonalarga ega real-vaqtda xabar almashish ilovasi.",
      tags: ['JavaScript', "html", "css"],
      github: 'https://github.com/ammorrustamov/qiynalib-qildim',
      demo: 'https://qiynalib-qildim.vercel.app/',
      image: Positivus
    },
    {
      id: 5,
      name: 'Exclusive-2',
      desc: "Exclusive - bu Stripe to'lov tizimi, boshqaruv paneli va zamonaviy React frontendiga ega to'liq funksiyali elektron tijorat platformasi.",
      tags: ['React', "Java Script", "Html", "Css"],
      github: 'https://github.com/ammorrustamov/imtixon',
      demo: 'https://imtixon-gamma-six.vercel.app/',
      image: a // BU RASM
    },
    {
      id: 6,
      name: 'Telefon Bozori',
      desc: "Markdown qo'llab-quvvatlashi, izohlar va qidiruv funksiyalariga ega to'liq funksiyali blog.",
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
      github: 'https://github.com/ammorrustamov/projeckt',
      demo: 'https://projeckt-ten.vercel.app/',
      image: phone
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
                        alt={`${project.name} project preview`}
                        loading="lazy"
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