"use client";
import React, { useState, useEffect } from "react";
import { MdAirplay } from "react-icons/md";
import { RiSignalTowerLine } from "react-icons/ri";
import { DropDownBtn } from "./DropDownBtn";
import { Airplay } from "lucide-react";
import { usePathname } from "next/navigation";

// Define types for devices
interface BluetoothDeviceType extends BluetoothDevice {
  // Add additional properties if needed
}

interface WifiDeviceType {
  name: string;
  // Add additional properties if needed
}

const AirPlayButton = () => {
  const [bluetoothDevices, setBluetoothDevices] = useState<
    BluetoothDeviceType[]
  >([]);
  const [connectedBluetoothDevice, setConnectedBluetoothDevice] =
    useState<BluetoothDeviceType | null>(null);
  const [wifiDevices, setWifiDevices] = useState<WifiDeviceType[]>([]);
  const [connectedWifiDevice, setConnectedWifiDevice] =
    useState<WifiDeviceType | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("");
  const [browserName, setBrowserName] = useState<string>("");

  const pathname = usePathname();
  const [showPlayer, setShowPlayer] = useState(true);

  useEffect(() => {
    // Show the player only if the path matches `/music/:id`
    if (pathname.startsWith("/music/")) {
      setShowPlayer(true);
    } else {
      setShowPlayer(false);
    }
  }, [pathname]);

  useEffect(() => {
    const name = detectBrowser();
    setBrowserName(name);
  }, []);

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

  const requestBluetoothDevices = async () => {
    if (navigator.bluetooth) {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ["battery_service"] }],
        });
        setBluetoothDevices([device as BluetoothDeviceType]);
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

  const connectToBluetoothDevice = async (device: BluetoothDeviceType) => {
    try {
      const server = await device.gatt?.connect();
      if (server) {
        setConnectedBluetoothDevice(device);
        setConnectionStatus("Connected to device: " + device.name);
      } else {
        setConnectionStatus("Failed to connect to GATT server");
      }
    } catch (error) {
      console.error("Connection to GATT server failed:", error);
      setConnectionStatus("Failed to connect to device");
    }
  };

  // Placeholder function for WiFi device discovery
  const discoverWifiDevices = async () => {
    try {
      // Replace with actual WiFi discovery logic
      const devices: WifiDeviceType[] = []; // Replace with actual WiFi device data
      setWifiDevices(devices);
      setConnectionStatus("WiFi devices discovered");
    } catch (error) {
      console.error("WiFi device discovery failed:", error);
      setConnectionStatus("Failed to discover WiFi devices");
    }
  };

  const connectToWifiDevice = async (device: WifiDeviceType) => {
    try {
      // Replace with actual WiFi connection logic
      setConnectedWifiDevice(device);
      setConnectionStatus("Connected to WiFi device: " + device.name);
    } catch (error) {
      console.error("Connection to WiFi device failed:", error);
      setConnectionStatus("Failed to connect to WiFi device");
    }
  };

  const handleScan = async () => {
    // console.log("Scanning for devices...");
    await requestBluetoothDevices();
    await discoverWifiDevices();
    // console.log("scanning");
  };

  const airplayControls = (
    <div className="min-h-40 max-w-xs border-0 bg-[#DBDAD9]">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold mb-1 px-4 py-3">
          Select a device
        </h3>
        <p className="text-lg mr-2 cursor-pointer">Scan</p>
      </div>
      <div className="bg-black/10 h-px w-full" />
      <div className="px-4 py-2 pt-4 space-y-2 font-semibold text-base">
        <div className="flex gap-2 items-center">
          <MdAirplay size={20} />
          Web player ({browserName})
        </div>
        {bluetoothDevices.length > 0 ? (
          <div>
            <h4 className="font-semibold">Bluetooth Devices</h4>
            <ul>
              {bluetoothDevices.map((device, index) => (
                <li
                  key={index}
                  className="py-2 cursor-pointer flex gap-2 items-center"
                  onClick={() => connectToBluetoothDevice(device)}
                >
                  <RiSignalTowerLine />
                  {device.name}{" "}
                  {connectedBluetoothDevice === device ? "(Connected)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No devices found.</p>
        )}
        {wifiDevices.length > 0 ? (
          <div>
            <ul>
              {wifiDevices.map((device, index) => (
                <li
                  key={index}
                  className="py-2 cursor-pointer flex gap-2 items-center"
                  onClick={() => connectToWifiDevice(device)}
                >
                  <RiSignalTowerLine />
                  {device.name}{" "}
                  {connectedWifiDevice === device ? "(Connected)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="px-4 py-2">
        <h1 className="font-semibold">Don{`'`}t see your Device?</h1>
        <p className="font-normal text-sm text-gray-700">
          Please make sure the device is turned on and you are on the same
          network.
        </p>
      </div>
    </div>
  );

  return (
    <div onClick={handleScan}>
      <DropDownBtn
        dropDownContent={airplayControls}
        buttonContent={
          <Airplay
            className={`${
              showPlayer
                ? "text-white hover:text-accent"
                : "text-textPrimary hover:text-textSecondary transition"
            } my-auto inline-block transition`}
          />
        }
      />
    </div>
  );
};

export default AirPlayButton;
