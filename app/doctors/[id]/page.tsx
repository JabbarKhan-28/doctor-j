import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctors } from "../../data/doctor";
import BookingSection from "../../components/BookingSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
  const { id } = await params;
  const doctor = doctors.find((doc) => doc.id === parseInt(id));

  if (!doctor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 w-full grow flex flex-col gap-8 text-left">
      {/* Back Button */}
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-[#5F6FFF] text-xs font-bold transition w-fit"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Browse
      </Link>

      {/* Doctor Card */}
      <section className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 shadow-sm">
        <div className="w-full md:w-56 h-56 bg-slate-50 rounded-2xl overflow-hidden shrink-0 relative border border-slate-100">
          <Image
            src={doctor.image}
            alt={doctor.name}
            fill
            priority
            className="object-cover object-top"
          />
        </div>
        <div className="flex flex-col justify-between grow">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{doctor.name}</h1>
              <span
                className={`w-2 h-2 rounded-full ${
                  doctor.available ? "bg-green-500 animate-pulse" : "bg-slate-350"
                }`}
              />
            </div>
            <p className="text-xs sm:text-sm text-indigo-650 font-bold capitalize">
              {doctor.speciality} &bull; {doctor.experience} Experience
            </p>
            <div className="mt-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Doctor</h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mt-1">
                Dr. {doctor.name.split(". ")[1] || doctor.name} is a highly accomplished specialist dedicated to delivering 
                exceptional patient care. With {doctor.experience} of training, they focus on personalized medical treatment 
                programs designed to foster long-term health outcomes.
              </p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consultation Fee</p>
              <p className="text-lg font-extrabold text-slate-800 mt-0.5">Rs. {doctor.fees}</p>
            </div>
            <div
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                doctor.available
                  ? "bg-green-50 text-green-700 border border-green-150"
                  : "bg-slate-50 text-slate-500 border border-slate-150"
              }`}
            >
              {doctor.available ? "Accepting Patients" : "Fully Booked Today"}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar & Slots */}
      <BookingSection doctor={doctor} />
    </div>
  );
}
