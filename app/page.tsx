import Image from "next/image";
import Link from "next/link";
import { categories } from "./data/category";
import { doctors } from "./data/doctor";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 w-full">
      {/* Banner */}
      <section className="bg-[#5F6FFF] rounded-2xl flex flex-col md:flex-row items-center justify-between text-white shadow-lg shadow-indigo-100">
        <div className="flex flex-col items-start text-left gap-3 px-6 py-3 sm:px-12 sm:py-6">
          <p className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
            Trusted Medical Partners
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            Book Appointment <br />
            With Trusted Doctors
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md leading-relaxed">
            Browse through our list of doctors and book your appointment easily.
          </p>
          <Link
            href="/doctors"
            className="mt-2 bg-white text-[#5F6FFF] px-6 py-3 rounded-full text-sm font-semibold hover:bg-slate-55 transition active:scale-95 shadow-md shadow-indigo-950/10 cursor-pointer block"
          >
            Book Appointment
          </Link>
        </div>
        <div className="mt-6 md:mt-0 flex justify-center">
          <Image
            src="/home-doc.svg"
            alt="Doctors Banner Illustration"
            width={800}
            height={850}
            priority
            className="w-auto h-auto object-contain"
          />
        </div>
      </section>

      {/* Speciality Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Find by Speciality</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
            Simply browse through our extensive list of trusted doctors, filtered by speciality.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/doctors?speciality=${encodeURIComponent(item.name)}`}
              className="flex flex-col items-center gap-2.5 cursor-pointer hover:-translate-y-1.5 transition duration-300 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-indigo-50/50 flex items-center justify-center border border-slate-100 transition-all duration-300 group-hover:bg-[#5F6FFF] group-hover:border-[#5F6FFF] group-hover:shadow-lg group-hover:shadow-indigo-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="object-contain transition-transform duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert"
                />
              </div>
              <span className="text-xs font-semibold text-slate-600 group-hover:text-[#5F6FFF] transition capitalize">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-10 border-t border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Top Doctors</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
            Browse through our highly rated healthcare experts.
          </p>
        </div>

        {/* Small & Beginner Level Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {doctors.slice(0, 10).map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white border border-slate-200/60 rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-50/20 hover:border-[#5F6FFF]/35 transition duration-300 group"
            >
              <div>
                {/* Doctor Image */}
                <div className="w-full h-40 bg-slate-50 rounded-xl overflow-hidden mb-3.5 relative">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      doctor.available ? "bg-green-500 animate-pulse" : "bg-slate-300"
                    }`}
                  />
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      doctor.available ? "text-green-600" : "text-slate-400"
                    }`}
                  >
                    {doctor.available ? "Available" : "Busy"}
                  </span>
                </div>

                {/* Doctor Name & Speciality */}
                <h3 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-[#5F6FFF] transition duration-200">
                  {doctor.name}
                </h3>
                <p className="text-xs text-indigo-600 mt-1 font-semibold capitalize">
                  {doctor.speciality}
                </p>
                <p className="text-slate-400 text-[11px] mt-0.5 font-medium">
                  {doctor.experience} Experience
                </p>
              </div>

              {/* Fees and Booking Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                <div className="text-[11px] font-bold text-slate-700">
                  Fee: <span className="text-xs text-slate-850 font-extrabold">Rs.{doctor.fees}</span>
                </div>
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="w-full bg-[#5F6FFF] text-white text-[11px] font-bold py-2 rounded-lg hover:bg-[#4b5bef] transition active:scale-98 cursor-pointer text-center block"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {doctors.length > 10 && (
          <div className="flex justify-center mt-10">
            <Link
              href="/doctors"
              className="bg-indigo-50/50 text-[#5F6FFF] border border-indigo-100 hover:bg-[#5F6FFF] hover:text-white hover:border-[#5F6FFF] px-8 py-3 rounded-full text-xs font-bold transition shadow-sm active:scale-95 cursor-pointer block text-center"
            >
              More Doctors
            </Link>
          </div>
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-[#5F6FFF] rounded-2xl flex flex-col md:flex-row items-center justify-between text-white px-8 sm:px-16 pt-10 md:pt-14 relative overflow-hidden mt-14 shadow-lg shadow-indigo-100">
        <div className="md:w-1/2 flex flex-col items-start gap-4 pb-10 md:pb-14 z-10 text-left">
          <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
            Book Appointment <br />
            With 100+ Trusted Doctors
          </h2>
          <Link
            href="/doctors"
            className="bg-white text-[#5F6FFF] px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-50 transition duration-200 active:scale-95 shadow-md shadow-indigo-955/10 cursor-pointer block text-center"
          >
            Book Appointment
          </Link>
        </div>
        <div className="md:w-5/12 flex justify-center md:justify-end self-end w-full relative">
          <Image
            src="/appointment-doc-img.svg"
            alt="Doctor Illustration"
            width={400}
            height={400}
            priority
            className="w-80 sm:w-96 h-auto object-contain max-h-90"
          />
        </div>
      </section>
    </div>
  );
}