import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Tratamientos', href: '#tratamientos' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-[0_1px_20px_rgba(197,160,89,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none group">
            <span className="font-serif text-2xl font-light tracking-widest text-charcoal group-hover:text-gold transition-colors duration-300">
              CyE
            </span>
            <span className="text-[9px] font-body font-light tracking-ultra-wide text-charcoal-light uppercase mt-0.5">
              Centro de Estética · Spa
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[11px] font-body font-light tracking-widest uppercase text-charcoal-light hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/573122176960"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-6 py-2.5 border border-gold text-[10px] font-body font-light tracking-widest uppercase text-gold hover:bg-gold hover:text-cream transition-all duration-300"
            >
              Agendar
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-charcoal hover:text-gold transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-0 right-0 z-40 bg-cream/98 backdrop-blur-md border-t border-gold-pale"
          >
            <div className="flex flex-col items-center gap-8 py-12">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-[11px] font-body font-light tracking-widest uppercase text-charcoal-light hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/573122176960"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 border border-gold text-[10px] font-body font-light tracking-widest uppercase text-gold hover:bg-gold hover:text-cream transition-all duration-300"
              >
                Agendar Cita
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
