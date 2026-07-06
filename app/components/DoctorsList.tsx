"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Category, Doctor } from "@/app/types";

interface DoctorsListProps {
  categories: Category[];
  doctors: Doctor[];
}

export default function DoctorsList({ categories, doctors }: DoctorsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const specialityParam = searchParams.get("speciality");

  // Filter States
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [sortBy, setSortBy] = useState("None");
  const [availableOnly, setAvailableOnly] = useState(false);

  // Sync speciality search parameter with selected category state
  useEffect(() => {
    if (specialityParam) {
      setSelectedCategory(specialityParam);
    }
  }, [specialityParam]);

  // Handle Filtering
  const filteredDoctors = doctors
    .filter((doctor) => {
      // 1. Search by Name
      const matchesName = doctor.name.toLowerCase().includes(searchName.toLowerCase());

      // 2. Filter by Category
      const matchesCategory =
        selectedCategory === "All" ||
        doctor.speciality.toLowerCase() === selectedCategory.toLowerCase();

      // 3. Filter by Experience
      let matchesExperience = true;
      if (selectedExperience !== "All") {
        const years = parseInt(doctor.experience);
        if (selectedExperience === "0-5") {
          matchesExperience = years >= 0 && years <= 5;
        } else if (selectedExperience === "5-10") {
          matchesExperience = years > 5 && years <= 10;
        } else if (selectedExperience === "10+") {
          matchesExperience = years > 10;
        }
      }

      // 4. Filter by Availability
      const matchesAvailability = !availableOnly || doctor.available;

      return matchesName && matchesCategory && matchesExperience && matchesAvailability;
    })
    .sort((a, b) => {
      // Sort by Price (fees)
      if (sortBy === "low-to-high") {
        return a.fees - b.fees;
      } else if (sortBy === "high-to-low") {
        return b.fees - a.fees;
      }
      return 0;
    });

  const clearAllFilters = () => {
    setSearchName("");
    setSelectedCategory("All");
    setSelectedExperience("All");
    setSortBy("None");
    setAvailableOnly(false);
    router.replace("/doctors"); // Remove query parameters from URL
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full grow flex flex-col">
      <h1 className="text-2xl font-bold text-slate-800 mb-6 text-left">Browse Doctors</h1>

      {/* Main Grid: Left Side Filters, Right Side Doctors */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-64 bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col gap-6 shrink-0 text-left shadow-sm">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Search</h3>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#5F6FFF] focus:ring-1 focus:ring-[#5F6FFF]/20 transition"
            />
          </div>

          {/* Specialities */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Specialities</h3>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === "All"
                    ? "bg-[#5F6FFF] text-white shadow-md shadow-indigo-100"
                    : "bg-slate-50 text-slate-655 hover:bg-slate-100"
                }`}
              >
                All Specialities
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-[#5F6FFF] text-white shadow-md shadow-indigo-100"
                      : "bg-slate-50 text-slate-655 hover:bg-slate-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Experience</h3>
            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#5F6FFF] transition cursor-pointer"
            >
              <option value="All">All Experiences</option>
              <option value="0-5">0 - 5 Years</option>
              <option value="5-10">5 - 10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>

          {/* Sort By Price */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sort by Fee</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#5F6FFF] transition cursor-pointer"
            >
              <option value="None">Default</option>
              <option value="low-to-high">Fee: Low to High</option>
              <option value="high-to-low">Fee: High to Low</option>
            </select>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 border-t border-slate-100 pt-4">
            <input
              type="checkbox"
              id="avail"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="w-4 h-4 text-[#5F6FFF] border-slate-300 rounded focus:ring-[#5F6FFF]/20 cursor-pointer"
            />
            <label htmlFor="avail" className="text-xs text-slate-600 font-semibold cursor-pointer select-none">
              Show Available Only
            </label>
          </div>

          {/* Reset Filters */}
          <button
            onClick={clearAllFilters}
            className="w-full border border-slate-200 text-slate-500 font-bold py-2.5 rounded-xl text-xs hover:bg-slate-55 transition mt-2 cursor-pointer"
          >
            Clear Filters
          </button>
        </aside>

        {/* Doctors Grid */}
        <div className="grow flex flex-col w-full">
          {filteredDoctors.length === 0 ? (
            <div className="bg-white border border-slate-200/60 rounded-2xl p-10 text-center flex flex-col items-center justify-center w-full shadow-sm">
              <p className="text-slate-400 text-sm font-semibold">No doctors found matching your filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-xs font-bold text-[#5F6FFF] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white border border-slate-200/60 rounded-2xl p-3.5 flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-50/20 hover:border-[#5F6FFF]/35 transition duration-300 group"
                >
                  <div>
                    {/* Doctor Image */}
                    <div className="w-full h-36 bg-slate-50 rounded-xl overflow-hidden mb-3.5 relative">
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
                      className="w-full bg-[#5F6FFF] text-white text-[11px] font-bold py-2 rounded-lg hover:bg-[#4b5bef] transition active:scale-98 cursor-pointer text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
