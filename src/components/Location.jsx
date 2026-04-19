import { motion } from 'framer-motion'
import { MapPin, Phone, Clock } from 'lucide-react'
import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react'

export default function Location() {
  return (
    <section id="ubicacion" className="py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold mb-5"
          >
            Encuéntranos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl font-light text-charcoal"
          >
            Tu santuario en
            <em className="text-gold font-light not-italic"> Laureles</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Simulated Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-gold-pale min-h-[400px] lg:min-h-[500px] bg-eucalyptus"
          >
            {/* Grid lines like a map */}
            <svg
              viewBox="0 0 600 500"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background */}
              <rect width="600" height="500" fill="#E8F0EC" />

              {/* Block fills */}
              <rect x="40" y="30" width="120" height="80" fill="#C2D6CB" opacity="0.5" rx="2" />
              <rect x="200" y="30" width="160" height="80" fill="#C2D6CB" opacity="0.4" rx="2" />
              <rect x="400" y="30" width="160" height="80" fill="#C2D6CB" opacity="0.3" rx="2" />
              <rect x="40" y="160" width="80" height="140" fill="#C2D6CB" opacity="0.4" rx="2" />
              <rect x="160" y="160" width="200" height="60" fill="#D4B878" opacity="0.2" rx="2" />
              <rect x="160" y="240" width="200" height="60" fill="#C2D6CB" opacity="0.4" rx="2" />
              <rect x="400" y="160" width="160" height="140" fill="#C2D6CB" opacity="0.3" rx="2" />
              <rect x="40" y="360" width="520" height="100" fill="#C2D6CB" opacity="0.3" rx="2" />
              <rect x="160" y="340" width="200" height="30" fill="#D4B878" opacity="0.15" rx="2" />

              {/* Streets - horizontal */}
              <rect x="0" y="120" width="600" height="32" fill="#FDFBF7" opacity="0.9" />
              <rect x="0" y="310" width="600" height="28" fill="#FDFBF7" opacity="0.9" />

              {/* Streets - vertical */}
              <rect x="130" y="0" width="22" height="500" fill="#FDFBF7" opacity="0.9" />
              <rect x="370" y="0" width="22" height="500" fill="#FDFBF7" opacity="0.9" />

              {/* Street labels */}
              <text x="300" y="140" textAnchor="middle" fill="#5A5855" fontSize="9" fontFamily="Jost, sans-serif" fontWeight="300" letterSpacing="3">
                CARRERA 80
              </text>
              <text x="300" y="328" textAnchor="middle" fill="#5A5855" fontSize="9" fontFamily="Jost, sans-serif" fontWeight="300" letterSpacing="3">
                CALLE 35
              </text>
              <text x="141" y="250" textAnchor="middle" fill="#5A5855" fontSize="8" fontFamily="Jost, sans-serif" fontWeight="300" letterSpacing="2" transform="rotate(-90 141 250)">
                CRA 80
              </text>

              {/* Green areas */}
              <circle cx="490" cy="230" r="40" fill="#5E8A74" opacity="0.15" />
              <circle cx="490" cy="230" r="30" fill="#5E8A74" opacity="0.1" />
              <text x="490" y="235" textAnchor="middle" fill="#5E8A74" fontSize="7" fontFamily="Jost, sans-serif" fontWeight="300" opacity="0.8">PARQUE</text>

              {/* Location pin — CyE */}
              <circle cx="260" cy="230" r="22" fill="#C5A059" opacity="0.15" />
              <circle cx="260" cy="230" r="16" fill="#C5A059" opacity="0.25" />
              <circle cx="260" cy="230" r="9" fill="#C5A059" />
              <circle cx="260" cy="230" r="4" fill="#FDFBF7" />
              {/* Pin tail */}
              <path d="M260 239 L265 252 L260 249 L255 252 Z" fill="#C5A059" />

              {/* Label */}
              <rect x="272" y="218" width="80" height="24" rx="2" fill="#FDFBF7" opacity="0.95" />
              <text x="312" y="233" textAnchor="middle" fill="#2C2C2A" fontSize="8" fontFamily="Jost, sans-serif" fontWeight="400" letterSpacing="1">
                CyE Spa
              </text>

              {/* Address label */}
              <rect x="180" y="255" width="160" height="18" rx="2" fill="#C5A059" opacity="0.15" />
              <text x="260" y="267" textAnchor="middle" fill="#8B6B35" fontSize="7.5" fontFamily="Jost, sans-serif" fontWeight="300" letterSpacing="1.5">
                Cra. 80 #35-09 P2 Local 203
              </text>
            </svg>

            {/* Map overlay label */}
            <div className="absolute bottom-5 right-5 bg-cream/90 px-4 py-3 border border-gold/20">
              <p className="text-[8px] font-body font-light tracking-widest uppercase text-charcoal-light">
                Laureles · Medellín
              </p>
            </div>

            {/* Click to open Google Maps */}
            <a
              href="https://maps.google.com/?q=Cra.+80+%2335-09+Piso+2+local+203+Laureles+Estadio+Medell%C3%ADn"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-charcoal/0 hover:bg-charcoal/5 transition-all duration-300 group/map"
            >
              <span className="opacity-0 group-hover/map:opacity-100 transition-opacity duration-300 bg-cream/95 px-4 py-2 text-[9px] font-body font-light tracking-widest uppercase text-charcoal flex items-center gap-2">
                <MapPin size={10} className="text-gold" />
                Ver en Google Maps
              </span>
            </a>
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-8"
          >
            {/* Info blocks */}
            {[
              {
                icon: MapPin,
                label: 'Dirección',
                content: 'Cra. 80 #35-09 Piso 2 Local 203, Laureles',
                sub: 'Medellín, Antioquia',
              },
              {
                icon: Phone,
                label: 'Teléfono / WhatsApp',
                content: '+57 312 217 6960',
                sub: 'Atención lunes a sábado',
                href: 'https://wa.me/573122176960',
              },
              {
                icon: Clock,
                label: 'Horarios',
                content: 'Lun – Jue: 8:00am – 8:00pm · Sáb: 8:30am – 2:00pm',
                sub: 'Vie y Dom: Cerrado',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex gap-5 group">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body font-light text-base text-charcoal hover:text-gold transition-colors duration-300"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="font-body font-light text-base text-charcoal">{item.content}</p>
                    )}
                    <p className="font-body font-light text-sm text-charcoal-light mt-0.5">{item.sub}</p>
                  </div>
                </div>
              )
            })}

            {/* Divider */}
            <div className="h-px bg-gold-pale" />

            {/* Social links */}
            <div>
              <p className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light mb-5">
                Síguenos
              </p>
              <div className="flex gap-4">
                {[
                  { icon: InstagramLogo, label: 'Instagram', href: 'https://www.instagram.com/cyecentrodeestetica/' },
                  { icon: FacebookLogo, label: 'Facebook', href: 'https://www.facebook.com/share/17Wz6PCyCE/?mibextid=wwXIfr' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-gold/30 px-4 py-2.5 text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-300"
                  >
                    <Icon size={12} strokeWidth={1.5} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
