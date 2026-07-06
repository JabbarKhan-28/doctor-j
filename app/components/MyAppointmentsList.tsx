"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { cancelAppointment, setCurrentUser } from "../redux/slices/appointmentSlice";
import { Appointment } from "../types";

export default function MyAppointmentsList() {
  const dispatch = useAppDispatch();

  // Selectors
  const currentUser = useAppSelector((state) => state.appointment.currentUser);
  const appointments = useAppSelector(
    (state) => state.appointment.appointments as Appointment[]
  );

  // States
  const [isMounted, setIsMounted] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim()) {
      setLoginError("Please enter both Name and Email.");
      return;
    }
    dispatch(
      setCurrentUser({
        name: nameInput.trim(),
        email: emailInput.trim(),
      })
    );
    setNameInput("");
    setEmailInput("");
    setLoginError("");
    setIsLoginOpen(false);
  };

  const handleCancel = (id: string) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment? This action cannot be undone."
    );
    if (confirmCancel) {
      dispatch(cancelAppointment(id));
    }
  };

  // Sort appointments so newest bookings appear first
  const sortedAppointments = [...appointments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (!isMounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center grow flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-650 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center grow flex flex-col justify-center items-center">
        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 max-w-md shadow-sm text-center">
          <span className="text-4xl">🔐</span>
          <h2 className="text-xl font-bold text-slate-800 mt-4">Access Denied</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
            Please log in or create a simulated account to view and manage your booked appointments.
          </p>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="mt-6 bg-[#5F6FFF] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#4b5bef] transition shadow-md shadow-indigo-50 cursor-pointer"
          >
            Sign In Now
          </button>
        </div>

        {/* Local Login Modal */}
        {isLoginOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsLoginOpen(false)}
            />
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 text-left">
              <button
                onClick={() => setIsLoginOpen(false)}
                className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:text-slate-655 hover:bg-slate-55 transition cursor-pointer"
              >
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-xl font-bold text-slate-800">Authentication Required</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Enter your details to create a simulated account and view your bookings.
              </p>

              {loginError && (
                <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 border border-rose-100">
                  {loginError}
                </div>
              )}

              <form className="mt-5 flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 font-sans">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ali Ahmed"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-655 mb-1.5 font-sans">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="ali@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] transition"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-[#5F6FFF] py-3 text-sm font-bold text-white hover:bg-[#4b5bef] transition cursor-pointer"
                >
                  Create Profile
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 w-full grow flex flex-col text-left">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">My Appointments</h1>

      {sortedAppointments.length === 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center flex flex-col items-center justify-center shadow-sm grow min-h-[40vh]">
          <span className="text-4xl">📅</span>
          <h2 className="text-lg font-bold text-slate-800 mt-4">No Appointments Booked</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-sm">
            You don't have any active appointments scheduled. Browse our list of medical experts to secure your slot.
          </p>
          <Link
            href="/doctors"
            className="mt-6 inline-block bg-[#5F6FFF] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#4b5bef] transition shadow-md shadow-indigo-50"
          >
            Find a Doctor
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {sortedAppointments.map((appointment) => {
            const isBooked = appointment.status === "booked";
            return (
              <div
                key={appointment.id}
                className="bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="flex gap-4 items-start sm:items-center">
                  {/* Doctor Image */}
                  <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden shrink-0 relative border border-slate-100">
                    <Image
                      src={appointment.doctorImage}
                      alt={appointment.doctorName}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Doctor & Appointment Meta */}
                  <div className="flex flex-col">
                    <h3 className="text-sm sm:text-base font-bold text-slate-800">{appointment.doctorName}</h3>
                    <p className="text-xs text-indigo-655 font-bold capitalize mt-0.5">
                      {appointment.doctorSpeciality}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-slate-400 text-[11px] font-semibold">
                      <span className="flex items-center gap-1 text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {appointment.date}
                      </span>
                      <span className="hidden sm:inline text-slate-350">|</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {appointment.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side Options / Status */}
                <div className="flex sm:flex-col items-end gap-3.5 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex-row justify-between">
                  <div className="flex flex-col sm:items-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consultation Fee</span>
                    <span className="text-sm font-extrabold text-slate-800 mt-0.5">Rs. {appointment.doctorFees}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                        isBooked
                          ? "bg-green-50 text-green-700 border-green-150"
                          : "bg-rose-50 text-rose-700 border-rose-150"
                      }`}
                    >
                      {appointment.status}
                    </span>

                    {isBooked && (
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="text-xs font-bold text-slate-400 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
