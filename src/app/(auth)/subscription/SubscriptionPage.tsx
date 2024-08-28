"use client";
import DForm from "@/components/forms/DForm";
import DInput from "@/components/forms/DInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";

const couponSchema = z.object({
  coupon: z.string().min(1, "Coupon code is required"),
});

const SubscriptionCard: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-[588px] mx-auto rounded-lg p-6 bg-white">
      <h2 className="text-[#262626] text-5xl font-semibold leading-normal tracking-[-0.96px] mb-5">1 Month free</h2>

      <div className="mb-6">
        <p className="text-[#4C4C4C] text-base font-normal leading-[140%]">Subscription:</p>
        <p className="text-[#262626] text-xl font-semibold leading-normal">Premium Tier</p>
      </div>

      <div className="mb-4">
        <div
          className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer bg-[#f7f7f7] ${
            selectedPlan === "monthly" ? "border-teal-500" : "border-gray-300"
          }`}
          onClick={() => setSelectedPlan("monthly")}
        >
          <label className="flex items-center ">
            <div className="px-1 py-1 border flex items-center justify-center rounded-md">
              <input
                type="radio"
                name="plan"
                value="monthly"
                checked={selectedPlan === "monthly"}
                onChange={() => setSelectedPlan("monthly")}
                className="appearance-none w-4 h-4  border-gray-400 rounded-md checked:bg-black "
              />
            </div>
            <span className="ml-2">Monthly</span>
          </label>
          <span>US $9.99/month</span>
        </div>

        <div
          className={`flex justify-between items-center border rounded-lg p-4 mt-2 cursor-pointer bg-[#f7f7f7] ${
            selectedPlan === "yearly" ? "border-teal-500" : "border-gray-300"
          }`}
          onClick={() => setSelectedPlan("yearly")}
        >
          <label className="flex items-center">
            <div className="px-1 py-1 border flex items-center justify-center rounded-md">
              <input
                type="radio"
                name="plan"
                value="yearly"
                checked={selectedPlan === "yearly"}
                onChange={() => setSelectedPlan("yearly")}
                className="appearance-none w-4 h-4  border-gray-400 rounded-md checked:bg-black"
              />
            </div>
            <span className="ml-2">Yearly (Save 20%)</span>
          </label>
          <span>US $98.99/year</span>
        </div>
      </div>

      <div className="py-6 mt-6 border-t border-b mb-6">
        <div className="mb-4">
          <button className="text-black text-base font-normal leading-normal underline">+ Add coupon code</button>
        </div>

        <DForm onSubmit={handleSubmit} resolver={zodResolver(couponSchema)} className="mb-6 flex gap-6">
          <DInput name="coupon" label="" defaultValue={""} placeholder="Apply cpupon" />
          <Button variant="default" className="text-white text-base font-semibold leading-normal w-fit">
            Apply
          </Button>
        </DForm>

        <div className="grid grid-cols-2">
          <div className="border-r border-[#E6E6E6] pt-4 pr-6">
            <div className="flex justify-between mb-2">
              <span className="text-black text-base font-normal leading-normal">Subtotal</span>
              <span className="text-black text-base font-semibold leading-normal">US $9.99</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black text-base font-normal leading-normal">Taxes</span>
              <span className="text-black text-base font-semibold leading-normal">US $0.59</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black text-base font-normal leading-normal">Coupon</span>
              <span className="text-black text-base font-semibold leading-normal">US $0.00</span>
            </div>
          </div>
          <div className="pl-6 flex items-start justify-end flex-col">
            <p className="text-black text-xl font-semibold leading-normal">Total</p>
            <p className="text-black text-xl font-semibold leading-normal">US $10.58</p>
          </div>
        </div>
      </div>
      <Button variant="default" className="w-full text-white text-base font-semibold leading-normal">
        Proceed to payment
      </Button>
    </div>
  );
};

export default SubscriptionCard;
