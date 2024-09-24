
"use client";

import { Chart } from "@/components/chart/Chart";
import { useAudio } from "@/lib/AudioProvider";
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
  const [gains, setGains] = useState<number[]>([]);
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

  // Load saved equalizer settings from localStorage
  useEffect(() => {
    const applyAudioProcessing = (audioElement: HTMLAudioElement) => {
      const volume = audioRef?.current?.getInternalPlayer()?.volume ?? 1;
      const playbackRate =
        audioRef?.current?.getInternalPlayer()?.playbackRate ?? 1;

      // Ensure volume and speed are set after equalizer processing
      audioElement.volume = volume;
      audioElement.playbackRate = playbackRate;
    };

    if (audioContext && audioRef?.current?.getInternalPlayer()) {
      const audioElement =
        audioRef.current.getInternalPlayer() as HTMLAudioElement;

      // Resume the audio context if suspended (Safari quirk)
      if (audioContext.state === "suspended") {
        audioContext.resume().catch((err) => {
          console.error("Failed to resume AudioContext:", err);
        });
      }

      // Handle CORS restrictions
      audioElement.crossOrigin = "anonymous";

      // Create or re-use the MediaElementSourceNode
      let audioSource = (audioElement as any)._sourceNode;
      if (!audioSource) {
        audioSource = audioContext.createMediaElementSource(audioElement);
        (audioElement as any)._sourceNode = audioSource;
      }

      // Disconnect existing filters
      gainNodesRef.current.forEach((filter) => filter.disconnect());

      // Create and connect new filters
      const filters = frequencies.map((frequency, index) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = frequency;
        filter.Q.value = 1;
        filter.gain.value = isOn ? gains[index] : 0;
        return filter;
      });

      // Chain filters and connect to destination
      filters
        .reduce((prev, current) => {
          prev.connect(current);
          return current;
        })
        .connect(audioContext.destination);

      audioSource.connect(filters[0]);

      // Store the filters for later use
      gainNodesRef.current = filters;

      // Apply volume and playback speed
      applyAudioProcessing(audioElement);

      // Cleanup on unmount
      return () => {
        filters.forEach((filter) => filter.disconnect());
        audioSource.disconnect();
      };
    }
  }, [audioContext, audioRef, isOn, gains, frequencies]);

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
  }, [presets]);

  useEffect(() => {
    if (!isOn) {
      setGains(presets.flat);
    }
  }, [isOn, presets]);

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
                    localStorage.setItem(
                      "eqSettings",
                      JSON.stringify({
                        gains: presets[preset as keyof typeof presets],
                        preset,
                      })
                    );
                  }
                }}
                key={index}
                className="flex cursor-pointer justify-between w-[8rem] items-center"
              >
                <button className="my-1 md:my-[6px]">
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </button>
                {selectedPreset === preset && (
                  <IoCheckmarkSharp className="text-accent" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-sm italic">Equalizer is off</div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayerEqualizer;
// import { Chart } from "@/components/chart/Chart";
// import { useAudio } from "@/lib/AudioProvider";
// import React, {
//   useRef,
//   useState,
//   useEffect,
//   useCallback,
//   useMemo,
// } from "react";
// import { IoCheckmarkSharp } from "react-icons/io5";
// import { XSound } from "xsound";
// import ReactPlayer from "react-player";

// // Define the props type for the component
// interface EqualizerProps {
//   audioRef: React.RefObject<ReactPlayer>;
// }

// // Main Equalizer component
// const AudioPlayerEqualizer: React.FC<EqualizerProps> = ({ audioRef }) => {
//   // References for gain nodes
//   const gainNodesRef = useRef<GainNode[]>([]);
//   const [gains, setGains] = useState<number[]>(Array(6).fill(0));
//   const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
//   const [isOn, setIsOn] = useState(false);
//   const { audioContext } = useAudio(); // Custom audio context from provider
//   const frequencyLabels: string[] = [
//     "60Hz",
//     "160Hz",
//     "400Hz",
//     "1kHz",
//     "2.4kHz",
//     "15kHz",
//   ];
//   const frequencies: number[] = useMemo(
//     () => [60, 160, 400, 1000, 2400, 15000],
//     []
//   );

//   // Define presets for the equalizer
//   const presets = useMemo(
//     () => ({
//       flat: [0, 0, 0, 0, 0, 0],
//       rock: [5, 3, 0, -3, -5, -7],
//       jazz: [0, 2, 5, 3, 0, -2],
//       dance: [4, 5, 2, -1, -2, -4],
//       deep: [6, 4, 2, 0, -2, -4],
//       electronic: [5, 4, 3, 1, -1, -3],
//       acoustic: [3, 2, 1, 0, 0, 2],
//       "bass booster": [7, 5, 3, 1, -1, -5],
//       classical: [2, 3, 4, 5, 6, 2],
//     }),
//     []
//   );

//   // Initialize media instance using XSound
//   const mediaInstance = useMemo(() => {
//     const instance: any = XSound("media");
//     if (instance) {
//       instance.setup({
//         media: audioRef?.current,
//         formats: ["mp3", "wav"],
//         autoplay: false,
//         listeners: {
//           play: (event: any) => console.log("Media is playing", event),
//           pause: (event: any) => console.log("Media is paused", event),
//         },
//       });
//     } else {
//       console.error("Failed to create XSound media instance");
//     }

//     return instance;
//   }, [audioRef]);

//   // Load settings from localStorage on mount
//   useEffect(() => {
//     const savedSettings = localStorage.getItem("eqSettings");
//     const savedIsEqOn = localStorage.getItem("isEqOn");

//     if (savedSettings) {
//       const { gains: savedGains, preset } = JSON.parse(savedSettings);
//       setGains(savedGains);
//       setSelectedPreset(preset);
//     } else {
//       setGains(presets.flat);
//       setSelectedPreset("flat");
//     }

//     setIsOn(savedIsEqOn === "true");
//   }, [presets]);

//   // Toggle equalizer on/off
//   const toggleSwitch = useCallback(() => {
//     setIsOn((prevIsOn) => {
//       const newIsOn = !prevIsOn;
//       localStorage.setItem("isEqOn", newIsOn.toString());
//       if (mediaInstance?.toggleEQ) {
//         mediaInstance.toggleEQ(newIsOn);
//       }
//       if (!newIsOn) {
//         setGains(presets.flat);
//         setSelectedPreset("flat");
//       }
//       return newIsOn;
//     });
//   }, [presets, mediaInstance]);

//   // Reset gains when equalizer is turned off
//   useEffect(() => {
//     if (!isOn) {
//       setGains(presets.flat);
//     }
//   }, [isOn, presets]);

//   // Apply equalizer effects
//   useEffect(() => {
//     const reapplyVolumeAndSpeed = (audioElement: HTMLAudioElement) => {
//       const volume = audioRef?.current?.getInternalPlayer()?.volume ?? 1;
//       const playbackRate =
//         audioRef?.current?.getInternalPlayer()?.playbackRate ?? 1;
//       audioElement.volume = volume;
//       audioElement.playbackRate = playbackRate;
//     };

//     if (audioContext && audioRef?.current?.getInternalPlayer()) {
//       const audioElement =
//         audioRef.current.getInternalPlayer() as HTMLAudioElement;

//       // Resume audio context if suspended
//       if (audioContext.state === "suspended") {
//         audioContext.resume();
//       }

//       let audioSource = (audioElement as any)._sourceNode;
//       if (!audioSource) {
//         audioSource = audioContext.createMediaElementSource(audioElement);
//         (audioElement as any)._sourceNode = audioSource;
//       }

//       gainNodesRef.current.forEach((filter) => filter.disconnect());

//       // Create filters for each frequency
//       const filters = frequencies.map((frequency, index) => {
//         const filter = audioContext.createBiquadFilter();
//         filter.type = "peaking";
//         filter.frequency.value = frequency;
//         filter.Q.value = 1;
//         filter.gain.value = isOn ? gains[index] : 0; // Apply gain based on equalizer state
//         return filter;
//       });

//       // Connect filters
//       filters
//         .reduce((prev, current) => {
//           prev.connect(current);
//           return current;
//         })
//         .connect(audioContext.destination);

//       audioSource.connect(filters[0]); // Connect audio source to the first filter
//       gainNodesRef.current = filters; // Save filters for cleanup

//       reapplyVolumeAndSpeed(audioElement);

//       return () => {
//         filters.forEach((filter) => filter.disconnect());
//         audioSource.disconnect(); // Clean up on unmount
//       };
//     }
//   }, [audioContext, audioRef, isOn, gains, frequencies]);

//   // Adjust gain for a specific frequency
//   const adjustGain = (index: number, value: number) => {
//     if (mediaInstance?.setParamEQ) {
//       mediaInstance.setParamEQ(frequencies[index], value);
//     }
//     setGains((prevGains) => {
//       const newGains = [...prevGains];
//       newGains[index] = value;
//       return newGains;
//     });
//   };

//   // Apply selected preset
//   const applyPreset = (preset: number[]) => {
//     preset.forEach((gain, index) => {
//       adjustGain(index, gain);
//     });
//   };

//   // Prepare data for visualization
//   const data = frequencies.map((freq, index) => ({
//     frequency: frequencyLabels[index],
//     gain: gains[index],
//   }));

//   return (
//     <div className="p-4 md:p-5 lg:p-10 bg-white relative z-[9999] overflow-auto w-[300px] md:w-[500px] sm:w-[400px]">
//       <h3 className="text-3xl font-semibold mb-5 md:mb-8">EQ Settings</h3>
//       <div
//         className={`transition-opacity duration-300 w-full ${
//           !isOn ? "opacity-40" : "opacity-100"
//         }`}
//       >
//         <Chart data={data} />
//       </div>
//       <div style={{ marginTop: "0px" }}>
//         <div className="flex justify-between">
//           <h3 className="font-semibold">Equalizer</h3>
//           <div
//             onClick={toggleSwitch}
//             className={`w-10 h-6 flex items-center rounded-full duration-300 p-1 cursor-pointer mb-4 md:mb-6 ${
//               isOn ? "bg-accent" : "bg-gray-300"
//             }`}
//           >
//             <div
//               className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
//                 isOn ? "translate-x-4" : ""
//               }`}
//             ></div>
//           </div>
//         </div>
//         {isOn ? (
//           <ul>
//             {Object.keys(presets).map((preset, index) => (
//               <li
//                 onClick={() => {
//                   if (isOn) {
//                     setSelectedPreset(preset);
//                     applyPreset(presets[preset as keyof typeof presets]);
//                     localStorage.setItem(
//                       "eqSettings",
//                       JSON.stringify({
//                         gains: presets[preset as keyof typeof presets],
//                         preset,
//                       })
//                     );
//                   }
//                 }}
//                 key={index}
//                 className="flex cursor-pointer justify-between w-[8rem] items-center"
//               >
//                 <button className="my-1 md:my-[6px]">
//                   {preset.charAt(0).toUpperCase() + preset.slice(1)}
//                 </button>
//                 <IoCheckmarkSharp
//                   className={`${
//                     selectedPreset === preset ? "opacity-100" : "opacity-0"
//                   } transition-opacity duration-200`}
//                 />
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-400">Equalizer is off</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioPlayerEqualizer;
