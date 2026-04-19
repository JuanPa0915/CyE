import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Popup tooltip */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-cream border border-gold-pale shadow-lg p-5 max-w-[240px] rounded-sm"
          >
            <p className="font-serif text-lg font-light text-charcoal mb-1">Hola, ¿en qué te ayudo?</p>
            <p className="text-[11px] font-body font-light text-charcoal-light mb-4">
              Estamos disponibles para resolver tus dudas.
            </p>
            <a
              href="https://wa.me/573122176960?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-[10px] font-body font-light tracking-widest uppercase py-2.5 px-5 hover:bg-[#1DB954] transition-colors duration-300"
            >
              <MessageCircle size={12} />
              Iniciar chat
            </a>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-5 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-cream border-r border-b border-gold-pale rotate-45 translate-x-0.5 -translate-y-1.5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] hover:scale-105 transition-all duration-300 rounded-full relative"
        aria-label="Abrir WhatsApp"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-20" />
        )}
      </motion.button>
    </div>
  )
}
