export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_ID

  if (!measurementId) {
    console.warn('Google Analytics ID topilmadi')
    return
  }

  // Google Analytics script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`

  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []

  function gtag() {
    window.dataLayer.push(arguments)
  }

  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId, {
    anonymize_ip: true,
  })
}