import { useCallback, useEffect, useMemo, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  LockKeyhole,
  LogOut,
  Phone,
  RefreshCw,
  Scissors,
  ShieldCheck,
  User,
  X,
} from 'lucide-react'
import { hasSupabaseConfig, supabase } from '../lib/supabaseClient'

const pad = (value) => String(value).padStart(2, '0')

const createTimeSlots = () =>
  Array.from({ length: 17 }, (_, index) => {
    const totalMinutes = 8 * 60 + index * 30
    const hour = Math.floor(totalMinutes / 60)
    const minute = totalMinutes % 60
    const value = `${pad(hour)}:${pad(minute)}`
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12

    return {
      value,
      label: `${displayHour}:${pad(minute)} ${period}`,
    }
  })

const getToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

const formatDateForDb = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

const formatDateLabel = (date) =>
  new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)

const formatReservationDate = (date) =>
  new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))

const toHourMinute = (timeValue) => (typeof timeValue === 'string' ? timeValue.slice(0, 5) : '')

const isSameCalendarDay = (firstDate, secondDate) =>
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate()

const statusStyles = {
  error: 'border-red-200 bg-red-50 text-red-700',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  loading: 'border-gold/30 bg-gold/10 text-charcoal',
}

function StatusMessage({ status }) {
  if (!status.message) return null

  const Icon =
    status.type === 'success'
      ? CheckCircle2
      : status.type === 'loading'
        ? Loader2
        : AlertCircle

  return (
    <div className={`flex items-start gap-3 border px-4 py-3 text-sm font-light ${statusStyles[status.type]}`}>
      <Icon size={16} className={status.type === 'loading' ? 'mt-0.5 animate-spin' : 'mt-0.5'} />
      <p>{status.message}</p>
    </div>
  )
}

