/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Chart } from "@/components/chart/Chart";
import React, { useRef, useState, useEffect } from "react";
import { IoCheckmarkSharp } from "react-icons/io5";

interface EqualizerProps {
  audioContext: AudioContext | null;
  audioElement: HTMLAudioElement | null;
}

const AudioPlayerEqualizer: React.FC<EqualizerProps> = ({
  audioContext,
  audioElement,
}) => {
  const gainNodesRef = useRef<GainNode[]>([]);
  const [gains, setGains] = useState<number[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isOn, setIsOn] = useState(false);

  // Frequencies for the equalizer
  const frequencyLabels = [`60Hz`, "160Hz", "400Hz", "1kHz", "2.4kHz", "15kHz"];
  const frequencies = [60, 160, 400, 1000, 2400, 15000];

  // Default preset
  const defaultPreset = "flat";

  useEffect(() => {
    // Load the EQ state from localStorage on component mount
    const savedSettings = localStorage.getItem("eqSettings");
    const savedIsEqOn = localStorage.getItem("isEqOn");

    if (savedSettings) {
      const { gains: savedGains, preset } = JSON.parse(savedSettings);
      setGains(savedGains);
      setSelectedPreset(preset);
    } else {
      // Apply default preset if no saved settings
      const defaultGains = presets[defaultPreset];
      setGains(defaultGains);
      setSelectedPreset(defaultPreset);
    }

    setIsOn(savedIsEqOn === "true");
  }, []);

  useEffect(() => {
    const eq = localStorage.getItem("isEqOn");
    if (!eq) {
      localStorage.setItem("isEqOn", JSON.stringify(!isOn));
    }
    if (eq) {
      setIsOn(eq === "true" ? true : false);
    }
  }, [isOn]);

  const toggleSwitch = () => {
    localStorage.setItem("isEqOn", (!isOn).toString());
    if (isOn) {
      // If turning EQ off
      localStorage.setItem(
        "eqSettings",
        JSON.stringify({
          gains,
          preset: selectedPreset,
        })
      );
      setSelectedPreset(null);
      setGains([0, 0, 0, 0, 0, 0]);
    } else {
      // If turning EQ on
      const savedSettings = localStorage.getItem("eqSettings");
      if (savedSettings) {
        const { gains: savedGains, preset } = JSON.parse(savedSettings);
        setGains(savedGains);
        setSelectedPreset(preset);
        applyPreset(savedGains);
      } else {
        // Apply default preset if no saved settings
        const defaultGains = presets[defaultPreset];
        setGains(defaultGains);
        setSelectedPreset(defaultPreset);
        applyPreset(defaultGains);
      }
    }
    setIsOn((prevIsOn) => !prevIsOn);
  };

  useEffect(() => {
    if (audioContext && audioElement && gainNodesRef.current.length === 0) {
      const audioSource = audioContext.createMediaElementSource(audioElement);

      const filters = frequencies.map((frequency) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = frequency;
        filter.Q.value = 1;
        filter.gain.value = isOn ? gains[frequencies.indexOf(frequency)] : 0;
        return filter;
      });

      filters.reduce((prev, current) => {
        prev.connect(current);
        return current;
      });

      filters[filters.length - 1].connect(audioContext.destination);
      audioSource.connect(filters[0]);

      gainNodesRef.current = filters;
    }
  }, [audioContext, audioElement, frequencies, isOn, gains]);

  const adjustGain = (index: number, value: number) => {
    if (gainNodesRef.current[index]) {
      gainNodesRef.current[index].gain.value = value;
    }
    setGains((prevGains) => {
      const newGains = [...prevGains];
      newGains[index] = value;
      return newGains;
    });
  };

  const applyPreset = (preset: number[]) => {
    preset.forEach((gain, index) => {
      adjustGain(index, gain);
    });
  };

  type PresetKeys =
    | "rock"
    | "jazz"
    | "flat"
    | "dance"
    | "deep"
    | "electronic"
    | "acoustic"
    | "bass booster"
    | "classical";

  const presets: Record<PresetKeys, number[]> = {
    rock: [5, 3, 0, -3, -5, -7],
    jazz: [0, 2, 5, 3, 0, -2],
    flat: [0, 0, 0, 0, 0, 0],
    dance: [4, 5, 2, -1, -2, -4],
    deep: [6, 4, 2, 0, -2, -4],
    electronic: [5, 4, 3, 1, -1, -3],
    acoustic: [3, 2, 1, 0, 0, 2],
    "bass booster": [7, 5, 3, 1, -1, -5],
    classical: [2, 3, 4, 5, 6, 2],
  };

  const data = frequencies.map((freq, index) => ({
    frequency: frequencyLabels[index],
    gain: gains[index],
  }));

  return (
    <div className="p-10 bg-white z-[9999] overflow-auto  md:w-[500px] w-[400px]">
      <h3 className="text-3xl font-semibold mb-8">EQ Settings</h3>
      <div
        className={`transition-opacity duration-300 w-full ${
          !isOn ? "opacity-40 " : "opacity-100"
        }`}
      >
        <Chart data={data} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <div className="flex justify-between">
          <h3 className="font-semibold">Equalizer</h3>
          <div
            onClick={toggleSwitch}
            className={`w-10 h-6 flex items-center rounded-full duration-300 p-1 cursor-pointer ${
              isOn ? "bg-accent" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                isOn ? "translate-x-4" : ""
              }`}
            ></div>
          </div>
        </div>
        {isOn ? (
          <ul>
            {Object.keys(presets).map((preset, index) => (
              <li
                onClick={() => {
                  setSelectedPreset(preset);
                  applyPreset(presets[preset as PresetKeys]);
                  localStorage.setItem(
                    "eqSettings",
                    JSON.stringify({
                      gains: presets[preset as PresetKeys],
                      preset: preset,
                    })
                  );
                }}
                key={index}
                className="flex cursor-pointer justify-between w-[8rem] items-center"
              >
                <button className="my-1">
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </button>
                {selectedPreset === preset && (
                  <div>
                    <IoCheckmarkSharp className="text-accent" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {Object.keys(presets).map((preset, index) => (
              <li
                key={index}
                className="flex justify-between w-[8rem] items-center opacity-70"
              >
                <button className="my-1" disabled>
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </button>
                {selectedPreset === preset && (
                  <div>
                    <IoCheckmarkSharp className="text-accent" />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AudioPlayerEqualizer;
