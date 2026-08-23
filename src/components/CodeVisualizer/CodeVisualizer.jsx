// src/components/CodeVisualizer/CodeVisualizer.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CodeVisualizer.module.css'

const kw  = t => ({ t, c: 'keyword' })
const fn  = t => ({ t, c: 'func'    })
const str = t => ({ t, c: 'string'  })
const vr  = t => ({ t, c: 'var'     })
const pl  = t => ({ t, c: 'plain'   })
const cm  = t => ({ t, c: 'comment' })

const SNIPPETS = [
  { lang:'jsx', lines:[ [kw('const '),vr('developer'),pl(' = {')],[pl('  name: '),str('"Ammorxon"'),pl(',')],[pl('  role: '),str('"Full Stack Dev"')],[pl('};')] ]},
  { lang:'jsx', lines:[ [kw('const '),vr('[theme,setTheme]'),pl(' =')],[fn('  useState'),str('("dark")')] ]},
  { lang:'js',  lines:[ [fn('useEffect'),pl('(() => {')],[fn('  fetchProjects'),pl('()')],[pl('}, [])')] ]},
  { lang:'html',lines:[ [kw('<section '),pl('class='),str('"hero"'),kw('>')],[kw('  <h1>'),pl('Developer'),kw('</h1>')],[kw('</section>')] ]},
  { lang:'css', lines:[ [fn('.grid '),pl('{')],[kw('  display'),pl(': '),str('grid'),pl(';')],[kw('  gap'),pl(': '),str('24px'),pl(';')],[pl('}')] ]},
  { lang:'ts',  lines:[ [kw('interface '),fn('Project '),pl('{')],[vr('  id'),pl(': '),kw('number'),pl(';')],[vr('  title'),pl(': '),kw('string'),pl(';')],[pl('}')] ]},
  { lang:'jsx', lines:[ [kw('<Route')],[pl('  path='),str('"/projects"')],[pl('  element='),fn('{<Projects/>}')],[kw('/>')] ]},
  { lang:'json',lines:[ [pl('{')],[kw('  "status"'),pl(': '),str('"success"'),pl(',')],[kw('  "dev"'),pl(': '),fn('true')],[pl('}')] ]},
  { lang:'js',  lines:[ [kw('const '),vr('res'),pl(' = '),kw('await ')],[fn('  fetch'),str('("/api/projects")')],[kw('const '),vr('data'),pl(' = await res.json()')] ]},
  { lang:'js',  lines:[ [pl('app.'),fn('get'),pl('("/api", (req,res) => {')],[pl('  res.'),fn('json'),pl('({ ok: '),fn('true'),pl(' })')],[pl('})')] ]},
  { lang:'jsx', lines:[ [kw('const '),vr('store'),pl(' = configureStore({')],[kw('  reducer'),pl(': {')],[vr('    projects'),pl(': projectsSlice')],[pl('  }')],[pl('})')] ]},
  { lang:'jsx', lines:[ [kw('export default function '),fn('App'),pl('() {')],[pl('  return (')],[kw('    <Router>')],[kw('      <Navbar />')],[kw('    </Router>')],[pl('  )')],[pl('}')] ]},
  { lang:'ts',  lines:[ [kw('type '),fn('ApiResponse'),pl('<T> = {')],[vr('  data'),pl(': T;')],[vr('  status'),pl(': '),kw('number'),pl(';')],[vr('  ok'),pl(': '),kw('boolean'),pl(';')],[pl('}')] ]},
  { lang:'js',  lines:[ [cm('// Git workflow')],[fn('git add'),pl(' .')],[fn('git commit'),pl(' '),str('"-m feat: portfolio"')],[fn('git push'),pl(' origin main')] ]},
  { lang:'css', lines:[ [fn(':root '),pl('{')],[kw('  --gold'),pl(': '),str('#d4af37'),pl(';')],[kw('  --bg'),pl(': '),str('#080808'),pl(';')],[pl('}')] ]},
  { lang:'js',  lines:[ [kw('const '),vr('router'),pl(' = express.Router()')],[pl('router.'),fn('get'),pl('("/", async (req,res) => {')],[kw('  const '),vr('data'),pl(' = await db.'),fn('find'),pl('({})')],[pl('  res.'),fn('json'),pl('(data)')],[pl('})')] ]},
  { lang:'jsx', lines:[ [kw('const '),vr('dispatch'),pl(' = '),fn('useDispatch'),pl('()')],[kw('const '),vr('projects'),pl(' =')],[fn('  useSelector'),pl('(s => s.projects)')] ]},
  { lang:'json',lines:[ [pl('{')],[kw('  "name"'),pl(': '),str('"portfolio"'),pl(',')],[kw('  "version"'),pl(': '),str('"1.0.0"'),pl(',')],[kw('  "private"'),pl(': '),fn('true')],[pl('}')] ]},
  { lang:'jsx', lines:[ [cm('// Custom hook')],[kw('export const '),fn('useTheme'),pl(' = () => {')],[pl('  return '),fn('useContext'),pl('(ThemeCtx)')],[pl('}')] ]},
  { lang:'js',  lines:[ [kw('const '),vr('PORT'),pl(' = process.env.PORT || '),str('3000')],[pl('app.'),fn('listen'),pl('(PORT, () => {')],[pl('  console.'),fn('log'),pl('('),str('`Server on ${PORT}`'),pl(')')],[pl('})')] ]},
]

