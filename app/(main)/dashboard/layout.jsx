import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import DashboardPage from "./page";

const DashboardLayout = () => {
  return (
    <div className="px-5">
      <h1 className="text-6xl gradient font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text">
        Dashboard
      </h1>

      {/* Dashboard page */}
      <Suspense
        fallback={
          <BarLoader className="mt-4" width={100} color="#9333ea"></BarLoader>
        }
      ></Suspense>
      <DashboardPage />
    </div>
  );
};

export default DashboardLayout;