export default function Booking() {
  const today = useMemo(() => getToday(), [])
  const timeSlots = useMemo(() => createTimeSlots(), [])
  const procedures = useMemo(
    () => [
      'Limpieza facial profunda',
      'Radiofrecuencia facial',
      'Peeling quimico',
      'Hidratacion premium',
      'Microneedling',
      'Depilacion laser',
      'Evaluacion estetica',
    ],
    [],
  )
  const [selectedDate, setSelectedDate] = useState(today)
  const [selectedTime, setSelectedTime] = useState('')
  const [bookingForm, setBookingForm] = useState({ nombre: '', telefono: '', procedimiento: '' })
  const [bookingStatus, setBookingStatus] = useState({ type: '', message: '' })
  const [adminForm, setAdminForm] = useState({ email: '', password: '' })
  const [adminStatus, setAdminStatus] = useState({ type: '', message: '' })
  const [adminSession, setAdminSession] = useState(null)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false)
  const [reservations, setReservations] = useState([])
  const [reservationsLoading, setReservationsLoading] = useState(false)
  const [bookedTimes, setBookedTimes] = useState([])
  const [slotsLoading, setSlotsLoading] = useState(false)

  const selectedDateForDb = useMemo(() => formatDateForDb(selectedDate), [selectedDate])

  const slotsForSelectedDate = useMemo(() => {
    const now = new Date()

    return timeSlots.map((slot) => {
      const [hours, minutes] = slot.value.split(':').map(Number)
      const slotDate = new Date(selectedDate)
      slotDate.setHours(hours, minutes, 0, 0)

      const isBooked = bookedTimes.includes(slot.value)
      const isPast = isSameCalendarDay(selectedDate, now) && slotDate <= now

      return {
        ...slot,
        disabled: isBooked || isPast,
        stateLabel: isBooked ? 'Ocupada' : isPast ? 'Pasada' : '',
      }
    })
  }, [bookedTimes, selectedDate, timeSlots])

  const loadReservations = useCallback(async () => {
    if (!hasSupabaseConfig) return

    setReservationsLoading(true)
    const { data, error } = await supabase
      .from('reservas')
      .select('id, fecha, hora, nombre, telefono, procedimiento, estado, created_at')
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true })

    if (error) {
      setAdminStatus({
        type: 'error',
        message: 'No se pudieron cargar las reservas. Revisa las politicas RLS de Supabase.',
      })
    } else {
      setReservations(data ?? [])
      setAdminStatus({
        type: 'success',
        message: data?.length ? 'Reservas actualizadas.' : 'Todavia no hay reservas registradas.',
      })
    }

    setReservationsLoading(false)
  }, [])

  useEffect(() => {
    if (!hasSupabaseConfig) return undefined

    supabase.auth.getSession().then(({ data }) => {
      setAdminSession(data.session)
      if (data.session) {
        loadReservations()
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session)
      if (session) {
        loadReservations()
      } else {
        setReservations([])
      }
    })

    return () => authListener.subscription.unsubscribe()
  }, [loadReservations])

  useEffect(() => {
    if (!hasSupabaseConfig) {
      setBookedTimes([])
      setSlotsLoading(false)
      return
    }

    const loadOccupiedSlots = async () => {
      setSlotsLoading(true)

      const { data, error } = await supabase
        .from('reservas')
        .select('hora')
        .eq('fecha', selectedDateForDb)
        .neq('estado', 'cancelada')

      if (!error) {
        const nextBookedTimes = (data ?? []).map((reservation) => toHourMinute(reservation.hora)).filter(Boolean)
        setBookedTimes(nextBookedTimes)
        setSelectedTime((currentTime) => (nextBookedTimes.includes(currentTime) ? '' : currentTime))
      }

      setSlotsLoading(false)
    }

    loadOccupiedSlots()
  }, [selectedDateForDb])

  const handleBookingSubmit = async (event) => {
    event.preventDefault()

    if (!hasSupabaseConfig) {
      setBookingStatus({
        type: 'error',
        message: 'Falta configurar Supabase en el archivo .env para poder guardar reservas.',
      })
      return
    }

    if (
      !selectedTime ||
      !bookingForm.nombre.trim() ||
      !bookingForm.telefono.trim() ||
      !bookingForm.procedimiento.trim()
    ) {
      setBookingStatus({
        type: 'error',
        message: 'Completa hora, nombre, telefono y procedimiento para confirmar la reserva.',
      })
      return
    }

    if (bookedTimes.includes(selectedTime)) {
      setBookingStatus({
        type: 'error',
        message: 'Ese horario ya esta reservado. Por favor elige otro horario disponible.',
      })
      return
    }

    setBookingStatus({ type: 'loading', message: 'Guardando tu reserva...' })

    const { error } = await supabase.from('reservas').insert({
      fecha: selectedDateForDb,
      hora: selectedTime,
      nombre: bookingForm.nombre.trim(),
      telefono: bookingForm.telefono.trim(),
      procedimiento: bookingForm.procedimiento.trim(),
      estado: 'pendiente',
    })

    if (error) {
      setBookingStatus({
        type: 'error',
        message:
          error.code === '23505'
            ? 'Esa hora ya fue reservada. Elige otro horario disponible.'
            : 'No se pudo guardar la reserva. Intenta nuevamente.',
      })
      return
    }

    setBookingStatus({
      type: 'success',
      message: 'Reserva recibida.',
    })
    setBookingForm({ nombre: '', telefono: '', procedimiento: '' })
    setBookedTimes((times) => (times.includes(selectedTime) ? times : [...times, selectedTime]))
    setSelectedTime('')

    if (adminSession) {
      loadReservations()
    }
  }

  const handleAdminLogin = async (event) => {
    event.preventDefault()

    if (!hasSupabaseConfig) {
      setAdminStatus({
        type: 'error',
        message: 'Falta configurar Supabase en el archivo .env.',
      })
      return
    }

    if (!adminForm.email.trim() || !adminForm.password.trim()) {
      setAdminStatus({
        type: 'error',
        message: 'Ingresa el correo y la contrasena del admin.',
      })
      return
    }

    setAdminStatus({ type: 'loading', message: 'Validando acceso admin...' })
    const { error } = await supabase.auth.signInWithPassword({
      email: adminForm.email.trim(),
      password: adminForm.password,
    })

    if (error) {
      setAdminStatus({
        type: 'error',
        message: 'Acceso no autorizado. Verifica las credenciales del admin.',
      })
      return
    }

    setAdminForm({ email: '', password: '' })
    setAdminStatus({ type: 'success', message: 'Sesion admin iniciada.' })
  }

  const handleAdminLogout = async () => {
    await supabase.auth.signOut()
    setAdminStatus({ type: 'success', message: 'Sesion admin cerrada.' })
  }

  const openAdminPanel = useCallback(() => {
    setIsAdminPanelOpen(true)
    setAdminStatus({ type: '', message: '' })
  }, [])

  const closeAdminPanel = useCallback(() => {
    setIsAdminPanelOpen(false)

    if (window.location.hash === '#admin') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    }
  }, [])

  useEffect(() => {
    const openAdminFromHash = () => {
      if (window.location.hash === '#admin') {
        openAdminPanel()
      }
    }

    const openAdminFromEvent = () => {
      openAdminPanel()
    }

    openAdminFromHash()
    window.addEventListener('hashchange', openAdminFromHash)
    window.addEventListener('cye-open-admin', openAdminFromEvent)

    return () => {
      window.removeEventListener('hashchange', openAdminFromHash)
      window.removeEventListener('cye-open-admin', openAdminFromEvent)
    }
  }, [openAdminPanel])

  return (
    <section id="reservas" className="bg-cream py-28 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-body font-light tracking-ultra-wide uppercase text-gold mb-5"
          >
            Reservas online
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-charcoal leading-tight"
          >
            Agenda tu
            <em className="text-gold font-light not-italic"> cita</em>
          </motion.h2>
          <p className="font-body font-light text-sm text-charcoal-light max-w-2xl mx-auto mt-5 leading-relaxed">
            Selecciona fecha, hora disponible, nombre, telefono y procedimiento estetico.
          </p>
        </div>

        {!hasSupabaseConfig && (
          <div className="mb-8 border border-gold/30 bg-gold/10 px-5 py-4 text-sm font-light text-charcoal">
            Conecta Supabase con <span className="font-normal">VITE_SUPABASE_URL</span> y{' '}
            <span className="font-normal">VITE_SUPABASE_ANON_KEY</span> para activar el guardado real.
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="border border-gold-pale bg-white/45 p-5 md:p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-11 h-11 border border-gold/30 flex items-center justify-center text-gold">
                <CalendarDays size={18} strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light">
                  Nuevo agendamiento
                </p>
                <h3 className="font-serif text-2xl font-light text-charcoal">Elige tu fecha</h3>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.85fr] gap-8">
              <div>
                <Calendar
                  value={selectedDate}
                  minDate={today}
                  onChange={(value) => {
                    if (value instanceof Date) {
                      setSelectedDate(value)
                      setBookingStatus({ type: '', message: '' })
                    }
                  }}
                  tileDisabled={({ date, view }) => view === 'month' && date < today}
                  calendarType="gregory"
                  next2Label={null}
                  prev2Label={null}
                  className="cye-calendar"
                />
                <p className="mt-4 text-xs font-light text-charcoal-light">
                  Fecha seleccionada:{' '}
                  <span className="font-normal text-charcoal">{formatDateLabel(selectedDate)}</span>
                </p>
              </div>

              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-[14px] font-serif italic text-gold">
                    <Clock3 size={14} className="text-gold" />
                    Hora
                  </span>
                  <select
                    value={selectedTime}
                    onChange={(event) => setSelectedTime(event.target.value)}
                    className="w-full border border-gold/30 bg-white px-5 py-3.5 font-serif text-[17px] font-medium text-charcoal shadow-[0_4px_10px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-gold focus:ring-1 focus:ring-gold/50 focus:shadow-[0_4px_15px_rgba(197,160,89,0.15)]"
                  >
                    <option value="">Selecciona tu horario de preferencia...</option>
                    {slotsForSelectedDate.map((slot) => (
                      <option key={slot.value} value={slot.value} disabled={slot.disabled}>
                        {slot.stateLabel ? `${slot.label} - ${slot.stateLabel}` : slot.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-[11px] font-light text-charcoal-light">
                    {slotsLoading
                      ? 'Consultando disponibilidad...'
                      : `${slotsForSelectedDate.filter((slot) => !slot.disabled).length} horarios disponibles`}
                  </p>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-[14px] font-serif italic text-gold">
                    <Scissors size={14} className="text-gold" />
                    Procedimiento
                  </span>
                  <select
                    value={bookingForm.procedimiento}
                    onChange={(event) =>
                      setBookingForm((form) => ({ ...form, procedimiento: event.target.value }))
                    }
                    className="w-full border border-gold/30 bg-white px-5 py-3.5 font-serif text-[17px] font-medium text-charcoal shadow-[0_4px_10px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 focus:border-gold focus:ring-1 focus:ring-gold/50 focus:shadow-[0_4px_15px_rgba(197,160,89,0.15)]"
                  >
                    <option value="">Elige el tratamiento deseado...</option>
                    {procedures.map((procedure) => (
                      <option key={procedure} value={procedure}>
                        {procedure}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-[14px] font-serif italic text-gold">
                    <User size={14} className="text-gold" />
                    Nombre
                  </span>
                  <input
                    type="text"
                    value={bookingForm.nombre}
                    onChange={(event) => setBookingForm((form) => ({ ...form, nombre: event.target.value }))}
                    placeholder="Ingresa tu nombre completo"
                    className="w-full border border-gold/30 bg-white px-5 py-3.5 font-serif text-[17px] font-medium text-charcoal shadow-[0_4px_10px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 placeholder:font-serif placeholder:italic placeholder:text-charcoal-light/50 focus:border-gold focus:ring-1 focus:ring-gold/50 focus:shadow-[0_4px_15px_rgba(197,160,89,0.15)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-[14px] font-serif italic text-gold">
                    <Phone size={14} className="text-gold" />
                    Telefono
                  </span>
                  <input
                    type="tel"
                    value={bookingForm.telefono}
                    onChange={(event) => setBookingForm((form) => ({ ...form, telefono: event.target.value }))}
                    placeholder="Número de contacto (+57)"
                    className="w-full border border-gold/30 bg-white px-5 py-3.5 font-serif text-[17px] font-medium text-charcoal shadow-[0_4px_10px_rgba(0,0,0,0.03)] outline-none transition-all duration-300 placeholder:font-serif placeholder:italic placeholder:text-charcoal-light/50 focus:border-gold focus:ring-1 focus:ring-gold/50 focus:shadow-[0_4px_15px_rgba(197,160,89,0.15)]"
                  />
                </label>

                <StatusMessage status={bookingStatus} />

                <button
                  type="submit"
                  disabled={bookingStatus.type === 'loading'}
                  className="w-full bg-gold px-6 py-4 text-[10px] font-body font-light tracking-widest uppercase text-cream transition-all duration-500 hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Confirmar reserva
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {isAdminPanelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <button
              type="button"
              onClick={closeAdminPanel}
              className="absolute inset-0 bg-charcoal/45"
              aria-label="Cerrar panel admin"
            />

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-5xl border border-gold-pale bg-eucalyptus p-5 md:p-8 max-h-[88vh] overflow-auto"
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 border border-gold/30 flex items-center justify-center text-gold">
                    <ShieldCheck size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light">
                      Acceso privado
                    </p>
                    <h3 className="font-serif text-2xl font-light text-charcoal">Panel admin</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {adminSession && (
                    <button
                      type="button"
                      onClick={handleAdminLogout}
                      className="inline-flex h-10 w-10 items-center justify-center border border-gold/30 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
                      aria-label="Cerrar sesion admin"
                    >
                      <LogOut size={15} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeAdminPanel}
                    className="inline-flex h-10 w-10 items-center justify-center border border-gold/30 text-charcoal transition-all duration-300 hover:border-gold hover:text-gold"
                    aria-label="Cerrar"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {!adminSession ? (
                <form onSubmit={handleAdminLogin} className="space-y-5">
                  <div className="flex items-start gap-3 border border-gold/20 bg-cream/60 px-4 py-3 text-xs font-light leading-relaxed text-charcoal-light">
                    <LockKeyhole size={15} className="mt-0.5 flex-shrink-0 text-gold" />
                    <p>Solo usuarios admin creados en Supabase Auth pueden ver las reservas.</p>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-[10px] font-body font-light tracking-widest uppercase text-charcoal-light">
                      Correo admin
                    </span>
                    <input
                      type="email"
                      value={adminForm.email}
                      onChange={(event) => setAdminForm((form) => ({ ...form, email: event.target.value }))}
                      placeholder="admin@cye.com"
                      className="w-full border border-gold-pale bg-cream px-4 py-3 font-body text-sm font-light text-charcoal outline-none transition-colors duration-300 placeholder:text-charcoal-light/60 focus:border-gold"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[10px] font-body font-light tracking-widest uppercase text-charcoal-light">
                      Contrasena
                    </span>
                    <input
                      type="password"
                      value={adminForm.password}
                      onChange={(event) => setAdminForm((form) => ({ ...form, password: event.target.value }))}
                      placeholder="********"
                      className="w-full border border-gold-pale bg-cream px-4 py-3 font-body text-sm font-light text-charcoal outline-none transition-colors duration-300 placeholder:text-charcoal-light/60 focus:border-gold"
                    />
                  </label>

                  <StatusMessage status={adminStatus} />

                  <button
                    type="submit"
                    disabled={adminStatus.type === 'loading'}
                    className="w-full bg-charcoal px-6 py-4 text-[10px] font-body font-light tracking-widest uppercase text-cream transition-all duration-500 hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Entrar al panel
                  </button>
                </form>
              ) : (
                <div className="space-y-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-light text-charcoal-light">
                      Reservas visibles para el admin conectado.
                    </p>
                    <button
                      type="button"
                      onClick={loadReservations}
                      disabled={reservationsLoading}
                      className="inline-flex items-center justify-center gap-2 border border-gold/30 px-4 py-2.5 text-[10px] font-body font-light tracking-widest uppercase text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <RefreshCw size={12} className={reservationsLoading ? 'animate-spin' : ''} />
                      Actualizar
                    </button>
                  </div>

                  <StatusMessage status={adminStatus} />

                  <div className="overflow-x-auto border border-gold/20 bg-cream/65">
                    <table className="min-w-full text-left">
                      <thead>
                        <tr className="border-b border-gold/20 text-[9px] font-body font-light tracking-widest uppercase text-charcoal-light">
                          <th className="px-4 py-3 font-light">Fecha</th>
                          <th className="px-4 py-3 font-light">Hora</th>
                          <th className="px-4 py-3 font-light">Nombre</th>
                          <th className="px-4 py-3 font-light">Telefono</th>
                          <th className="px-4 py-3 font-light">Procedimiento</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/10">
                        {reservations.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-4 py-8 text-center text-sm font-light text-charcoal-light">
                              No hay reservas para mostrar.
                            </td>
                          </tr>
                        ) : (
                          reservations.map((reservation) => (
                            <tr key={reservation.id} className="text-sm font-light text-charcoal">
                              <td className="whitespace-nowrap px-4 py-3">{formatReservationDate(reservation.fecha)}</td>
                              <td className="whitespace-nowrap px-4 py-3">{toHourMinute(reservation.hora)}</td>
                              <td className="px-4 py-3">{reservation.nombre}</td>
                              <td className="whitespace-nowrap px-4 py-3">{reservation.telefono}</td>
                              <td className="px-4 py-3">{reservation.procedimiento}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

