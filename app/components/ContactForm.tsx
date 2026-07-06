"use client";

import React, { useState } from "react";

export default function ContactForm() {
  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      return;
    }
    
    // Simulate successful form submit
    setIsSubmitted(true);
    
    // Clear inputs
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col gap-4 shadow-sm min-h-90 justify-center">
      {isSubmitted ? (
        <div className="flex flex-col items-center text-center gap-4 py-8 animate-in fade-in duration-300">
          <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center text-green-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-850">Message Sent!</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xs leading-relaxed">
            Thank you for reaching out. We have received your inquiry and our support team will reply within 24 hours.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 border border-slate-200 hover:bg-slate-50 px-6 py-2.5 rounded-xl text-xs font-bold text-slate-500 transition cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-slate-800 mb-2">Send a Message</h2>
          <form className="flex flex-col gap-4.5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-655 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Ali Ahmed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5F6FFF] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-655 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ali@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5F6FFF] transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-655 mb-1.5">Subject</label>
              <input
                type="text"
                required
                placeholder="How can we help you?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5F6FFF] transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-655 mb-1.5">Message</label>
              <textarea
                rows={4}
                required
                placeholder="Write your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#5F6FFF] resize-none transition"
              />
            </div>
            <button
              type="submit"
              className="bg-[#5F6FFF] text-white hover:bg-[#4b5bef] font-bold py-3 rounded-xl text-xs shadow-md shadow-indigo-50 transition mt-2 text-center cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </>
      )}
    </div>
  );
}
