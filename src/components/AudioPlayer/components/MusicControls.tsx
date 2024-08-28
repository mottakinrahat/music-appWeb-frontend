/* eslint-disable @next/next/no-img-element */
import instantMix from "@/assets/icons/instant_mix.svg";
import airPlay from "@/assets/icons/airplay.svg";
import addDevice from "@/assets/icons/add-device-svgrepo-com 2.svg";
import React, { useState } from "react";
import { MdAirplay } from "react-icons/md";
import { DropDownBtn } from "./DropDownBtn";
import { Airplay } from "lucide-react";
import { FiSliders } from "react-icons/fi";

interface MusicControlsFace {
  handleOpenEqualizer: () => void;
}

const MusicControls = ({ handleOpenEqualizer }: MusicControlsFace) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] =
    useState<BluetoothDevice | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("");

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
    <div className="min-h-40 max-w-sm bg-white">
      <h3 className="text-2xl font-semibold mb-1 px-4 py-2">Select a device</h3>
      <hr />
      <button
        onClick={requestDevices}
        className="px-4 hover:text-black/70 py-2"
      >
        Scan for devices
      </button>
      <div className="px-4 py-2 font-semibold">
        {devices.length > 0 ? (
          <ul>
            {devices.map((device, index) => (
              <li
                key={index}
                className="py-2 cursor-pointer"
                onClick={() => connectToDevice(device)}
              >
                {device.name} {connectedDevice === device ? "(Connected)" : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>No devices found</p>
        )}
      </div>
      <div className="px-4 py-2">
        {/* {connectionStatus} */}
        <h1 className="font-semibold">Don{`'`}t see your Device?</h1>
        <p>
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
          buttonContent={<Airplay className="text-white" />}
        ></DropDownBtn>
      </div>
      <div>
        <img src={addDevice.src} alt="Add Device" />
      </div>
    </div>
  );
};

export default MusicControls;
