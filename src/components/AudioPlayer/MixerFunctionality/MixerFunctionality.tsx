import Mixer from "@/components/svg/Mixer";
import { VolumeRangeMixer } from "@/components/ui/slider";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MixerFunctionality = () => {
  const [showModal, setShowModal] = useState(false);

  // State to control volume for each track
  const [guidVocalVolume, setGuidVocalVolume] = useState(55);
  const [vocalVolume, setVocalVolume] = useState(40); // Mic input (gain control)
  const [instrumentalVolume, setInstrumentalVolume] = useState(70);

  const isRecording = useSelector(
    (state: RootState) => state.karaoke.isRecording
  );
  const recordedUrl = useSelector(
    (state: RootState) => state.karaoke.recordedUrl
  );

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let gainNode: GainNode | null = null;
    let micSource: MediaStreamAudioSourceNode | null = null;

    // Function to adjust microphone gain
    const adjustMicGain = async () => {
      try {
        audioContext = new (window.AudioContext || window.AudioContext)();
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        micSource = audioContext.createMediaStreamSource(stream);
        gainNode = audioContext.createGain();
        gainNode.gain.value = vocalVolume / 100; // Adjust gain based on slider

        micSource.connect(gainNode).connect(audioContext.destination);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    if (isRecording) {
      // Adjust Guide Vocal Volume
      const guideVocalElement = document.getElementById(
        "guide-vocal-track"
      ) as HTMLAudioElement | null;
      if (guideVocalElement) {
        if (guidVocalVolume === 0) {
          guideVocalElement.muted = true; // Mute when volume is 0
        } else {
          guideVocalElement.muted = false; // Unmute when volume is greater than 0
          guideVocalElement.volume = guidVocalVolume / 100;
        }
      }

      // Adjust Instrumental Volume
      const instrumentalElement = document.getElementById(
        "instrumental-track"
      ) as HTMLAudioElement | null;
      if (instrumentalElement) {
        instrumentalElement.volume = instrumentalVolume / 100;
      }

      // Only adjust mic gain when recording is active
      adjustMicGain();
    } else {
      // Reset volumes and stop audio processing when recording is stopped
      const guideVocalElement = document.getElementById(
        "guide-vocal-track"
      ) as HTMLAudioElement | null;
      if (guideVocalElement) {
        guideVocalElement.volume = 0; // Mute guide vocal
        guideVocalElement.muted = true;
      }

      const instrumentalElement = document.getElementById(
        "instrumental-track"
      ) as HTMLAudioElement | null;
      if (instrumentalElement) {
        instrumentalElement.volume = 0; // Mute instrumental
      }

      // Disconnect the microphone and reset gain
      if (micSource && gainNode && audioContext) {
        micSource.disconnect(gainNode);
        gainNode.disconnect(audioContext.destination);
        audioContext.close();
      }
    }

    return () => {
      // Clean up audio context when component unmounts
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [guidVocalVolume, vocalVolume, instrumentalVolume, isRecording]);

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}>
        <Mixer showModal={showModal} />
      </button>

      {showModal && (
        <div className="absolute top-[720px] left-[70px] md:left:[200px] lg:left-[510px] xl:left-[510px] bg-[#DBDAD9] w-[372px] gap-2 p-4 rounded-[8px]">
          <div className="flex me-0 gap-4 items-center">
            <p className="w-[95px] flex justify-end">Guid Vocal:</p>
            <div className="w-[228px]">
              <VolumeRangeMixer
                defaultValue={[guidVocalVolume]}
                max={100}
                step={1}
                onValueChange={(value) => setGuidVocalVolume(value[0])}
              />
            </div>
          </div>
          <div className="flex me-0 gap-4 items-center">
            <p className="w-[95px] flex justify-end">Vocal:</p>
            <div className="w-[228px]">
              <VolumeRangeMixer
                defaultValue={[vocalVolume]}
                max={100}
                step={1}
                onValueChange={(value) => setVocalVolume(value[0])}
              />
            </div>
          </div>
          <div className="flex me-0 gap-4 items-center">
            <p className="w-[95px] flex justify-end">Instrumental:</p>
            <div className="w-[228px]">
              <VolumeRangeMixer
                defaultValue={[instrumentalVolume]}
                max={100}
                step={1}
                onValueChange={(value) => setInstrumentalVolume(value[0])}
              />
            </div>
          </div>

          {/* Conditional rendering for recording */}
          <div className="mt-4">
            {isRecording ? (
              <p className="text-red-500">Recording in progress...</p>
            ) : recordedUrl ? (
              <div>
                <p>Recording completed!</p>
                <audio controls src={recordedUrl}></audio>
              </div>
            ) : (
              <p>No recording available.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MixerFunctionality;
