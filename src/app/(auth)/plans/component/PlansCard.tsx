import { Button } from "@/components/ui/button";
import React from "react";
import { FaCheck } from "react-icons/fa6";

interface PlansCardProps {
  // Define any props if needed. For now, it's empty.
  saving?: String;
  popular?: boolean;
  title: string;
  price: number;
  features: string[];
  billingCycle: string;
}

const PlansCard: React.FC<PlansCardProps> = ({ features, saving, popular = false, title, price, billingCycle }) => {
  return (
    <div>
      <div className="grid grid-rows-[auto_1fr_auto] p-6 items-start gap-6 rounded-xl border border-[#E6E6E6] bg-[#F7F7F7] min-h-[482px] ">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-[#262626] text-2xl font-semibold leading-normal">{title}</h2>
            {popular && (
              <p className="flex p-[8px_24px] w-[150px] justify-center items-center gap-2 rounded-full bg-[rgba(217,17,141,0.08)] text-[#D9118D] text-base font-semibold leading-normal">
                Popular
              </p>
            )}
          </div>
          <p className="text-[#262626] text-4xl font-light leading-normal tracking-[-0.8px]">
            US ${price.toFixed(2)}/{" "}
            <span className="text-[#262626] text-base font-normal leading-normal tracking-[-0.32px]">
              {" "}
              {billingCycle}
            </span>{" "}
          </p>
          <div className="w-full h-[1px] bg-[#E6E6E6] mt-6"></div>
        </div>
        {/* Features */}
        <div className="">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <FaCheck className="text-[#00E45B]" />
              <p className="text-[#262626] text-base font-normal leading-normal tracking-[-0.32px]">{feature}</p>
            </div>
          ))}
        </div>
        {/* Action button */}
        <div className="flex flex-col gap-4">
          {saving && <p>*Save up to {saving}% by paying yearly</p>}
          <Button variant={"default"}>Select free tire</Button>
        </div>
      </div>
    </div>
  );
};

export default PlansCard;
