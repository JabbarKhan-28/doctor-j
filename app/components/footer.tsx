import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "All Doctors", href: "/doctors" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  const categories = [
    { label: "General Physician", href: "/doctors?speciality=General Physician" },
    { label: "Dermatologist", href: "/doctors?speciality=Dermatologist" },
    { label: "Neurologist", href: "/doctors?speciality=Neurologist" },
    { label: "Pediatrician", href: "/doctors?speciality=Pediatrician" },
    { label: "Ortho Pedic", href: "/doctors?speciality=Ortho Pedic" },
    { label: "Gastroenterologist", href: "/doctors?speciality=Gastroenterologist" },
  ];

  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand/Description Column */}
          <div className="flex flex-col gap-4 text-left">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
                <Image
                  src="/icon.svg"
                  alt="Doctor J Logo"
                  width={28}
                  height={28}
                />
              </div>
              <span className="text-xl font-bold text-[#000B6D]">Doctor J</span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
              Simply browse through our extensive list of trusted doctors, and schedule your appointments hassle-free.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-500 hover:text-[#5F6FFF] transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities Column */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Specialities
            </h3>
            <ul className="flex flex-col gap-2.5">
              {categories.map((cat) => (
                <li key={cat.label}>
                  <Link
                    href={cat.href}
                    className="text-xs sm:text-sm text-slate-500 hover:text-[#5F6FFF] transition"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="text-left">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-slate-500">
              <li className="flex items-start gap-2">
                <span className="text-slate-700 font-semibold shrink-0">Add:</span>
                <span>B17, Islamabad, Pakistan</span>
              </li>
              <li>
                <span className="text-slate-700 font-semibold">Tel:</span> +92 300 8514046
              </li>
              <li>
                <span className="text-slate-700 font-semibold">Email:</span> jabbarkhan@gmail.com
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-slate-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Jabbar khan. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600 transition">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-slate-600 transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
