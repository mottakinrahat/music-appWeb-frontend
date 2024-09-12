// "use client";
// import { useState, useRef, useEffect } from "react";
// import { openDB } from "idb";
// import RadioButton from "@/components/svg/RadioButton";
// import { useDispatch } from "react-redux";
// import { setRecordedUrl } from "@/redux/slice/karaoke/karaokeActionSlice";

// const AudioRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioURL, setAudioURL] = useState<string | null>(null);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const chunksRef = useRef<Blob[]>([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (audioURL) {
//       dispatch(setRecordedUrl(audioURL));
//     } else {
//       dispatch(setRecordedUrl(""));
//     }
//   }, [audioURL, dispatch]);

//   // Request user media and start recording
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       mediaRecorderRef.current = new MediaRecorder(stream);

//       mediaRecorderRef.current.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           chunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorderRef.current.onstop = async () => {
//         const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         setAudioURL(audioUrl);
//         saveToIndexedDB(audioBlob);
//       };

//       mediaRecorderRef.current.start();
//       setIsRecording(true);
//     } catch (err) {
//       console.error("Error accessing microphone", err);
//     }
//   };

//   // Stop recording
//   const stopRecording = () => {
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // Save audio blob to IndexedDB
//   const saveToIndexedDB = async (blob: Blob) => {
//     const db = await openDB("audio-db", 1, {
//       upgrade(db) {
//         db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
//       },
//     });
//     await db.put("audio", { blob });
//   };

//   return (
//     <div>
//       <div className="flex items-center">
//         {isRecording ? (
//           <button onClick={stopRecording} className="cursor-pointer">
//             <RadioButton className="fill-red-500" />
//           </button>
//         ) : (
//           <button onClick={startRecording} className="cursor-pointer">
//             <RadioButton className="fill-accent" />
//           </button>
//         )}
//       </div>
//       {audioURL && (
//         <div className="mt-4">
//           <h2 className="text-lg font-semibold">Recorded Audio:</h2>
//           <audio controls src={audioURL} className="mt-2" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AudioRecorder;
// components/AudioRecorder.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { openDB } from "idb";
import RadioButton from "@/components/svg/RadioButton";
import { useDispatch } from "react-redux";
import { setRecordedUrl } from "@/redux/slice/karaoke/karaokeActionSlice";
import { useAudio } from "@/lib/AudioProvider";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const dispatch = useDispatch();
  const { audioRef, audioContext } = useAudio(); // Get the ref from the context

  useEffect(() => {
    if (audioURL) {
      dispatch(setRecordedUrl(audioURL));
    } else {
      dispatch(setRecordedUrl(""));
    }
  }, [audioURL, dispatch]);

  // Function to play a short beep sound
  const playBeep = () => {
    if (audioContext) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };

  // Request user media and start recording
  const startRecording = async () => {
    try {
      playBeep();

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      if (!audioRef.current) {
        console.warn("No audio element available.");
        return;
      }

      const mediaElement = audioRef.current;
      if (mediaElement.paused) {
        await mediaElement.play();
      }

      if (audioContext) {
        await audioContext.resume();

        // Create a MediaStreamDestination for recording
        const recordingDestination =
          audioContext.createMediaStreamDestination();

        // Create an AudioBufferSourceNode for monitoring
        const monitoringDestination =
          audioContext.createMediaStreamDestination();

        // Create sources
        const micSource = audioContext.createMediaStreamSource(micStream);
        const musicSource = audioContext.createMediaElementSource(mediaElement);

        // Connect sources to the monitoring destination for playback
        micSource.connect(monitoringDestination);
        musicSource.connect(monitoringDestination);

        // Connect sources to the recording destination for recording
        micSource.connect(recordingDestination);
        musicSource.connect(recordingDestination);

        // Set up the MediaRecorder with the recording destination
        mediaRecorderRef.current = new MediaRecorder(
          recordingDestination.stream
        );

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = async () => {
          const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          saveToIndexedDB(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);

        // Connect the monitoring destination to the speakers
        const monitoringAudio = new Audio();
        monitoringAudio.srcObject = monitoringDestination.stream;
        monitoringAudio.play();
      }
    } catch (err) {
      console.error("Error accessing microphone or system audio:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const saveToIndexedDB = async (blob: Blob) => {
    const db = await openDB("audio-db", 1, {
      upgrade(db) {
        db.createObjectStore("audio", { keyPath: "id", autoIncrement: true });
      },
    });
    await db.put("audio", { blob });
  };

  return (
    <div>
      <div className="flex items-center">
        {isRecording ? (
          <button onClick={stopRecording} className="cursor-pointer">
            <RadioButton className="fill-red-500" />
          </button>
        ) : (
          <button onClick={startRecording} className="cursor-pointer">
            <RadioButton className="fill-accent" />
          </button>
        )}
      </div>
      {audioURL && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Recorded Audio:</h2>
          <audio controls src={audioURL} className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
