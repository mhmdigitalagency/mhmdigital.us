import { Minus } from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants/services-data";

export default function HomeProcess() {
  return (
    <section className="py-20 bg-white" aria-labelledby="process-heading">
      <div className="px-4 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <div className="mb-12 text-center">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Minus className="text-red-500" aria-hidden />
            <p className="text-red-500 font-bold uppercase tracking-wider text-sm">How It Works</p>
          </div>
          <h2 id="process-heading" className="text-3xl md:text-4xl font-bold">
            A simple process from idea to delivery
          </h2>
        </div>

        <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.step}
              className="relative rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500 text-white font-bold text-lg mb-4">
                {step.step}
              </span>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
