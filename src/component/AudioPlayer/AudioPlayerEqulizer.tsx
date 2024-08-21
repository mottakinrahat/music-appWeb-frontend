"use client";
import React, { useRef, useState } from "react";

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div>
      <div>
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
      <div>
        {frequencies.map((frequency, index) => (
          <div key={frequency}>
            <label>{frequency}Hz: </label>
            <input
              type="range"
              min="-40"
              max="40"
              value={gains[index]}
              onChange={(e) => adjustGain(index, parseFloat(e.target.value))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equalizer;
