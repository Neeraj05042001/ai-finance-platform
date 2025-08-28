import CallToAction from "@/components/CallToAction";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-40">
      <Hero />
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          {" "}
          <Stats />
        </div>
      </section>

<Features/>

      

      
        <HowItWorks/>
      
       
        <Testimonials/>
      

       
        <CallToAction/>
      
    </div>
  );
}
