'use server'

import { prisma } from '@/lib/prisma'

export async function getBookedSlots(date: string) {
  try {
    if (!date) {
      return {
        success: false,
        error: 'Date is required.',
        bookedSlots: [],
      }
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        date,
      },
      select: {
        time: true,
      },
      orderBy: {
        time: 'asc',
      },
    })

    return {
      success: true,
      bookedSlots: appointments.map((item) => item.time),
    }
  } catch (error) {
    console.error('Error fetching booked slots:', error)

    return {
      success: false,
      error: 'Unable to fetch booked slots.',
      bookedSlots: [],
    }
  }
}