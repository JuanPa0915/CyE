import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, Star, ArrowRight } from 'lucide-react'

const treatments = [
  {
    id: '01',
    name: 'Limpieza Facial Profunda',
    tagline: 'Tu piel, renovada',
    duration: '75 min',
    steps: [
      'Diagnóstico cutáneo personalizado',
      'Desmaquillaje y limpieza inicial',
      'Exfoliación enzimática',
      'Extracción y purificación',
      'Mascarilla nutritiva',
      'Hidratación y protección solar',
    ],
    benefit: 'Poros visiblemente reducidos. Piel luminosa desde la primera sesión.',
    side: 'right',
  },
  {
    id: '02',
    name: 'Masaje de Relajación',
    tagline: 'Reconecta cuerpo y mente',
    duration: '60 min',
    steps: [
      'Ritual de bienvenida aromático',
      'Técnicas suecas y de tejido profundo',
      'Trabajo en zonas de tensión',
      'Masaje de cuero cabelludo',
      'Reflexología en pies',
      'Cierre con aceites esenciales',
    ],
    benefit: 'Estrés liberado. Circulación activada. Bienestar total.',
    side: 'left',
  },
]

export default function FeaturedTreatments() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="tratamientos" ref={ref} className="bg-eucalyptus py-28 md:py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold mb-5"
          >
            Tratamientos Estrella
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight"
          >
            Experiencias
            <em className="text-gold font-light not-italic"> únicas</em>
          </motion.h2>
        </div>

        {/* Treatment cards */}
        <div className="space-y-8 md:space-y-6">
          {treatments.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-cream border border-gold-pale flex flex-col ${
                t.side === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
              } overflow-hidden group hover:border-gold/40 transition-all duration-500`}
            >
              {/* Visual panel */}
              <div className="md:w-2/5 relative min-h-[260px] md:min-h-[340px] overflow-hidden bg-gradient-to-br from-gold-pale/60 to-eucalyptus-mid/40 flex items-center justify-center">
                {/* Decorative number */}
                <span className="font-serif text-[10rem] font-light text-gold/10 select-none leading-none">
                  {t.id}
                </span>
                {/* Ornament */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="80" cy="80" r="70" stroke="#C5A059" strokeWidth="0.6" opacity="0.5" />
                    <circle cx="80" cy="80" r="50" stroke="#C5A059" strokeWidth="0.4" opacity="0.3" />
                    {/* Petal ornament */}
                    <path d="M80 40 Q95 60 80 80 Q65 60 80 40Z" fill="#C5A059" opacity="0.2" />
                    <path d="M80 40 Q95 60 80 80 Q65 60 80 40Z" fill="#C5A059" opacity="0.2" transform="rotate(60 80 80)" />
                    <path d="M80 40 Q95 60 80 80 Q65 60 80 40Z" fill="#C5A059" opacity="0.2" transform="rotate(120 80 80)" />
                    <path d="M80 40 Q95 60 80 80 Q65 60 80 40Z" fill="#C5A059" opacity="0.2" transform="rotate(180 80 80)" />
                    <path d="M80 40 Q95 60 80 80 Q65 60 80 40Z" fill="#C5A059" opacity="0.2" transform="rotate(240 80 80)" />
                    <path d="M80 40 Q95 60 80 80 Q65 60 80 40Z" fill="#C5A059" opacity="0.2" transform="rotate(300 80 80)" />
                    <circle cx="80" cy="80" r="4" fill="#C5A059" opacity="0.5" />
                  </svg>
                </div>
                {/* Badge */}
                <div className="absolute top-6 left-6 flex items-center gap-1.5">
                  <Star size={10} className="text-gold fill-gold" />
                  <span className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light">
                    Más solicitado
                  </span>
                </div>
              </div>

              {/* Content panel */}
              <div className="md:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold">
                    {t.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] font-body font-light tracking-widest uppercase text-charcoal-light">
                    <Clock size={10} strokeWidth={1.5} />
                    {t.duration}
                  </div>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl font-light text-charcoal mb-2 leading-tight">
                  {t.name}
                </h3>
                <p className="font-serif text-xl font-light text-gold italic mb-8">{t.tagline}</p>

                {/* Steps */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {t.steps.map((step, j) => (
                    <li key={j} className="flex items-start gap-3 text-[11px] font-body font-light text-charcoal-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/50 mt-1.5 flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>

                {/* Benefit quote */}
                <p className="font-serif text-base italic text-charcoal-light border-l-2 border-gold pl-4 mb-10">
                  "{t.benefit}"
                </p>

                <a
                  href={`https://wa.me/573122176960?text=Hola%2C%20me%20interesa%20el%20tratamiento%20${encodeURIComponent(t.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-3 self-start bg-charcoal text-cream px-7 py-3.5 text-[10px] font-body font-light tracking-widest uppercase hover:bg-gold transition-all duration-500"
                >
                  Reservar este tratamiento
                  <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
