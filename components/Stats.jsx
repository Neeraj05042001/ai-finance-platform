import { statsData } from "@/data/landing";
import React from "react";

const Stats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {statsData.map((data) => (
        <div key={data.label} className="text-center">
          <div className="">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {data.value}
            </div>
            <div className="text-gray-600">{data.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
