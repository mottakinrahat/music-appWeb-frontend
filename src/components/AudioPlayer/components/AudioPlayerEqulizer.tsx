import { Chart } from "@/components/chart/Chart";
import { useAudio } from "@/lib/AudioProvider";
import { isSafari } from "@/utils/checkSarari";
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { IoCheckmarkSharp } from "react-icons/io5";
import ReactPlayer from "react-player";

interface EqualizerProps {
  audioRef: React.RefObject<ReactPlayer>;
}

const AudioPlayerEqualizer: React.FC<EqualizerProps> = ({ audioRef }) => {
  const gainNodesRef = useRef<GainNode[]>([]);
  const masterGainRef = useRef<GainNode | null>(null); // Master gain node reference
  const [gains, setGains] = useState<number[]>(Array(6).fill(0));
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [isOn, setIsOn] = useState(false);
  const { audioContext } = useAudio();
  const frequencyLabels = ["60Hz", "160Hz", "400Hz", "1kHz", "2.4kHz", "15kHz"];
  const frequencies = useMemo(() => [60, 160, 400, 1000, 2400, 15000], []);

 
  // Presets for the equalizer
  const presets = useMemo(
    () => ({
      flat: [0, 0, 0, 0, 0, 0],
      rock: [5, 3, 0, -3, -5, -7],
      jazz: [0, 2, 5, 3, 0, -2],
      dance: [4, 5, 2, -1, -2, -4],
      deep: [6, 4, 2, 0, -2, -4],
      electronic: [5, 4, 3, 1, -1, -3],
      acoustic: [3, 2, 1, 0, 0, 2],
      "bass booster": [7, 5, 3, 1, -1, -5],
      classical: [2, 3, 4, 5, 6, 2],
    }),
    []
  );

  

  useEffect(() => {
    // Function to apply volume and playback rate settings
    const applyAudioProcessing = (audioElement: HTMLAudioElement) => {
      const volume = audioRef?.current?.getInternalPlayer()?.volume ?? 1;
      const playbackRate =
        audioRef?.current?.getInternalPlayer()?.playbackRate ?? 1;

      // Set the audio element's volume and playback rate
      audioElement.volume = volume;
      audioElement.playbackRate = playbackRate;
    };

    if (audioContext && audioRef?.current?.getInternalPlayer()) {
      const audioElement =
        audioRef.current.getInternalPlayer() as HTMLAudioElement;

      // Resume the audio context if it is suspended (necessary for Safari)
      if (audioContext.state === "suspended") {
        audioContext.resume().catch((err) => {
          console.error("Failed to resume AudioContext:", err);
        });
      }

      // Create or reuse the MediaElementSourceNode
      let audioSource = (audioElement as any)._sourceNode;
      if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audioElement);
        (audioElement as any)._sourceNode = audioSource; // Store for later use
      }

      // Disconnect existing filters and master gain node to prevent feedback
      gainNodesRef.current.forEach((filter) => filter.disconnect());
      masterGainRef.current?.disconnect();

      // Create and connect new filters
      const filters = frequencies.map((frequency, index) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = frequency;
        filter.Q.value = 1;
        filter.gain.value = isOn ? gains[index] : 0; // Set gain based on equalizer state
        return filter;
      });

      // Create master gain node
      const masterGain = audioContext.createGain();
      masterGain.gain.value = isOn ? 0.8 : 1; // Reduce volume when equalizer is on
      masterGainRef.current = masterGain;

      // Connect the filters in series to the master gain node
      filters
        .reduce((prev, current) => {
          prev.connect(current);
          return current;
        })
        .connect(masterGain)
        .connect(audioContext.destination);

      audioSource.connect(filters[0]); // Connect audio source to the first filter

      // Store the filters for cleanup
      gainNodesRef.current = filters;

      // Apply volume and playback speed settings
      applyAudioProcessing(audioElement);

      // Cleanup on component unmount
      return () => {
        filters.forEach((filter) => filter.disconnect());
        audioSource.disconnect(); // Disconnect the audio source
        masterGain.disconnect(); // Disconnect master gain node
      };
    }
  }, [audioContext, audioRef, isOn, gains, frequencies]);

    const isSafariBrowser = isSafari();
  // Toggle the equalizer on or off
  const toggleSwitch = useCallback(() => {

      setIsOn((prevIsOn) => {
        const newIsOn = !prevIsOn;
        localStorage.setItem("isEqOn", newIsOn.toString());
        if (!newIsOn) {
          setGains(presets.flat);
          setSelectedPreset("flat");
        }
        return newIsOn;
      });
  
  }, [presets.flat]);

  // Reset gains when equalizer is turned off
  useEffect(() => {
    if (!isOn) {
      setGains(presets.flat); // Reset gains to flat preset
    }
  }, [isOn, presets]);

  // Adjust gain for a specific frequency band
  const adjustGain = (index: number, value: number) => {
    if (gainNodesRef.current[index]) {
      gainNodesRef.current[index].gain.value = value; // Adjust gain for the filter
    }
    setGains((prevGains) => {
      const newGains = [...prevGains];
      newGains[index] = value; // Update the gains state
      return newGains;
    });
  };

  // Apply selected preset
  const applyPreset = (preset: number[]) => {
    preset.forEach((gain, index) => {
      adjustGain(index, gain); // Adjust gains based on selected preset
    });
  };

  // Prepare data for visualization
  const data = frequencies.map((freq, index) => ({
    frequency: frequencyLabels[index],
    gain: gains[index],
  }));

  return (
    <div className="p-4 md:p-5 lg:p-10 bg-white relative z-[9999] overflow-auto w-[300] md:w-[500px] sm:w-[400px]">
    
      <h3 className="text-3xl font-semibold mb-5 md:mb-8">EQ Settings</h3>
      <div
        className={`transition-opacity duration-300 w-full ${
          !isOn ? "opacity-40" : "opacity-100"
        }`}
      >
        <Chart data={data} />
      </div>
      <div style={{ marginTop: "0px" }}>
        <div className="flex justify-between">
          <h3 className="font-semibold">Equalizer</h3>
          <div
            onClick={toggleSwitch}
            className={`w-10 h-6 flex items-center rounded-full duration-300 p-1 cursor-pointer mb-4 md:mb-6 ${
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
                  if (isOn) {
                    setSelectedPreset(preset);
                    applyPreset(presets[preset as keyof typeof presets]);
                    localStorage.setItem("eqPreset", preset);
                  }
                }}
                key={index}
                className={`transition duration-300 ease-in-out ${
                  selectedPreset === preset
                    ? "text-accent font-bold"
                    : "text-gray-600"
                } flex items-center justify-between my-2 cursor-pointer`}
              >
                <span className="capitalize">{preset}</span>
                {selectedPreset === preset && <IoCheckmarkSharp />}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-sm italic">
            {!isSafariBrowser
              ? "Safari doesn't support this feature"
              : "Equalizer is off"}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayerEqualizer;
