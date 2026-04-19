import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Waves, Leaf } from 'lucide-react'

const services = [
  {
    icon: Sparkles,
    category: 'Faciales',
    description: 'Rituales personalizados que limpian, nutren e iluminan tu piel. Desde hidratación profunda hasta tratamientos anti-edad con tecnología avanzada.',
    treatments: ['Limpieza facial profunda', 'Hidratación intensiva', 'Tratamiento anti-edad', 'Microdermoabrasión'],
    accent: '#C5A059',
    bg: '#F0E6CC',
  },
  {
    icon: Waves,
    category: 'Corporales',
    description: 'Tratamientos integrales que moldean, tonifican y revitalizan tu cuerpo, combinando técnicas tradicionales con innovación estética.',
    treatments: ['Reducción de medidas', 'Drenaje linfático', 'Envolturas corporales', 'Cavitación'],
    accent: '#5E8A74',
    bg: '#E8F0EC',
  },
  {
    icon: Leaf,
    category: 'Spa & Relajación',
    description: 'Un espacio de calma absoluta. Masajes terapéuticos y rituales de bienestar diseñados para reconectar cuerpo, mente y espíritu.',
    treatments: ['Masaje de relajación', 'Aromaterapia', 'Piedras calientes', 'Ritual de aceites'],
    accent: '#C5A059',
    bg: '#FDFBF7',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="servicios" className="py-28 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold mb-5"
        >
          Nuestros Servicios
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight mb-6"
        >
          El arte de
          <em className="text-gold font-light not-italic"> cuidarte</em>
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="origin-center w-12 h-px bg-gold mx-auto"
        />
      </div>

      {/* Cards grid */}
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      >
        {services.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.category}
              variants={cardVariants}
              className="group relative flex flex-col border border-gold-pale hover:border-gold/50 transition-all duration-500 overflow-hidden"
              style={{ backgroundColor: service.bg }}
            >
              {/* Top accent line */}
              <div
                className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{ backgroundColor: service.accent }}
              />

              <div className="p-8 md:p-10 flex flex-col flex-1">
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-8 border"
                  style={{ borderColor: service.accent + '40' }}
                >
                  <Icon size={20} style={{ color: service.accent }} strokeWidth={1.5} />
                </div>

                {/* Category number */}
                <span
                  className="text-[10px] font-body font-light tracking-ultra-wide uppercase mb-3"
                  style={{ color: service.accent }}
                >
                  0{i + 1}
                </span>

                <h3 className="font-serif text-3xl font-light text-charcoal mb-4 leading-tight">
                  {service.category}
                </h3>

                <p className="font-body font-light text-sm text-charcoal-light leading-relaxed mb-8 flex-1">
                  {service.description}
                </p>

                {/* Treatment list */}
                <ul className="space-y-2 mb-8">
                  {service.treatments.map((t) => (
                    <li key={t} className="flex items-center gap-3 text-[11px] font-body font-light tracking-wide text-charcoal-light">
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ backgroundColor: service.accent }}
                      />
                      {t}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`https://wa.me/573122176960?text=${encodeURIComponent(`Hola, quiero agendar valoración para ${service.category}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-body font-light tracking-widest uppercase group/link"
                  style={{ color: service.accent }}
                >
                  <span className="border-b border-current pb-0.5 group-hover/link:pb-1 transition-all duration-300">
                    Conocer más
                  </span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
