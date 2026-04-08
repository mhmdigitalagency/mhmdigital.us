'use client'

import React, { useEffect, useMemo, useState, useTransition } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import image1 from '@/public/images/MOSS.png'
import {
  CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  Minus,
  Phone,
  Sparkles,
  User,
} from 'lucide-react'

import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { createAppointment } from '@/actions/appointment'
import { getBookedSlots } from '@/actions/get-available-slots'
import { appointmentSchema, AppointmentValues } from '@/schemas/appointment'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const allTimeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00']
const steps = ['Choose date', 'Choose time', 'Your details', 'Confirm']

export default function AppointmentForm() {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState('')
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [serverError, setServerError] = useState('')
  const [serverSuccess, setServerSuccess] = useState('')

  const form = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
      date: '',
      time: '',
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
    reset,
  } = form

  const values = watch()

  const formattedDate = useMemo(() => {
    if (!selectedDate) return ''
    return format(selectedDate, 'yyyy-MM-dd')
  }, [selectedDate])

  const prettyDate = useMemo(() => {
    if (!selectedDate) return ''
    return format(selectedDate, 'PPP')
  }, [selectedDate])

  const availableSlots = useMemo(() => {
    return allTimeSlots.filter((slot) => !bookedSlots.includes(slot))
  }, [bookedSlots])

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formattedDate) {
        setBookedSlots([])
        setSelectedTime('')
        return
      }

      setLoadingSlots(true)
      setSelectedTime('')
      setServerError('')

      const result = await getBookedSlots(formattedDate)

      if (result.success) {
        setBookedSlots(result.bookedSlots)
      } else {
        setBookedSlots([])
        setServerError(result.error || 'Unable to load available slots.')
      }

      setLoadingSlots(false)
    }

    fetchBookedSlots()
  }, [formattedDate])

  const goNextFromDate = () => {
    if (!selectedDate) {
      setServerError('Please select a date.')
      return
    }

    setServerError('')
    setValue('date', formattedDate)
    setStep(2)
  }

  const goNextFromTime = () => {
    if (!selectedTime) {
      setServerError('Please select a time.')
      return
    }

    setServerError('')
    setValue('time', selectedTime)
    setStep(3)
  }

  const goNextFromDetails = async () => {
    const isValid = await trigger(['name', 'email'])
    if (!isValid) return

    setServerError('')
    setStep(4)
  }

  const onSubmit = (data: AppointmentValues) => {
    setServerError('')
    setServerSuccess('')

    startTransition(async () => {
      const result = await createAppointment(data)

      if (result.success) {
        setServerSuccess(result.message || 'Appointment booked successfully.')
        reset()
        setSelectedDate(undefined)
        setSelectedTime('')
        setBookedSlots([])
        setStep(1)
      } else {
        setServerError(result.error || 'Something went wrong.')
      }
    })
  }

  const progress = (step / steps.length) * 100

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.08),transparent_28%),linear-gradient(to_bottom,#fff,#fff,#f8fafc)]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
          <Card className="sticky top-24 h-fit overflow-hidden rounded-3xl border-slate-200/80 bg-white/90 shadow-xl shadow-slate-200/50 backdrop-blur">
            <div className="h-2 w-full bg-slate-100">
              <div
                className="h-full rounded-r-full bg-linear-to-r from-red-500 to-red-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <CardHeader className="pb-4">
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                <Sparkles className="h-3.5 w-3.5" />
                Appointment
              </div>

              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Book your appointment
              </CardTitle>

              <CardDescription className="text-sm leading-7 text-slate-600 md:text-base">
                Pick a date and time, then complete your details in a clean step-by-step flow.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                {steps.map((label, index) => {
                  const current = index + 1
                  const active = step === current
                  const done = step > current

                  return (
                    <div
                      key={label}
                      className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all duration-200 ${
                        active
                          ? 'border-red-200 bg-red-50 shadow-sm'
                          : done
                          ? 'border-emerald-200 bg-emerald-50/80'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                          active
                            ? 'bg-red-600 text-white shadow-md shadow-red-200'
                            : done
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-4 w-4" /> : current}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{label}</p>
                        <p className="text-xs text-slate-500">
                          {done ? 'Completed' : active ? 'Current step' : 'Upcoming'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Appointment summary
                </p>

                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-medium text-slate-500">Date</span>
                    <span className="text-right font-semibold text-slate-900">{prettyDate || 'Not selected'}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-medium text-slate-500">Time</span>
                    <span className="text-right font-semibold text-slate-900">{selectedTime || 'Not selected'}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
                    <span className="font-medium text-slate-500">Name</span>
                    <span className="text-right font-semibold text-slate-900">{values.name || 'Not provided'}</span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="font-medium text-slate-500">Email</span>
                    <span className="text-right font-semibold text-slate-900 break-all">{values.email || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-3xl border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
            <CardContent className="p-5 md:p-8 lg:p-10">
              {serverError ? (
                <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {serverError}
                </div>
              ) : null}

              {serverSuccess ? (
                <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {serverSuccess}
                </div>
              ) : null}

              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Step 1</p>
                      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 pt-10 xl:pt-0">Choose a date</h2>
                      <p className="max-w-2xl text-base leading-7 text-slate-600">
                        Select the day that works best for you. Past dates are automatically disabled.
                      </p>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-linear-to-br from-white to-slate-50 p-4 md:p-6">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        className="mx-auto rounded-2xl"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={goNextFromDate}
                        className="h-12 rounded-xl bg-red-600 px-6 text-sm font-semibold hover:bg-red-700"
                      >
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Step 2</p>
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Choose a time</h2>
                      <p className="text-base leading-7 text-slate-600">
                        Selected date: <span className="font-semibold text-slate-900">{prettyDate}</span>
                      </p>
                    </div>

                    {loadingSlots ? (
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-600">
                        Loading available time slots...
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="rounded-3xl border border-amber-200 bg-amber-50 px-4 py-10 text-center text-sm font-medium text-amber-700">
                        No available time slots for this date. Please choose another day.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                        {availableSlots.map((slot) => {
                          const isSelected = selectedTime === slot

                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`group flex min-h-18 items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-sm font-semibold transition-all duration-200 ${
                                isSelected
                                  ? 'border-red-600 bg-red-600 text-white shadow-lg shadow-red-200'
                                  : 'border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:border-red-200 hover:bg-red-50'
                              }`}
                            >
                              <Clock3 className="h-4 w-4" />
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(1)} className="h-12 rounded-xl px-5">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      <Button
                        type="button"
                        onClick={goNextFromTime}
                        className="h-12 rounded-xl bg-red-600 px-6 text-sm font-semibold hover:bg-red-700"
                        disabled={loadingSlots || availableSlots.length === 0}
                      >
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Step 3</p>
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Your details</h2>
                      <p className="max-w-2xl text-base leading-7 text-slate-600">
                        Complete your information so we can confirm your appointment quickly.
                      </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="md:col-span-1">
                        <label className="mb-2 block text-sm font-semibold text-slate-800">Full name</label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            {...register('name')}
                            type="text"
                            placeholder="Enter your full name"
                            className="h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          />
                        </div>
                        {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
                      </div>

                      <div className="md:col-span-1">
                        <label className="mb-2 block text-sm font-semibold text-slate-800">Email address</label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            {...register('email')}
                            type="email"
                            placeholder="Enter your email"
                            className="h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          />
                        </div>
                        {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
                      </div>

                      <div className="md:col-span-1">
                        <label className="mb-2 block text-sm font-semibold text-slate-800">Phone number</label>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            {...register('phone')}
                            type="text"
                            placeholder="Enter your phone number"
                            className="h-12 w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                          />
                        </div>
                        {errors.phone && <p className="mt-1.5 text-sm text-red-600">{errors.phone.message}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-semibold text-slate-800">Message</label>
                        <textarea
                          {...register('message')}
                          placeholder="Add a short message if needed"
                          rows={5}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        />
                        {errors.message && <p className="mt-1.5 text-sm text-red-600">{errors.message.message}</p>}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(2)} className="h-12 rounded-xl px-5">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      <Button type="button" onClick={goNextFromDetails} className="h-12 rounded-xl bg-red-600 px-6 text-sm font-semibold hover:bg-red-700">
                        Continue
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">Step 4</p>
                      <h2 className="text-3xl font-bold tracking-tight text-slate-900">Confirm appointment</h2>
                      <p className="max-w-2xl text-base leading-7 text-slate-600">
                        Review everything before confirming your appointment.
                      </p>
                    </div>

                    <div className="grid gap-4 rounded-[28px] border border-slate-200 bg-linear-to-br from-slate-50 to-white p-5 text-sm text-slate-700 md:p-6">
                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <CalendarIcon className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-slate-500">Date</span>
                        <span className="ml-auto font-semibold text-slate-900">{prettyDate}</span>
                      </div>

                      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                        <Clock3 className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-slate-500">Time</span>
                        <span className="ml-auto font-semibold text-slate-900">{selectedTime}</span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Full name</p>
                          <p className="mt-1 font-semibold text-slate-900">{values.name}</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Email</p>
                          <p className="mt-1 font-semibold text-slate-900 break-all">{values.email}</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Phone</p>
                          <p className="mt-1 font-semibold text-slate-900">{values.phone || 'Not provided'}</p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 md:col-span-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Message</p>
                          <p className="mt-1 font-semibold text-slate-900">{values.message || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    <input type="hidden" {...register('date')} value={formattedDate} />
                    <input type="hidden" {...register('time')} value={selectedTime} />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(3)} className="h-12 rounded-xl px-5">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      <Button type="submit" disabled={isPending} className="h-12 rounded-xl bg-red-600 px-6 text-sm font-semibold hover:bg-red-700">
                        {isPending ? 'Booking...' : 'Confirm appointment'}
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="pt-16 md:pt-24">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/40">
            <div className="grid items-center gap-8 p-6 md:grid-cols-[1.3fr_0.9fr] md:p-8 lg:p-10">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                  <Minus className="h-4 w-4" />
                  Schedule a demo
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                  Schedule a demo today!
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Schedule a free demo to discover how MHM Digital can support your business growth.
                  Get a personalized presentation of our services and solutions tailored to your needs.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Schedule a demo with</p>

                <div className="flex items-center gap-4 rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
                  <div className="h-20 w-20 overflow-hidden rounded-[22px] border border-slate-200 bg-slate-100">
                    <Image
                      src={image1}
                      alt="Mohamed Soumah"
                      priority
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h5 className="text-lg font-bold text-slate-900">Mohamed Soumah</h5>
                    <p className="text-sm font-medium text-red-500 md:text-base">CEO & Founder of MHM Digital</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
