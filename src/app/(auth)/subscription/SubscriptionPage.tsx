"use client";
import DForm from "@/components/forms/DForm";
import DInput from "@/components/forms/DInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

// Schema for coupon validation
const couponSchema = z.object({
  coupon: z.string().min(1, "Coupon code is required"),
});

// {
//   "title": "Premium Tier",
//   "price": 23.976,
//   "billingCycle": "year"
// }

// {
//   "title": "Premium Tier",
//   "price": 9.99,
//   "billingCycle": "month"
// }

const SubscriptionCard: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();
  console.log(data);
  // State for selected plan
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  // State for coupon code
  const [showCoupon, setShowCoupon] = useState(false);
  // State for error message
  const [errorMessage, setErrorMessage] = useState("Coupon is not valid");

  useEffect(() => {
    const url = new URL(window.location.href);
    const queryData = url?.searchParams?.get("data");
    if (queryData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(queryData));
        setData(decodedData);
        setSelectedPlan(decodedData.billingCycle === "month" ? "monthly" : "year");
      } catch (error) {
        console.error("Failed to parse query data:", error);
      }
    }
  }, [router]);

  console.log(data);

  // Handle form submit
  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="max-w-[588px] mx-auto rounded-lg p-6 bg-white">
      <h2 className="text-[#262626] text-5xl font-semibold leading-normal tracking-[-0.96px] mb-5">1 Month free</h2>

      <div className="mb-6">
        <p className="text-[#4C4C4C] text-base font-normal leading-[140%]">Subscription:</p>
        <p className="text-[#262626] text-xl font-semibold leading-normal">{data?.title || "Select a plan"}</p>
      </div>

      <div className="mb-4">
        <div
          className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer bg-[#f7f7f7] ${
            selectedPlan === "monthly" ? "border-teal-500" : "border-gray-300"
          }`}
          onClick={() => {
            if (selectedPlan !== "monthly") {
              setSelectedPlan("monthly");
            }
          }}
        >
          <label className="flex items-center ">
            <div className="px-1 py-1 border flex items-center justify-center rounded-md">
              <input
                type="radio"
                name="plan"
                value="monthly"
                checked={selectedPlan === "monthly"}
                onChange={() => setSelectedPlan("monthly")}
                className="appearance-none w-4 h-4 border-gray-400 rounded-md checked:bg-black"
                disabled={selectedPlan === "year"}
              />
            </div>
            <span className="ml-2">Monthly</span>
          </label>
          <span>US ${data?.price || "0.00"}/month</span>
        </div>

        <div
          className={`flex justify-between items-center border rounded-lg p-4 mt-2 cursor-pointer bg-[#f7f7f7] ${
            selectedPlan === "year" ? "border-teal-500" : "border-gray-300"
          }`}
          onClick={() => {
            if (selectedPlan !== "year") {
              setSelectedPlan("year");
            }
          }}
        >
          <label className="flex items-center">
            <div className="px-1 py-1 border flex items-center justify-center rounded-md">
              <input
                type="radio"
                name="plan"
                value="year"
                checked={selectedPlan === "year"}
                onChange={() => setSelectedPlan("year")}
                className="appearance-none w-4 h-4 border-gray-400 rounded-md checked:bg-black"
                disabled={selectedPlan === "monthly"}
              />
            </div>
            <span className="ml-2">Yearly (Save 20%)</span>
          </label>
          <span>US ${data?.price || "0.00"}/year</span>
        </div>
      </div>

      <div className="py-6 mt-6 border-t border-b mb-6">
        <div className="mb-4">
          <button
            onClick={() => setShowCoupon((prev) => !prev)}
            className="text-black text-base font-normal leading-normal underline"
          >
            {showCoupon ? "- Remove coupon code" : "+ Add coupon code"}
          </button>
        </div>

        {/* Input form */}
        <DForm
          onSubmit={handleSubmit}
          resolver={zodResolver(couponSchema)}
          className={`mb-6 space-y-3 transition-opacity duration-300 ease-in-out ${
            showCoupon ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-3">
            <DInput name="coupon" label="" defaultValue={""} placeholder="Add coupon" className="flex-1 w-full" />
            <Button type="submit" variant="default" className="text-white text-base font-semibold leading-normal w-fit">
              Apply
            </Button>
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        </DForm>

        <div className={`grid grid-cols-2 transition-all duration-300 ${showCoupon ? "" : "-mt-24"}`}>
          <div className="border-r border-[#E6E6E6] pt-4 pr-6">
            <div className="flex justify-between mb-2">
              <span className="text-black text-base font-normal leading-normal">Subtotal</span>
              <span className="text-black text-base font-semibold leading-normal">US ${data?.price || "0.00"}</span>
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
            <p className="text-black text-xl font-semibold leading-normal">US ${data?.price || "0.00"}</p>
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
