import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join Thousands of users who are already making their finances smarter
          FinSightAi
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-white text-blue-600  cursor-pointer hover-btn animate-bounce"
          >
            Start Your Free Trial
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
