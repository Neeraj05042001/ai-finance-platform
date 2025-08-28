import { testimonialsData } from "@/data/landing";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-t from-blue-400 to-blue-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-8">
        {testimonialsData.map((testimonial) => (
          <Card className="p-6" key={testimonial.name}>
            <CardContent className=" pt-4">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />

                <div className="ml-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              <p className="text-gray-600">{testimonial.quote}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Testimonials;
