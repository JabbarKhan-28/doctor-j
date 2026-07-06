"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { setCurrentUser, clearCurrentUser } from "../redux/slices/appointmentSlice";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux States
  const currentUser = useAppSelector((state) => state.appointment.currentUser);
  const appointments = useAppSelector((state) => state.appointment.appointments);

  // Component UI States
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Authentication Form States
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "doctors", label: "All Doctors", href: "/doctors" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  if (isMounted && appointments && appointments.length > 0) {
    navLinks.push({ id: "Appointments", label: "Appointments", href: "/my-appointments" });
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName.trim() || !authEmail.trim()) {
      setAuthError("Please fill in all required fields.");
      return;
    }
    
    dispatch(
      setCurrentUser({
        name: authName.trim(),
        email: authEmail.trim(),
      })
    );

    // Reset Form
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
    setAuthError("");
    setIsAuthModalOpen(false);
  };

  const handleSignOut = () => {
    dispatch(clearCurrentUser());
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          
          {/* Logo */}
          <Link href="/" className="flex cursor-pointer items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50 transition-colors group-hover:bg-indigo-100">
              <Image
                src="/icon.svg"
                alt="Doctor J Logo"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#000B6D] transition-colors group-hover:text-[#5F6FFF]">
              Doctor J
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-100/50 p-1.5 rounded-full border border-slate-200/40">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  isActive(link.href)
                    ? "bg-[#5F6FFF] text-white shadow-md shadow-indigo-100"
                    : "text-slate-600 hover:text-[#5F6FFF] hover:bg-[#5F6FFF]/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop User / Auth Button */}
          <div className="hidden md:flex items-center gap-4">
            {isMounted && currentUser ? (
              <div className="relative">
                {/* User Dropdown Toggle Button */}
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2.5 rounded-full bg-slate-50 border border-slate-200/80 px-4 py-1.5 hover:bg-slate-100 transition duration-200 cursor-pointer"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5F6FFF] font-bold text-white text-sm capitalize shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="max-w-30 truncate text-sm font-semibold text-slate-700">
                    {currentUser.name}
                  </span>
                  <svg
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                      isUserDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* User Dropdown Options */}
                {isUserDropdownOpen && (
                  <>
                    {/* Backdrop to close dropdown on click outside */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2.5 w-56 origin-top-right rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-100 focus:outline-none z-20">
                      <div className="px-3.5 py-3 border-b border-slate-50">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {currentUser.email}
                        </p>
                      </div>
                      <Link
                        href="/my-appointments"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        My Appointments
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-xl px-3.5 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50/50 transition cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="rounded-full bg-[#000B6D] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-900/10 transition-all duration-300 hover:scale-[1.03] hover:bg-[#5F6FFF] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] cursor-pointer"
              >
                Create Account
              </button>
            )}
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-slate-700 hover:bg-slate-50 active:scale-95 transition"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md shadow-inner">
            <div className="space-y-1.5 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition ${
                    isActive(link.href)
                      ? "bg-[#5F6FFF]/10 text-[#5F6FFF]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Links are already conditionally rendered inside navLinks */}

              <div className="border-t border-slate-100 pt-4 mt-2 px-2">
                {isMounted && currentUser ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5F6FFF] font-bold text-white text-base capitalize">
                        {currentUser.name?.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-800">{currentUser.name}</span>
                        <span className="text-xs text-slate-400">{currentUser.email}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full rounded-xl bg-rose-50 text-rose-600 font-semibold py-3 text-sm text-center hover:bg-rose-100 transition cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="w-full rounded-xl bg-[#000B6D] font-semibold text-white py-3 text-sm text-center shadow-md hover:bg-[#5F6FFF] transition cursor-pointer"
                  >
                    Create Account
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Simulated Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsAuthModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition cursor-pointer"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="flex flex-col text-left">
              <h2 className="text-2xl font-bold text-slate-800">Get Started</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Enter your details to create a simulated account and start booking appointments.
              </p>

              {authError && (
                <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 border border-rose-100">
                  {authError}
                </div>
              )}

              <form className="mt-6 flex flex-col gap-4" onSubmit={handleSignIn}>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ali Ahmed"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] focus:ring-1 focus:ring-[#5F6FFF]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ali@example.com"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] focus:ring-1 focus:ring-[#5F6FFF]/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Password (Optional)
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] focus:ring-1 focus:ring-[#5F6FFF]/20 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-[#5F6FFF] py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 hover:bg-[#4b5bef] transition cursor-pointer"
                >
                  Create Simulated Account
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
