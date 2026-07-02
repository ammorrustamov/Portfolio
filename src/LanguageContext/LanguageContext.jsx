// src/context/LanguageContext.jsx
import React, { createContext, useState, useContext } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en') // 'en' or 'uz'

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'uz' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}