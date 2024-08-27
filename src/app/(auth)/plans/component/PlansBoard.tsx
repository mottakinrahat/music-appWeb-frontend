import Container from "@/components/common/container/Container";
import React from "react";
import PlansTabs from "./PlansTabs";

interface PlansBoardProps {
  // Define any props if needed. For now, it's empty.
}

const PlansBoard: React.FC<PlansBoardProps> = () => {
  return (
    <div className="container">
      {/* main section */}
      <div>
        <div className="max-w-[588px] mx-auto space-y-4">
          <h1 className="text-[#262626] text-4xl font-semibold text-center leading-normal tracking-[-0.96px]">
            Choose Your Plan
          </h1>
          <p className="text-[#4C4C4C] text-base font-normal text-center leading-[22.4px]">
            We offer a variety of subscription plans to cater to your specific needs, whether you&apos;re a musician
            honing your craft or a seasoned producer seeking to expand your network.
          </p>
        </div>

        {/* Tabs */}

        <PlansTabs />
      </div>
    </div>
  );
};

export default PlansBoard;
