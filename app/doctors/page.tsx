import React, { Suspense } from "react";
import { categories } from "../data/category";
import { doctors } from "../data/doctor";
import DoctorsList from "../components/DoctorsList";
import Loading from "../loading";

export default function DoctorsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <DoctorsList categories={categories} doctors={doctors} />
    </Suspense>
  );
}
