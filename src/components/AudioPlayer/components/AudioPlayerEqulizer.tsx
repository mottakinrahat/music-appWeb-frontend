// /* eslint-disable react-hooks/exhaustive-deps */
// "use client";

// import { Chart } from "@/components/chart/Chart";
// import { useAudio } from "@/lib/AudioProvider";
// import React, { useRef, useState, useEffect } from "react";
// import { IoCheckmarkSharp } from "react-icons/io5";

// interface EqualizerProps {
//   audioContext: AudioContext | null;
//   audioElement: HTMLAudioElement | null;
// }

// const AudioPlayerEqualizer: React.FC<EqualizerProps> = ({
//   // audioContext,
//   audioElement,
// }) => {
//   const gainNodesRef = useRef<GainNode[]>([]);
//   const [gains, setGains] = useState<number[]>([]);
//   const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
//   const [isOn, setIsOn] = useState(false);
//   const { audioContext } = useAudio();

//   // Frequencies for the equalizer
//   const frequencyLabels = [`60Hz`, "160Hz", "400Hz", "1kHz", "2.4kHz", "15kHz"];
//   const frequencies = [60, 160, 400, 1000, 2400, 15000];

//   // Default preset
//   const defaultPreset = "flat";

//   useEffect(() => {
//     // Load the EQ state from localStorage on component mount
//     const savedSettings = localStorage.getItem("eqSettings");
//     const savedIsEqOn = localStorage.getItem("isEqOn");

//     if (savedSettings) {
//       const { gains: savedGains, preset } = JSON.parse(savedSettings);
//       setGains(savedGains);
//       setSelectedPreset(preset);
//     } else {
//       // Apply default preset if no saved settings
//       const defaultGains = presets[defaultPreset];
//       setGains(defaultGains);
//       setSelectedPreset(defaultPreset);
//     }

//     setIsOn(savedIsEqOn === "true");
//   }, []);

//   useEffect(() => {
//     if (!isOn) {
//       // Instantly reset to "flat" preset when EQ is off
//       const flatGains = presets[defaultPreset];
//       setGains(flatGains);
//       applyPreset(flatGains);
//       setSelectedPreset(defaultPreset);
//     }
//   }, [isOn]);

//   const toggleSwitch = () => {
//     setIsOn((prevIsOn) => {
//       const newIsOn = !prevIsOn;
//       localStorage.setItem("isEqOn", newIsOn.toString());

//       if (newIsOn) {
//         // If turning EQ on, restore the last used preset or default
//         const savedSettings = localStorage.getItem("eqSettings");
//         if (savedSettings) {
//           const { gains: savedGains, preset } = JSON.parse(savedSettings);
//           setGains(savedGains);
//           setSelectedPreset(preset);
//           applyPreset(savedGains);
//         } else {
//           // Apply default preset if no saved settings
//           const defaultGains = presets[defaultPreset];
//           setGains(defaultGains);
//           setSelectedPreset(defaultPreset);
//           applyPreset(defaultGains);
//         }
//       } else {
//         // If turning EQ off, reset to "flat"
//         const flatGains = presets[defaultPreset];
//         setGains(flatGains);
//         applyPreset(flatGains);
//         setSelectedPreset(defaultPreset);
//       }

//       return newIsOn;
//     });
//   };

//   const { musicSource } = useAudio();

//   useEffect(() => {
//     if (audioContext && audioElement) {
//       // // Clean up existing filters if any
//       // gainNodesRef.current.forEach((filter) => filter.disconnect());

//       let audioSource = (audioElement as any)._sourceNode;

//       // if (!audioSource) {
//       //   audioSource = audioContext.createMediaElementSource(audioElement);
//       //   (audioElement as any)._sourceNode = audioSource;
//       // }

//       if (!audioSource) {
//         audioSource = musicSource;
//         (audioElement as any)._sourceNode = audioSource;
//       }

//       const filters = frequencies.map((frequency) => {
//         const filter = audioContext.createBiquadFilter();
//         filter.type = "peaking";
//         filter.frequency.value = frequency;
//         filter.Q.value = 1;
//         filter.gain.value = isOn ? gains[frequencies.indexOf(frequency)] : 0;
//         return filter;
//       });

//       filters.reduce((prev, current) => {
//         prev.connect(current);
//         return current;
//       });

//       filters[filters.length - 1].connect(audioContext.destination);
//       audioSource.connect(filters[0]);

//       // Update the reference to the new filters
//       gainNodesRef.current = filters;

//       // Clean up function for this effect
//       return () => {
//         filters.forEach((filter) => filter.disconnect());
//         if (audioSource) {
//           audioSource.disconnect();
//         }
//       };
//     }
//   }, [audioContext, audioElement, frequencies, isOn, gains]);

