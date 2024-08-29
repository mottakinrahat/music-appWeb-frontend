"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { use } from "react";
import Alipay from "../../../assets/payment/alipay.svg";
import Apple from "../../../assets/payment/apple.svg";
import Paypal from "../../../assets/payment/paypal.svg";
import Visa from "../../../assets/payment/visa.svg";
import Wechat from "../../../assets/payment/wechat.svg";
import Image from "next/image";
import DForm from "@/components/forms/DForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DInput from "@/components/forms/DInput";
import { Button } from "@/components/ui/button";

const checkoutCardShcema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  card_number: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  exp_date: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiration date must be in MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

// create a array of image img src and id value

const PayImagesArray = [
  { src: Visa, id: "visa" },
  { src: Paypal, id: "paypal" },
  { src: Apple, id: "apple" },
  { src: Wechat, id: "wechat" },
  { src: Alipay, id: "alipay" },
];

interface CheckoutCardComponentProp {}

const CheckoutCardComponent: React.FC<CheckoutCardComponentProp> = () => {
  // state for selecting image

  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleSubmit = (data: any) => {
    console.log(handleSubmit);
  };

  return (
    <div className="container">
      <Tabs defaultValue="card" className="max-w-[588px] mx-auto">
        <TabsList className="grid w-full grid-cols-2 bg-white">
          <div className="max-w-[306px] flex space-x-6 ">
            <TabsTrigger
              className="data-[state=active]:shadow-none  data-[state=active]:border-b-4 data-[state=active]:border-b-[#00CCD0] rounded-none text-[#4C4C4C] text-xl font-normal leading-normal"
              value="card"
            >
              Credit card
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:shadow-none  data-[state=active]:border-b-4 data-[state=active]:border-b-[#00CCD0] rounded-none text-[#4C4C4C] text-xl font-normal leading-normal"
              value="token"
            >
              Token
            </TabsTrigger>
          </div>
        </TabsList>
        {/* Tab Content */}

        <div className="mt-6">
          <TabsContent value="card">
            <div className="flex gap-4 mb-6">
              {PayImagesArray.map((image) => (
                <div
                  onClick={() => setSelectedImage(image?.id)}
                  className={`p-3 border  rounded-lg cursor-pointer ${
                    selectedImage === image?.id ? "border-[#00CCD0]" : "border-[#E6E6E6]"
                  }`}
                  key={image?.id}
                >
                  <Image src={image?.src} alt={image?.id} width={24} height={24} />
                </div>
              ))}
            </div>

            {/* form */}

            <DForm resolver={zodResolver(checkoutCardShcema)} onSubmit={handleSubmit}>
              {/* first name & Last name */}
              <div className="flex items-start flex-col md:flex-row justify-between gap-6">
                <DInput
                  defaultValue={""}
                  labelTextColor="#262626"
                  name="firstName"
                  label="First Name"
                  placeholder="Enter your first name"
                />
                <DInput
                  defaultValue={""}
                  labelTextColor="#262626"
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>
              {/* Card Number */}

              <div className="mt-6">
                <DInput label="Card number" className="" name="card_number" placeholder="Enter your card number" />
              </div>

              {/* EXP DATE AND CVV */}

              <div className="flex items-start justify-between gap-6 mt-6">
                <DInput
                  defaultValue={""}
                  labelTextColor="#262626"
                  name="exp_date"
                  label="EXP date"
                  placeholder="MM/YY"
                />
                <DInput
                  defaultValue={"Islam"}
                  labelTextColor="#262626"
                  name="cvv"
                  label="CVV"
                  placeholder="Enter your CVV"
                />
              </div>

              {/* Submit Button */}

              <div className="w-full mb-4">
                <Button className="w-full mt-6" variant="default" type="submit">
                  Confirm
                </Button>
              </div>
            </DForm>
          </TabsContent>
          <TabsContent value="token">token</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CheckoutCardComponent;
