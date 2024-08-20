"use-client";
import React, { useState, useEffect } from "react";

interface EqualizerProps {
  audioContext: AudioContext;
  audioElement: HTMLAudioElement;
}

const frequencies = [60, 160, 400, 1000, 2400, 15000];

const Equalizer: React.FC<EqualizerProps> = ({
  audioContext,
  audioElement,
}) => {
  const [filters, setFilters] = useState<BiquadFilterNode[]>([]);

  useEffect(() => {
    // Create filters for each frequency
    const createdFilters = frequencies.map((frequency) => {
      const filter = audioContext.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = frequency;
      filter.gain.value = 0; // Default gain is 0
      return filter;
    });

    // Connect filters in series
    createdFilters.reduce((prev, curr) => {
      prev.connect(curr);
      return curr;
    });

    // Connect the last filter to the destination (speakers)
    createdFilters[createdFilters.length - 1].connect(audioContext.destination);

    // Connect the audio element to the first filter
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(createdFilters[0]);

    // Save filters to state
    setFilters(createdFilters);

    // Cleanup on component unmount
    return () => {
      createdFilters.forEach((filter) => filter.disconnect());
      source.disconnect();
    };
  }, [audioContext, audioElement]);

  const handleChange = (index: number, value: number) => {
    const newFilters = [...filters];
    newFilters[index].gain.value = value;
    setFilters(newFilters);
  };

  return (
    <div className="equalizer">
      {frequencies.map((frequency, index) => (
        <div key={frequency} className="equalizer-band">
          <label htmlFor={`eq-${frequency}`}>{frequency}Hz</label>
          <input
            id={`eq-${frequency}`}
            type="range"
            min="-30"
            max="30"
            step="1"
            value={filters[index]?.gain.value || 0}
            onChange={(e) => handleChange(index, parseFloat(e.target.value))}
          />
        </div>
      ))}
    </div>
  );
};

export default Equalizer;
