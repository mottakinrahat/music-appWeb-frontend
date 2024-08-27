import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import PlansCard from "./PlansCard";

// Define the interface for the props
interface PlansTabsProps {
  // Define your props here if needed
}

const PlansTabs: React.FC<PlansTabsProps> = ({}) => {
  return (
    <div className="mt-12 mb-12">
      <Tabs defaultValue="monthly" className="w-full">
        <div className="p-2 bg-[#f7f7f7] w-[303px] mx-auto rounded-xl border border-[#E6E6E6]">
          <TabsList className="grid  grid-cols-2">
            {/* tab names */}
            <TabsTrigger
              value="monthly"
              className="flex p-[12px_32px] justify-center items-center gap-2  hover:bg-gray-300"
            >
              Per Montly
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              className="flex p-[12px_32px] justify-center items-center gap-2  hover:bg-gray-300"
            >
              Per Yearly
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-6 ">
          {/* Monthly Plan Tab */}
          <TabsContent className="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" value="monthly">
            <PlansCard billingCycle="month" features={["Ad-supported", "Limited skips"]} price={0} title="Free Tier" />
            <PlansCard
              billingCycle="month"
              features={["Ad-free streaming", "High-quality audio", "Offline downloads"]}
              price={9.99}
              title="Premium Tier"
              saving={"20"}
              popular={true}
            />
            <PlansCard
              billingCycle="month"
              features={[
                "Ad-free streaming",
                "High-quality audio",
                "Offline downloads",
                "Discounts on sample packs",
                "Freelancer services",
              ]}
              price={19.99}
              title="Pro Tier"
              saving={"32"}
            />
          </TabsContent>

          {/* Yearly Plan Tab */}
          <TabsContent className="w-full h-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" value="yearly">
            <PlansCard billingCycle="year" features={["Ad-supported", "Limited skips"]} price={0} title="Free Tier" />
            <PlansCard
              billingCycle="year"
              features={["Ad-free streaming", "High-quality audio", "Offline downloads"]}
              price={23.976}
              title="Premium Tier"
              popular={true}
            />
            <PlansCard
              billingCycle="year"
              features={[
                "Ad-free streaming",
                "High-quality audio",
                "Offline downloads",
                "Discounts on sample packs",
                "Freelancer services",
              ]}
              price={76.7616}
              title="Pro Tier"
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PlansTabs;
