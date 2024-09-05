"use client";
import DForm from "@/components/forms/DForm";
import DInput from "@/components/forms/DInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";

interface PurchaseTokenComponentProps {}

const couponSchema = z.object({
  coupon: z.string().min(1, "Coupon code is required"),
});

const tokenPlans = [
  { value: "10", label: "10 tokens", price: "US $1.00" },
  { value: "100", label: "100 tokens", price: "US $9.50" },
  { value: "500", label: "500 tokens", price: "US $45.00" },
  { value: "1000", label: "1000 tokens", price: "US $85.00" },
];

const PurchaseTokenComponent: React.FC<PurchaseTokenComponentProps> = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>("10");
  const [showCoupon, setShowCoupon] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Coupon is not valid");
  const handleChange = (value: string) => {
    setSelectedPlan(value);
  };

  const handleSubmit = (data: any) => {};
  console.log(selectedPlan);

  return (
    <div className="container">
      <div className="max-w-[588px] mx-auto">
        <p className="text-[#262626] text-4xl font-semibold leading-normal tracking[-0.96px] mb-12">
          Purchase token
        </p>

        {/* Check box components */}
        <div className="space-y-6">
          {tokenPlans?.map((plan) => (
            <div
              key={plan?.value}
              className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer bg-[#f7f7f7]  ${
                selectedPlan === plan?.value ? "border-teal-500" : ""
              }`}
              onClick={() => handleChange(plan?.value)}
            >
              <label className="flex items-center flex-1 cursor-pointer">
                <div className="px-1 py-1 border flex items-center justify-center rounded-md cursor-pointer">
                  <input
                    id="plan"
                    type="radio"
                    name="plan"
                    value={plan?.value}
                    checked={selectedPlan === plan?.value}
                    readOnly
                    className="appearance-none w-4 h-4 border-gray-400 rounded-md checked:bg-black cursor-pointer"
                  />
                </div>
                <span className="ml-2 cursor-pointer">{plan?.label}</span>
              </label>
              <span className="cursor-pointer">{plan?.price}</span>
            </div>
          ))}
        </div>

        {/* coupon section */}

        <div>
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
                <DInput
                  name="coupon"
                  label=""
                  defaultValue={""}
                  placeholder="Add coupon"
                  className="flex-1 w-full"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="text-white text-base font-semibold leading-normal w-fit"
                >
                  Apply
                </Button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </DForm>

            <div
              className={`grid grid-cols-2 transition-all duration-300 ${
                showCoupon ? "" : "-mt-24"
              }`}
            >
              <div className="border-r border-[#E6E6E6] pt-4 pr-6">
                <div className="flex justify-between mb-2">
                  <span className="text-black text-base font-normal leading-normal">
                    Subtotal
                  </span>
                  <span className="text-black text-base font-semibold leading-normal">
                    US $ {selectedPlan}{" "}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-black text-base font-normal leading-normal">
                    Taxes
                  </span>
                  <span className="text-black text-base font-semibold leading-normal">
                    US $0.00
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black text-base font-normal leading-normal">
                    Coupon
                  </span>
                  <span className="text-black text-base font-semibold leading-normal">
                    US $0.00
                  </span>
                </div>
              </div>
              <div className="pl-6 flex items-start justify-end flex-col">
                <p className="text-black text-xl font-semibold leading-normal">
                  Total
                </p>
                <p className="text-black text-xl font-semibold leading-normal">
                  US $ {selectedPlan}
                </p>
              </div>
            </div>
          </div>
          <div>
            <Button variant="default" className="w-full">
              Purchase token
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseTokenComponent;
