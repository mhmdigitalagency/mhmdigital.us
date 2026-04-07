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

const allTimeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '14:00',
  '15:00',
  '16:00',
]

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

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-600">
              Appointment
            </p>
            <CardTitle className="text-3xl">Book your appointment</CardTitle>
            <CardDescription className="text-base leading-7">
              Choose a date, select a time, then complete your details.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-3">
              {steps.map((label, index) => {
                const current = index + 1
                const active = step === current
                const done = step > current

                return (
                  <div
                    key={label}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition ${
                      active
                        ? 'border-red-500 bg-red-50'
                        : done
                        ? 'border-green-200 bg-green-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                        active
                          ? 'bg-red-600 text-white'
                          : done
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {done ? <CheckCircle2 className="h-4 w-4" /> : current}
                    </div>
                    <span className="font-medium text-slate-800">{label}</span>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">Appointment summary</p>
              <div className="mt-3 space-y-2">
                <p>
                  <span className="font-medium">Date:</span>{' '}
                  {prettyDate || 'Not selected'}
                </p>
                <p>
                  <span className="font-medium">Time:</span>{' '}
                  {selectedTime || 'Not selected'}
                </p>
                <p>
                  <span className="font-medium">Name:</span>{' '}
                  {values.name || 'Not provided'}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{' '}
                  {values.email || 'Not provided'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 md:p-8">
            {serverError ? (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {serverError}
              </div>
            ) : null}

            {serverSuccess ? (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {serverSuccess}
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Choose a date
                    </h2>
                    <p className="mt-2 text-slate-600">
                      Select the day you want for your appointment.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      className="rounded-md"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={goNextFromDate}
                      className="rounded-xl bg-red-600 hover:bg-red-700"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Choose a time
                    </h2>
                    <p className="mt-2 text-slate-600">
                      Selected date:{' '}
                      <span className="font-semibold">{prettyDate}</span>
                    </p>
                  </div>

                  {loadingSlots ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-center text-sm text-slate-600">
                      Loading available time slots...
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-6 text-center text-sm text-amber-700">
                      No available time slots for this date. Please choose
                      another day.
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {availableSlots.map((slot) => {
                        const isSelected = selectedTime === slot

                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-4 text-sm font-medium transition ${
                              isSelected
                                ? 'border-red-600 bg-red-600 text-white'
                                : 'border-slate-200 bg-white text-slate-800 hover:border-red-300 hover:bg-red-50'
                            }`}
                          >
                            <Clock3 className="h-4 w-4" />
                            {slot}
                          </button>
                        )
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="rounded-xl"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                      type="button"
                      onClick={goNextFromTime}
                      className="rounded-xl bg-red-600 hover:bg-red-700"
                      disabled={loadingSlots || availableSlots.length === 0}
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Your details
                    </h2>
                    <p className="mt-2 text-slate-600">
                      Fill in your information to continue.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          {...register('name')}
                          type="text"
                          placeholder="Full name"
                          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-red-500"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="Email address"
                          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-red-500"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          {...register('phone')}
                          type="text"
                          placeholder="Phone number"
                          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-red-500"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <textarea
                        {...register('message')}
                        placeholder="Message"
                        rows={5}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="rounded-xl"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                      type="button"
                      onClick={goNextFromDetails}
                      className="rounded-xl bg-red-600 hover:bg-red-700"
                    >
                      Continue
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Confirm appointment
                    </h2>
                    <p className="mt-2 text-slate-600">
                      Review your information before booking.
                    </p>
                  </div>

                  <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Date:</span>
                      <span>{prettyDate}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-red-600" />
                      <span className="font-medium">Time:</span>
                      <span>{selectedTime}</span>
                    </div>

                    <div>
                      <span className="font-medium">Name:</span> {values.name}
                    </div>

                    <div>
                      <span className="font-medium">Email:</span> {values.email}
                    </div>

                    <div>
                      <span className="font-medium">Phone:</span>{' '}
                      {values.phone || 'Not provided'}
                    </div>

                    <div>
                      <span className="font-medium">Message:</span>{' '}
                      {values.message || 'Not provided'}
                    </div>
                  </div>

                  <input
                    type="hidden"
                    {...register('date')}
                    value={formattedDate}
                  />
                  <input
                    type="hidden"
                    {...register('time')}
                    value={selectedTime}
                  />

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(3)}
                      className="rounded-xl"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="rounded-xl bg-red-600 hover:bg-red-700"
                    >
                      {isPending ? 'Booking...' : 'Confirm appointment'}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="pt-20 flex flex-col items-center justify-center gap-10">
        <div className="w-full md:max-w-3xl text-center mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <Minus className="text-red-500" />
            <h5 className="text-red-500 text-[18px] font-extrabold">
              Schedule a demo
            </h5>
          </div>

          <h2 className="text-[32px] sm:text-[40px] xl:text-[52px] font-bold leading-tight mb-4">
            Schedule a demo today!
          </h2>

          <p className="text-[18px] font-medium text-gray-500 mb-8 max-w-xl">
            Schedule a free demo to discover how MHM Digital can support your
            business growth. In just a few minutes, get a personalized
            presentation of our services and solutions tailored to your needs.
          </p>

          <h3 className="text-xl md:text-2xl font-extrabold leading-snug mb-4">
            Schedule a demo with:
          </h3>

          <div className="mt-3 flex items-center gap-4 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
            <div className="h-20 w-20 overflow-hidden rounded-[20px]">
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
              <h5 className="text-base xl:text-lg font-bold text-gray-900">
                Mohamed Soumah
              </h5>
              <p className="text-base xl:text-lg text-red-500 font-medium">
                CEO & Founder of MHM Digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}