import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './Background3D.module.css'

const Background3D = () => {
  const containerRef = useRef(null)

  const orbVariants = {
    animate: (i) => ({
      y: [0, -50, 0],
      x: [0, Math.sin(i) * 30, 0],
      transition: {
        duration: 12 + i * 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    })
  }

  return (
    <div className={styles.backgroundContainer} ref={containerRef}>
      {/* Premium gradient background */}
      <div className={styles.gradientBg}></div>

      {/* Elegant floating orbs */}
      <motion.div
        className={styles.orbGlow}
        style={{
          left: '5%',
          top: '10%',
          width: '400px',
          height: '400px'
        }}
        custom={0}
        animate="animate"
        variants={orbVariants}
      ></motion.div>

      <motion.div
        className={styles.orbGlow + ' ' + styles.orbGlowAlt}
        style={{
          right: '8%',
          top: '50%',
          width: '350px',
          height: '350px'
        }}
        custom={1}
        animate="animate"
        variants={orbVariants}
      ></motion.div>

      <motion.div
        className={styles.orbGlow}
        style={{
          left: '12%',
          bottom: '5%',
          width: '300px',
          height: '300px'
        }}
        custom={2}
        animate="animate"
        variants={orbVariants}
      ></motion.div>

      {/* Subtle animated elements */}
      <div className={styles.shimmerEffect}></div>
      <div className={styles.ambientLight}></div>
    </div>
  )
}

export default Background3D