const VARIANTS = [
  { ini:{opacity:0,x:-80,scale:0.9},         vis:{opacity:1,x:0,scale:1},            out:{opacity:0,y:-60,rotate:-3} },
  { ini:{opacity:0,x:80,scale:0.9},           vis:{opacity:1,x:0,scale:1},            out:{opacity:0,y:60,rotate:2}  },
  { ini:{opacity:0,y:40,scale:0.82},          vis:{opacity:1,y:0,scale:1},            out:{opacity:0,y:-40}          },
  { ini:{opacity:0,x:-55,y:55,rotate:-5},     vis:{opacity:1,x:0,y:0,rotate:0},      out:{opacity:0,x:55,y:-55,rotate:5} },
  { ini:{opacity:0,scale:0.5},                vis:{opacity:1,scale:1},                out:{opacity:0,scale:1.3}      },
  { ini:{opacity:0,x:35,y:-45,rotate:7},      vis:{opacity:1,x:0,y:0,rotate:-1},     out:{opacity:0,x:-35,y:45,rotate:-7} },
  { ini:{opacity:0,x:60,y:30,rotate:-4},      vis:{opacity:1,x:0,y:0,rotate:1},      out:{opacity:0,x:-60,y:-30,rotate:4} },
  { ini:{opacity:0,x:-30,y:-55,scale:0.85},   vis:{opacity:1,x:0,y:0,scale:1},       out:{opacity:0,x:30,y:55} },
]

const POSITIONS = [
  { top:'7%',  left:'3%'  },
  { top:'7%',  left:'48%' },
  { top:'34%', left:'2%'  },
  { top:'34%', left:'46%' },
  { top:'62%', left:'3%'  },
  { top:'62%', left:'46%' },
]

const DURATIONS = [3400,4200,3800,4700,3100,5100]

const FloatingSnippet = ({ snippet, position, animIdx, dur }) => {
  const v = VARIANTS[animIdx % VARIANTS.length]
  return (
    <motion.div
      className={styles.snippet}
      style={{ top: position.top, left: position.left }}
      initial={v.ini}
      animate={v.vis}
      exit={v.out}
      transition={{ duration: dur || 0.5, ease: 'easeInOut' }}
    >
      <span className={styles.langTag}>{snippet.lang}</span>
      <pre className={styles.code}>
        {snippet.lines.map((line, li) => (
          <div key={li} className={styles.codeLine}>
            <span className={styles.lineNum}>{li + 1}</span>
            {line.map((tok, ti) => (
              <span key={ti} className={styles[tok.c]}>{tok.t}</span>
            ))}
          </div>
        ))}
      </pre>
    </motion.div>
  )
}

const RestoreButton = ({ onClick }) => (
  <motion.button
    className={styles.restoreBtn}
    onClick={onClick}
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.85 }}
    transition={{ duration: 0.35 }}
    aria-label="Open developer.jsx editor"
    title="Open developer.jsx"
  >
    <span className={styles.restoreIcon}>{'</>'}</span>
    <span>Open developer.jsx</span>
  </motion.button>
)

