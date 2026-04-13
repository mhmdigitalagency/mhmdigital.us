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

// import AppointmentForm from "@/components/Pages_components/Appointment/appointment-form" 

// export default function AppointmentPage() {
//   return (
//     <main className="min-h-screen bg-slate-50 py-2 xl:py-20">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <AppointmentForm />
//       </div>
//     </main>
//   )
// }

"use client";

import Script from "next/script";

export default function AppointmentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <section className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%] py-10">
        
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Book a appointment
          </h1>
          <p className="mt-5 text-lg leading-8 text-gray-500">
            Schedule your session quickly and easily.
          </p>
        </div>

        {/* BOOKING CARD */}
        <div className="rounded-2xl bg-white shadow-lg border overflow-hidden">
          
          <iframe
            src="https://links.mhmdigital.us/widget/booking/OlGigCQEBTwfs6i7Dva3"
            style={{
              width: "100%",
              border: "none",
              overflow: "hidden",
              minHeight: "850px",
            }}
            scrolling="no"
            id="OlGigCQEBTwfs6i7Dva3"
          />

        </div>
      </section>

      {/* SCRIPT GHL (IMPORTANT POUR RESIZE AUTO) */}
      <Script
        src="https://links.mhmdigital.us/js/form_embed.js"
        strategy="afterInteractive"
      />
    </main>
  );
}