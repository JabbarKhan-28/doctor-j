import React from "react";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full grow flex flex-col gap-12 text-left">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Contact <span className="text-[#5F6FFF] font-extrabold">Us</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          Have any questions? We would love to hear from you. Get in touch with our team today.
        </p>
      </div>

      {/* Main Grid Layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Address Details */}
        <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-4">Our Office</h2>
            <div className="flex flex-col gap-4 text-xs sm:text-sm text-slate-500">
              <p className="leading-relaxed">
                <strong className="text-slate-700 font-bold block mb-1">Address:</strong>
                B17, Islamabad, Pakistan
              </p>
              <p>
                <strong className="text-slate-700 font-bold">Tel:</strong> +92 300 8514046
              </p>
              <p>
                <strong className="text-slate-700 font-bold">Email:</strong> jabbarkhan@gmail.com
              </p>
            </div>
          </div>

         
        </div>

        {/* Right Side: Message Form or Success State */}
        <ContactForm />
      </section>
    </div>
  );
}