//   const adjustGain = (index: number, value: number) => {
//     if (gainNodesRef.current[index]) {
//       gainNodesRef.current[index].gain.value = value;
//     }
//     setGains((prevGains) => {
//       const newGains = [...prevGains];
//       newGains[index] = value;
//       return newGains;
//     });
//   };

//   const applyPreset = (preset: number[]) => {
//     preset.forEach((gain, index) => {
//       adjustGain(index, gain);
//     });
//   };

//   type PresetKeys =
//     | "flat"
//     | "rock"
//     | "jazz"
//     | "dance"
//     | "deep"
//     | "electronic"
//     | "acoustic"
//     | "bass booster"
//     | "classical";

//   const presets: Record<PresetKeys, number[]> = {
//     flat: [0, 0, 0, 0, 0, 0],
//     rock: [5, 3, 0, -3, -5, -7],
//     jazz: [0, 2, 5, 3, 0, -2],
//     dance: [4, 5, 2, -1, -2, -4],
//     deep: [6, 4, 2, 0, -2, -4],
//     electronic: [5, 4, 3, 1, -1, -3],
//     acoustic: [3, 2, 1, 0, 0, 2],
//     "bass booster": [7, 5, 3, 1, -1, -5],
//     classical: [2, 3, 4, 5, 6, 2],
//   };

//   const data = frequencies.map((freq, index) => ({
//     frequency: frequencyLabels[index],
//     gain: gains[index],
//   }));

//   return (
//     <div className="p-4 md:p-5 lg:p-10 bg-white relative z-[9999] overflow-auto w-[300]  md:w-[500px] sm:w-[400px]">
//       <h3 className="text-3xl font-semibold mb-5 md:mb-8">EQ Settings</h3>
//       <div
//         className={`transition-opacity duration-300 w-full ${
//           !isOn ? "opacity-40 " : "opacity-100"
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
//                     applyPreset(presets[preset as PresetKeys]);
//                     localStorage.setItem(
//                       "eqSettings",
//                       JSON.stringify({
//                         gains: presets[preset as PresetKeys],
//                         preset: preset,
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
//                 {selectedPreset === preset && (
//                   <div>
//                     <IoCheckmarkSharp className="text-accent" />
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <ul>
//             {Object.keys(presets).map((preset, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between w-[8rem] items-center opacity-70"
//               >
//                 <button className="my-1 md:my-[6px]" disabled>
//                   {preset.charAt(0).toUpperCase() + preset.slice(1)}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AudioPlayerEqualizer;
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Chart } from "@/components/chart/Chart";
import { useAudio } from "@/lib/AudioProvider";
import React, { useRef, useState, useEffect } from "react";
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
  const { audioContext } = useAudio(); // Assuming audioContext is provided by the AudioProvider

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
    if (!isOn) {
      // Instantly reset to "flat" preset when EQ is off
      const flatGains = presets[defaultPreset];
      setGains(flatGains);
      applyPreset(flatGains);
      setSelectedPreset(defaultPreset);
    }
  }, [isOn]);

  const toggleSwitch = () => {
    setIsOn((prevIsOn) => {
      const newIsOn = !prevIsOn;
      localStorage.setItem("isEqOn", newIsOn.toString());

      if (newIsOn) {
        // If turning EQ on, restore the last used preset or default
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
      } else {
        // If turning EQ off, reset to "flat"
        const flatGains = presets[defaultPreset];
        setGains(flatGains);
        applyPreset(flatGains);
        setSelectedPreset(defaultPreset);
      }

      return newIsOn;
    });
  };

  useEffect(() => {
    if (
      audioContext &&
      audioRef?.current &&
      audioRef?.current.getInternalPlayer()
    ) {
      const audioElement =
        audioRef.current.getInternalPlayer() as HTMLAudioElement;

      if (audioElement) {
        let audioSource = (audioElement as any)._sourceNode;

        if (!audioSource) {
          audioSource = audioContext.createMediaElementSource(audioElement);
          (audioElement as any)._sourceNode = audioSource;
        }

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

        return () => {
          filters.forEach((filter) => filter.disconnect());
          if (audioSource) {
            audioSource.disconnect();
          }
        };
      }
    }
  }, [audioContext, audioRef, frequencies, isOn, gains]);

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
    | "flat"
    | "rock"
    | "jazz"
    | "dance"
    | "deep"
    | "electronic"
    | "acoustic"
    | "bass booster"
    | "classical";

  const presets: Record<PresetKeys, number[]> = {
    flat: [0, 0, 0, 0, 0, 0],
    rock: [5, 3, 0, -3, -5, -7],
    jazz: [0, 2, 5, 3, 0, -2],
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
                    applyPreset(presets[preset as PresetKeys]);
                    localStorage.setItem(
                      "eqSettings",
                      JSON.stringify({
                        gains: presets[preset as PresetKeys],
                        preset: preset,
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
                  <div className="bg-accent w-6 h-6 text-white flex items-center justify-center rounded-full">
                    <IoCheckmarkSharp size={12} />
                  </div>
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
