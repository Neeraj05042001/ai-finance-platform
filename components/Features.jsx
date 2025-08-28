import { featuresData } from "@/data/landing";
import React from "react";
import { Card, CardContent } from "./ui/card";

const Features = () => {
  return (
    <section className="py-20">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        Everything you need to manage your finances
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresData.map((features) => (
          <Card className="p-6" key={features.title}>
            <CardContent className="space-y-4 pt-4">
              {features.icon}
              <h3 className="text-xl font-semibold">{features.title}</h3>
              <p className="text-gray-600">{features.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Features;
