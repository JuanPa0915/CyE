import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { InstagramLogo, FacebookLogo } from '@phosphor-icons/react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-charcoal text-cream/70 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center border-b border-white/10 pb-20 mb-16"
        >
          <p className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold mb-6">
            Comienza tu transformación
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-cream leading-tight mb-10">
            Agenda tu valoración
            <br />
            en <em className="text-gold font-light not-italic">CyE Centro de Estética</em>
          </h2>
          <a
            href="https://wa.me/573122176960?text=Hola%2C%20quiero%20agendar%20valoraci%C3%B3n"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gold text-cream px-10 py-4 text-[10px] font-body font-light tracking-widest uppercase hover:bg-cream hover:text-charcoal transition-all duration-500"
          >
            Agendar valoración
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </a>
        </motion.div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="font-serif text-3xl font-light text-cream tracking-widest">CyE</span>
              <p className="text-[9px] font-body font-light tracking-ultra-wide uppercase text-gold mt-1">
                Centro de Estética · Spa
              </p>
            </div>
            <p className="font-body font-light text-sm text-cream/50 leading-relaxed max-w-xs">
              Un santuario de belleza y bienestar en el corazón de Laureles, Medellín.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-[9px] font-body font-light tracking-widest uppercase text-gold mb-6">
              Navegación
            </p>
            <ul className="space-y-3">
              {['Servicios', 'Tratamientos', 'Ubicación', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[11px] font-body font-light tracking-wide text-cream/50 hover:text-gold transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] font-body font-light tracking-widest uppercase text-gold mb-6">
              Contacto
            </p>
            <div className="space-y-3 text-[11px] font-body font-light text-cream/50">
              <p>Cra. 80 #35-09 Piso 2 Local 203, Laureles</p>
              <p>Medellín, Antioquia</p>
              <a
                href="https://wa.me/573122176960"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-gold transition-colors duration-300"
              >
                +57 312 217 6960
              </a>
            </div>
            <div className="flex gap-3 mt-6">
              {[
                { icon: InstagramLogo, href: 'https://www.instagram.com/cyecentrodeestetica/', label: 'Instagram' },
                { icon: FacebookLogo, href: 'https://www.facebook.com/share/17Wz6PCyCE/?mibextid=wwXIfr', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-cream/40 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-[9px] font-body font-light tracking-wide text-cream/30">
            © {year} CyE Centro de Estética · Spa. Todos los derechos reservados.
          </p>
          <p className="text-[9px] font-body font-light tracking-wide text-cream/20">
            Laureles · Medellín · Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
