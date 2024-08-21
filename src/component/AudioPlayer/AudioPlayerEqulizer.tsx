"use client";
import React, { useRef, useState } from "react";

import { Chart } from "../chart/Chart";
import { IoCheckmarkSharp } from "react-icons/io5";

interface EqualizerProps {
  audioContext: AudioContext | null;
  audioElement: HTMLAudioElement | null;
}

const Equalizer: React.FC<EqualizerProps> = ({
  audioContext,
  audioElement,
}) => {
  const gainNodesRef = useRef<GainNode[]>([]);
  const [gains, setGains] = useState([0, 0, 0, 0, 0, 0]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const frequencies = [16, 160, 400, 1000, 2400, 15000];
  // EQ toggle
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  React.useEffect(() => {
    if (audioContext && audioElement && gainNodesRef.current.length === 0) {
      const audioSource = audioContext.createMediaElementSource(audioElement);

      const filters = frequencies.map((frequency) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = frequency;
        filter.Q.value = 1;
        filter.gain.value = 0;
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
  }, [audioContext, audioElement, frequencies]);

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
  const frequencyData = ["16Hz", "160Hz", "400Hz", "1kHz", "2.4kHz", "15kHz"];
  const data = frequencies.map((freq, index) => ({
    frequency: `${frequencyData[index]}`,
    gain: gains[index],
  }));

  // console.log("presets", presets);

  const handleMouseDown = (index: number) => {
    setDraggingIndex(index);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (draggingIndex !== null) {
      const chartRect = event.currentTarget.getBoundingClientRect();
      const yOffset = event.clientY - chartRect.top;
      const newValue = Math.round((200 - yOffset) / 4) - 20; // Adjust range as needed
      adjustGain(draggingIndex, newValue);
    }
  };

  const handleMouseUp = () => {
    setDraggingIndex(null);
  };
  // console.log(data);

  return (
    <div
      className="p-10 w-[400px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h3 className="text-3xl font-semibold mb-8">EQ Settings</h3>
      <div
        className={`transition-opacity duration-300 ${
          !isOn ? "opacity-40 " : "opacity-100"
        }`}
      >
        <Chart data={data} />
      </div>

      {/* <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="1 0"
            vertical={true}
            horizontal={false} // Ensure only horizontal lines are drawn
          />
          <XAxis
            dataKey="frequency"
            axisLine={false} // Hide the axis line
            tickLine={false} // Hide the tick lines
            tick={{ fill: "black" }} // Customize tick values color (if needed)
          />

          <Line
            type="monotone"
            dataKey="gain"
            stroke="#00CCD0"
            strokeWidth={2}
            dot={<Dot r={6} fill="#00CCD0" stroke="#00CCD0" strokeWidth={2} />}
            connectNulls
          />
          <Scatter
            data={data}
            fill="#00CCD0"
            shape={
              <Dot r={6} fill="#00CCD0" stroke="#00CCD0" strokeWidth={2} />
            }
            onMouseDown={(e, index) => handleMouseDown(index)}
          />
        </LineChart>
      </ResponsiveContainer> */}
      <div style={{ marginTop: "20px" }}>
        <div className="flex justify-between">
          <h3 className="font-semibold">Equlizer</h3>
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
            {Object.keys(presets).map((preset, index) => {
              // console.log(preset);
              return (
                <li
                  onClick={() => setSelectedPreset(preset)}
                  key={index}
                  className="flex cursor-pointer justify-between w-[8rem] items-center"
                >
                  <button
                    className="my-1"
                    onClick={() => applyPreset(presets[preset as PresetKeys])}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </button>
                  {selectedPreset === preset && (
                    <div>
                      <IoCheckmarkSharp className="text-accent" />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul>
            {Object.keys(presets).map((preset, index) => {
              // console.log(preset);
              return (
                <li
                  key={index}
                  className="flex justify-between w-[8rem] items-center opacity-70"
                >
                  <button className="my-1" disabled={true}>
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </button>
                  {selectedPreset === preset && (
                    <div>
                      <IoCheckmarkSharp className="text-accent" />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Equalizer;
