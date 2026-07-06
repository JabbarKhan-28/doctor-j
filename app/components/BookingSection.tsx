"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { bookAppointment, setCurrentUser } from "../redux/slices/appointmentSlice";
import { Doctor, Appointment } from "../types";

export default function BookingSection({ doctor }: { doctor: Doctor }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.appointment.currentUser);

  // States
  const [isMounted, setIsMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [daysList, setDaysList] = useState<Date[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLocalLoginOpen, setIsLocalLoginOpen] = useState(false);

  // Local login inputs
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginError, setLoginError] = useState("");

  // Get next 7 days dynamically
  useEffect(() => {
    const days: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date();
      nextDay.setDate(today.getDate() + i);
      days.push(nextDay);
    }
    setDaysList(days);
    setSelectedDate(days[0]); // Select today by default
    setIsMounted(true);
  }, []);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  const handleBooking = () => {
    if (!currentUser) {
      setIsLocalLoginOpen(true);
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time slot.");
      return;
    }

    // Format Date: e.g. "Mon, Jul 7, 2026"
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    const formattedDate = selectedDate.toLocaleDateString("en-US", dateOptions);

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substring(2, 11),
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorImage: doctor.image,
      doctorSpeciality: doctor.speciality,
      doctorFees: doctor.fees,
      date: formattedDate,
      timeSlot: selectedTime,
      status: "booked",
      createdAt: new Date().toISOString(),
    };

    dispatch(bookAppointment(newAppointment));
    setIsSuccessModalOpen(true);
  };

  const handleLocalLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginName.trim() || !loginEmail.trim()) {
      setLoginError("Please fill in all fields.");
      return;
    }
    dispatch(
      setCurrentUser({
        name: loginName.trim(),
        email: loginEmail.trim(),
      })
    );
    setLoginName("");
    setLoginEmail("");
    setLoginError("");
    setIsLocalLoginOpen(false);
  };

  const formatDateLabel = (date: Date) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayNumber = date.getDate();
    return { dayName, dayNumber };
  };

  return (
    <>
      {/* Booking Calendar & Slots */}
      <section className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Select Booking Slot</h2>
        
        {/* Date Row */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Available Dates</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {daysList.map((date, idx) => {
              const { dayName, dayNumber } = formatDateLabel(date);
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center min-w-14 h-20 rounded-2xl border text-center transition cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#5F6FFF] border-[#5F6FFF] text-white shadow-lg shadow-indigo-100"
                      : "bg-white border-slate-200 text-slate-655 hover:border-slate-350"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{dayName}</span>
                  <span className="text-lg font-extrabold mt-1">{dayNumber}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Row */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Available Hours</h3>
          <div className="flex flex-wrap gap-2.5">
            {timeSlots.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-xl px-4 py-3 text-xs font-bold border transition cursor-pointer ${
                    isSelected
                      ? "bg-[#5F6FFF] border-[#5F6FFF] text-white shadow-md shadow-indigo-50"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-350"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-slate-100 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-xs font-medium">
            {selectedDate && selectedTime ? (
              <p>
                Booking schedule:{" "}
                <span className="font-bold text-slate-700">
                  {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at {selectedTime}
                </span>
              </p>
            ) : (
              <p className="text-amber-600 font-semibold">Please select a date and hour slot above.</p>
            )}
          </div>
          <button
            onClick={handleBooking}
            disabled={!doctor.available || !selectedDate || !selectedTime}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold text-white shadow-lg transition cursor-pointer ${
              !doctor.available || !selectedDate || !selectedTime
                ? "bg-slate-300 shadow-none cursor-not-allowed opacity-60"
                : "bg-[#5f6fff] hover:bg-[#4b5bef] shadow-indigo-100 active:scale-98"
            }`}
          >
            {isMounted && currentUser ? "Book Appointment" : "Sign In to Book"}
          </button>
        </div>
      </section>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl transition-all border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 border border-green-100 mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800">Booking Confirmed!</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 leading-relaxed">
              Your appointment with <span className="font-semibold text-slate-700">{doctor.name}</span> has been successfully scheduled.
            </p>
            
            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  router.push("/my-appointments");
                }}
                className="w-full rounded-xl bg-[#5F6FFF] py-3 text-sm font-bold text-white shadow-md shadow-indigo-50 hover:bg-[#4b5bef] transition cursor-pointer"
              >
                View My Appointments
              </button>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setSelectedTime("");
                }}
                className="w-full rounded-xl bg-slate-50 border border-slate-100 py-3 text-sm font-bold text-slate-500 hover:bg-slate-100 transition cursor-pointer"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local SignIn Modal */}
      {isLocalLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsLocalLoginOpen(false)} />
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsLocalLoginOpen(false)}
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 text-slate-400 hover:text-slate-655 hover:bg-slate-55 transition cursor-pointer"
            >
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col text-left">
              <h2 className="text-xl font-bold text-slate-800">Authentication Required</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Create a simulated account to link this booking.
              </p>

              {loginError && (
                <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-600 border border-rose-100">
                  {loginError}
                </div>
              )}

              <form className="mt-5 flex flex-col gap-4" onSubmit={handleLocalLoginSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Ali Ahmed"
                    value={loginName}
                    onChange={(e) => setLoginName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="ali@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#5F6FFF] transition"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-[#5F6FFF] py-3 text-sm font-bold text-white hover:bg-[#4b5bef] transition cursor-pointer"
                >
                  Create Profile & Book
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
