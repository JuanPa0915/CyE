import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left panel — text content */}
      <div className="relative z-10 flex flex-col justify-center px-8 md:px-20 lg:px-28 pt-32 pb-20 md:py-0 md:w-[52%] bg-cream">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="origin-left w-16 h-px bg-gold mb-10"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold mb-8"
        >
          Laureles · Medellín
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-charcoal mb-6"
        >
          Realza tu
          <br />
          <em className="text-gold font-light not-italic">esencia</em>,<br />
          cuida tu
          <br />
          bienestar.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-body font-light text-base text-charcoal-light leading-relaxed max-w-sm mb-12"
        >
          Un santuario de belleza y bienestar donde cada tratamiento está diseñado para revelar tu mejor versión.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#reservas"
            className="group inline-flex items-center gap-3 bg-gold text-cream px-8 py-4 text-[10px] font-body font-light tracking-widest uppercase hover:bg-charcoal transition-all duration-500"
          >
            Agendar Valoración
            <ArrowDownRight
              size={14}
              className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"
            />
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2 text-[10px] font-body font-light tracking-widest uppercase text-charcoal-light hover:text-gold transition-colors duration-300 px-2 py-4"
          >
            Ver servicios
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex gap-10 mt-16 pt-10 border-t border-gold-pale"
        >
          {[
            { num: '10+', label: 'Años de experiencia' },
            { num: '2K+', label: 'Clientes satisfechas' },
            { num: '20+', label: 'Tratamientos' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-serif text-3xl font-light text-gold">{stat.num}</span>
              <span className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right panel — image */}
      <div className="md:w-[48%] relative h-[50vh] md:h-auto overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Gradient overlay replaces actual image for demo */}
          <div className="absolute inset-0 bg-gradient-to-br from-eucalyptus via-eucalyptus-mid/60 to-gold-pale/40" />
          {/* Decorative spa illustration */}
          <svg
            viewBox="0 0 600 900"
            className="absolute inset-0 w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="600" height="900" fill="#E8F0EC" />
            {/* Abstract botanical shapes */}
            <ellipse cx="320" cy="480" rx="160" ry="260" fill="#C2D6CB" opacity="0.5" />
            <ellipse cx="180" cy="300" rx="100" ry="180" fill="#C5A059" opacity="0.12" />
            <circle cx="500" cy="150" r="120" fill="#D4B878" opacity="0.1" />
            <circle cx="80" cy="700" r="140" fill="#5E8A74" opacity="0.1" />
            {/* Leaf shapes */}
            <path d="M300 200 Q420 300 340 500 Q220 400 300 200Z" fill="#5E8A74" opacity="0.2" />
            <path d="M350 250 Q460 180 480 380 Q360 380 350 250Z" fill="#C5A059" opacity="0.15" />
            <path d="M150 450 Q80 560 180 650 Q260 540 150 450Z" fill="#5E8A74" opacity="0.15" />
            {/* Thin elegant lines */}
            <line x1="0" y1="900" x2="600" y2="0" stroke="#C5A059" strokeWidth="0.5" opacity="0.3" />
            <line x1="600" y1="900" x2="0" y2="300" stroke="#C5A059" strokeWidth="0.5" opacity="0.2" />
            {/* Center circle ornament */}
            <circle cx="300" cy="450" r="80" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.4" />
            <circle cx="300" cy="450" r="55" fill="none" stroke="#C5A059" strokeWidth="0.4" opacity="0.3" />
            <circle cx="300" cy="450" r="6" fill="#C5A059" opacity="0.5" />
            {/* Lotus-like petals */}
            <path d="M300 395 Q320 420 300 450 Q280 420 300 395Z" fill="#C5A059" opacity="0.3" />
            <path d="M345 422 Q325 445 300 450 Q315 425 345 422Z" fill="#C5A059" opacity="0.3" />
            <path d="M345 478 Q320 460 300 450 Q325 455 345 478Z" fill="#C5A059" opacity="0.3" />
            <path d="M300 505 Q280 480 300 450 Q320 478 300 505Z" fill="#C5A059" opacity="0.3" />
            <path d="M255 478 Q280 460 300 450 Q278 460 255 478Z" fill="#C5A059" opacity="0.3" />
            <path d="M255 422 Q275 445 300 450 Q282 427 255 422Z" fill="#C5A059" opacity="0.3" />
          </svg>
        </motion.div>

        {/* Overlay label */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-8 bg-cream/90 backdrop-blur-sm px-5 py-4 border-l-2 border-gold"
        >
          <p className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light mb-1">Tratamiento destacado</p>
          <p className="font-serif text-lg font-light text-charcoal">Limpieza Facial Profunda</p>
        </motion.div>
      </div>
    </section>
  )
}
