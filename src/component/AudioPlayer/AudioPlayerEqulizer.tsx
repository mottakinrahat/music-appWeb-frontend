import React, { useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  Dot,
} from "recharts";
import { Chart } from "../chart/Chart";

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

  const frequencies = [16, 160, 400, 1000, 2400, 15000];

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

  const data = frequencies.map((freq, index) => ({
    frequency: `${freq}Hz`,
    gain: gains[index],
  }));

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

  return (
    <div
      style={{ width: "400px", height: "300px" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ResponsiveContainer width="100%" height="100%">
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
            tick={{ fill: "black" }} // Customize tick values color
          />
          <YAxis domain={["auto", "auto"]} />
          <Line
            type="linear" // Use linear type for straight lines
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
      </ResponsiveContainer>
      <div style={{ marginTop: "20px" }}>
        <h3>Presets:</h3>
        <ul>
          {Object.keys(presets).map((preset) => (
            <li key={preset}>
              <button
                onClick={() => applyPreset(presets[preset as PresetKeys])}
              >
                {preset.charAt(0).toUpperCase() + preset.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Chart />
    </div>
  );
};

export default Equalizer;
