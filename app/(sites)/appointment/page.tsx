// import Form from '@/components/Pages_components/Appointment/Form'
// import React from 'react'

// function page() {
//   return (
//     <div>
//       <Form />
//     </div>
//   )
// }

// export default page

import AppointmentForm from "@/components/Pages_components/Appointment/appointment-form" 

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-2 xl:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AppointmentForm />
      </div>
    </main>
  )
}