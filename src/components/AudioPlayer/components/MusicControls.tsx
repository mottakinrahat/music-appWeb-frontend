/* eslint-disable @next/next/no-img-element */
"use client";
import addDevice from "@/assets/icons/add-device-svgrepo-com 2.svg";
import React, { useEffect, useState } from "react";
import { MdAirplay } from "react-icons/md";
import { DropDownBtn } from "./DropDownBtn";
import { Airplay } from "lucide-react";
import { FiSliders } from "react-icons/fi";
import { RiSignalTowerLine } from "react-icons/ri";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("");

  const detectBrowser = () => {
    if (typeof window === "undefined") return "unknown";

    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("opera mini")) {
      return "Opera Mini";
    } else if (userAgent.includes("brave")) {
      return "Brave";
    } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
      return "Safari (iOS)";
    } else if (userAgent.includes("safari") && !userAgent.includes("chrome")) {
      return "Safari";
    } else if (userAgent.includes("tor browser")) {
      return "Tor Browser";
    } else if (userAgent.includes("chrome") && userAgent.includes("edg/")) {
      return "Edge";
    } else if (userAgent.includes("chrome") && !userAgent.includes("brave")) {
      return "Chrome";
    } else if (userAgent.includes("firefox")) {
      return "Firefox";
    } else if (userAgent.includes("opera") || userAgent.includes("opr/")) {
      return "Opera";
    } else {
      return "Unknown";
    }
  };

  const [browserName, setBrowserName] = useState<string>("");

  const requestDevices = async () => {
    if (navigator.bluetooth) {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ["battery_service"] }],
        });
        setDevices([device]);
        setConnectionStatus("Device selected: " + device.name);
      } catch (error) {
        console.error("Bluetooth device request failed:", error);
        setConnectionStatus("Failed to connect to device");
      }
    } else {
      console.error("Bluetooth API is not supported");
      setConnectionStatus("Bluetooth API is not supported");
    }
  };

  useEffect(() => {
    const name = detectBrowser();
    setBrowserName(name);
    requestDevices();
  }, []);
  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      const server = await device.gatt?.connect();
      if (server) {
        setConnectedDevice(device);
        setConnectionStatus("Connected to device: " + device.name);
      } else {
        setConnectionStatus("Failed to connect to GATT server");
      }
    } catch (error) {
      console.error("Connection to GATT server failed:", error);
      setConnectionStatus("Failed to connect to device");
    }
  };

  const airplayControls = (
    <div className="min-h-40 max-w-xs border-0 bg-[#DBDAD9]">
      <h3 className="text-2xl font-semibold mb-1 px-4 py-3">Select a device</h3>
      <div className="bg-black/10 h-px w-full" />
      {/* <button
        onClick={requestDevices}
        className="px-4 hover:text-black/70 transition text-base py-2"
      >
        Scan for devices
      </button> */}
      <div className="px-4 py-2 pt-4 space-y-2 font-semibold text-base">
        <div className="flex gap-2 items-center">
          <MdAirplay size={20} />
          Web player ({browserName})
        </div>
        {devices.length > 0 ? (
          <ul>
            {devices.map((device, index) => (
              <li
                key={index}
                className="py-2 cursor-pointer flex gap-2 items-center"
                onClick={() => connectToDevice(device)}
              >
                <RiSignalTowerLine />
                {device.name} {connectedDevice === device ? "(Connected)" : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>No devices found.</p>
        )}
      </div>
      <div className="px-4 py-2">
        {/* {connectionStatus} */}
        <h1 className="font-semibold">Don{`'`}t see your Device?</h1>
        <p className="font-normal text-sm text-gray-700">
          Please make sure the device is turned on and you are on the same WiFi
          network.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex gap-12">
      <div>
        <div
          onClick={() => handleOpenEqualizer()}
          className="cursor-pointer text-xl select-none text-white"
        >
          <FiSliders width={30} height={30} />
        </div>
      </div>
      <div>
        <DropDownBtn
          dropDownContent={airplayControls}
          buttonContent={
            <Airplay className="text-white  hover:text-accent transition" />
          }
        ></DropDownBtn>
      </div>
      <div>
        <img src={addDevice.src} alt="Add Device" />
      </div>
    </div>
  );
};

export default MusicControls;
