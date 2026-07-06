import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 w-full grow flex flex-col gap-12 text-left">
      {/* Page Title */}
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a]">
          About <span className="text-[#5F6FFF] font-extrabold">Us</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          Learn more about our mission, our values, and how we make healthcare bookings simple.
        </p>
      </div>

      {/* Intro Block: Image & Text Split */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white border border-slate-200/60 rounded-3xl  shadow-sm">
        <div className="w-full md:w-1/3 flex justify-center">
          <Image
            src="/doctor-1.svg"
            alt="About Us Doctors Illustration"
            width={260}
            height={260}
            className="w-64 h-auto object-contain max-h-75"
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-800">
            Welcome to Doctor J
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Doctor J is a state-of-the-art platform designed to simplify the booking of medical appointments. 
            We connect patients directly with trusted, rated, and verified healthcare providers. Our aim is to eliminate 
            the hassle of seeking care by providing digital access to doctor profiles, fees, specialities, and availability slots.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            Whether you are searching for a general physician for a routine check-up, a neurologist for advanced consults, 
            or a pediatrician for your children, Doctor J ensures you find the right match without waiting in queues.
          </p>
          <div className="mt-2 border-l-4 border-[#5F6FFF] pl-4 py-1.5 italic text-slate-655 font-bold text-xs sm:text-sm">
            &quot;Our vision is to make premium healthcare accessible, simple, and immediate for everyone, anywhere.&quot;
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="flex flex-col gap-6">
        <h3 className="text-lg font-bold text-slate-800 text-center md:text-left">
          Why Choose Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md transition duration-350">
            <span className="text-[#5F6FFF] font-extrabold text-lg block mb-2">01. Efficiency</span>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Find qualified doctors matching your specific medical requirements instantly. Book slots instantly 
              without any administrative delays or third-party phone calls.
            </p>
          </div>
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md transition duration-350">
            <span className="text-[#5F6FFF] font-extrabold text-lg block mb-2">02. Convenience</span>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Access the doctor catalog on any device, from home or work. View reviews, ratings, session fees, 
              and experience details directly on our dashboard.
            </p>
          </div>
          <div className="bg-white border border-slate-200/60 rounded-2xl p-6 hover:shadow-md transition duration-350">
            <span className="text-[#5F6FFF] font-extrabold text-lg block mb-2">03. Personalization</span>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Filter search results by category, consultation fees, work experience, and calendar availability 
              to match your budget and personal schedule.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