const CodeVisualizer = () => {
  const [isClosed,    setIsClosed]    = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isExpanded,  setIsExpanded]  = useState(false)

  const [slots, setSlots] = useState(() =>
    POSITIONS.map((pos, i) => ({
      snippet:  SNIPPETS[i % SNIPPETS.length],
      animIdx:  i,
      key:      i * 100,
      position: pos,
      dur:      0.45 + (i % 3) * 0.12,
    }))
  )

  const usedRef    = useRef(new Set())
  const counterRef = useRef(1000)

  const getNext = useCallback(() => {
    const unused = SNIPPETS.filter((_, i) => !usedRef.current.has(i))
    const pool   = unused.length > 0 ? unused : SNIPPETS
    const pick   = pool[Math.floor(Math.random() * pool.length)]
    const idx    = SNIPPETS.indexOf(pick)
    usedRef.current.add(idx)
    if (usedRef.current.size >= SNIPPETS.length) usedRef.current.clear()
    return SNIPPETS[idx]
  }, [])

  useEffect(() => {
    if (isClosed || isMinimized) return
    const timers = POSITIONS.map((pos, si) =>
      setInterval(() => {
        setSlots(prev => {
          const next = [...prev]
          counterRef.current += 1
          next[si] = {
            snippet:  getNext(),
            animIdx:  Math.floor(Math.random() * VARIANTS.length),
            key:      counterRef.current,
            position: pos,
            dur:      0.4 + Math.random() * 0.35,
          }
          return next
        })
      }, DURATIONS[si % DURATIONS.length])
    )
    return () => timers.forEach(clearInterval)
  }, [isClosed, isMinimized, getNext])

  useEffect(() => {
    document.body.style.overflow = isExpanded ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isExpanded])

  const handleClose    = () => { setIsClosed(true);       setIsMinimized(false); setIsExpanded(false) }
  const handleMinimize = () => { setIsMinimized(v => !v); setIsExpanded(false) }
  const handleExpand   = () => { setIsExpanded(v => !v);  setIsMinimized(false) }
  const handleRestore  = () => setIsClosed(false)

  if (isClosed) {
    return (
      <div className={styles.closedContainer}>
        <AnimatePresence>
          <RestoreButton key="restore" onClick={handleRestore} />
        </AnimatePresence>
      </div>
    )
  }

  const editorCls = [
    styles.editorWindow,
    isMinimized ? styles.minimized : '',
    isExpanded  ? styles.expanded  : '',
  ].filter(Boolean).join(' ')

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="backdrop"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleExpand}
          />
        )}
      </AnimatePresence>

      <motion.div className={editorCls} layout transition={{ duration: 0.45, ease: 'easeInOut' }}>
        <div className={styles.titleBar}>
          <div className={styles.dots}>
            <button className={styles.dotRed}   onClick={handleClose}    aria-label="Close editor"    title="Close editor"    />
            <button className={styles.dotAmber} onClick={handleMinimize} aria-label="Minimize editor" title="Minimize editor" />
            <button className={styles.dotGreen} onClick={handleExpand}   aria-label="Expand editor"   title="Expand editor"   />
          </div>
          <span className={styles.fileName}>
            developer.jsx
            {isMinimized && <span className={styles.stateLabel}> — minimized</span>}
            {isExpanded  && <span className={styles.stateLabel}> — expanded</span>}
          </span>
          <span className={styles.langLabel}>JSX</span>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              key="codeArea"
              className={styles.codeArea}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              style={{ transformOrigin: 'top' }}
              transition={{ duration: 0.38, ease: 'easeInOut' }}
            >
              <AnimatePresence mode="popLayout">
                {slots.map(slot => (
                  <FloatingSnippet
                    key={slot.key}
                    snippet={slot.snippet}
                    position={slot.position}
                    animIdx={slot.animIdx}
                    dur={slot.dur}
                  />
                ))}
              </AnimatePresence>
              <div className={styles.glowBlob} style={{ top: '15%', left: '58%' }} />
              <div className={styles.glowBlob} style={{ bottom: '10%', left: '6%', opacity: 0.35 }} />
            </motion.div>
          )}
        </AnimatePresence>

        {!isMinimized && (
          <div className={styles.statusBar}>
            <span className={styles.cursor} />
            <span className={styles.statusText}>Ammorxon Portfolio — Ready</span>
          </div>
        )}
      </motion.div>
    </>
  )
}

export default CodeVisualizer