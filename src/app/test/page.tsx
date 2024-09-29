// "use client";
// import React, { useEffect, useState, useRef, useMemo } from "react";
// import * as Tone from "tone";

// const AdvancedAudioRecorder: React.FC = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
//   const recorderRef = useRef<Tone.Recorder | null>(null);
//   const mediaStreamRef = useRef<MediaStream | null>(null);
//   const sourceNodeRef = useRef<Tone.UserMedia | null>(null);
//   const gainNodeRef = useRef<Tone.Gain | null>(null);
//   const reverbNodeRef = useRef<Tone.Reverb | null>(null);
//   const echoNodeRef = useRef<Tone.FeedbackDelay | null>(null);
//   const distortionNodeRef = useRef<Tone.Distortion | null>(null);

//   const startRecording = async () => {
//     if (!isRecording) {
//       setIsRecording(true);
//       setRecordedAudioUrl(null);

//       await initializeAudioNodes();

//       // Start microphone input
//       if (sourceNodeRef.current) {
//         await sourceNodeRef.current.open();

//         // Create a recorder and connect it to the processed output
//         recorderRef.current = new Tone.Recorder();

//         // Connect the recorder to the last effect in the chain, ensuring type safety
//         gainNodeRef.current?.connect(echoNodeRef.current!); // Use non-null assertion operator
//         echoNodeRef.current?.connect(reverbNodeRef.current!); // Use non-null assertion operator
//         reverbNodeRef.current?.connect(distortionNodeRef.current!); // Use non-null assertion operator
//         distortionNodeRef.current?.connect(recorderRef.current); // Connect to the recorder

//         await recorderRef.current.start();
//       }
//     }
//   };

//   const stopRecording = useMemo(
//     () => async () => {
//       if (isRecording && recorderRef.current) {
//         try {
//           const recording = await recorderRef.current.stop();
//           setIsRecording(false);

//           // Create a URL for the recorded Blob and set it for playback
//           const url = URL.createObjectURL(recording);
//           setRecordedAudioUrl(url);

//           // Encode and save the recorded audio
//           await encodeAndSaveAudio(recording);
//         } catch (error) {
//           console.error("Error stopping the recorder:", error);
//         }
//       }
//     },
//     [isRecording]
//   );

//   useEffect(() => {
//     // Cleanup function to stop recording and disconnect nodes
//     return () => {
//       if (isRecording) stopRecording();
//       disconnectAudioNodes();
//     };
//   }, [isRecording, stopRecording]);

//   // Function to initialize audio nodes
//   const initializeAudioNodes = async () => {
//     await Tone.start(); // Ensure Tone.js is started

//     // Create audio nodes
//     sourceNodeRef.current = new Tone.UserMedia();
//     gainNodeRef.current = new Tone.Gain(1).toDestination(); // Volume control
//     reverbNodeRef.current = new Tone.Reverb({ decay: 2.0 }).toDestination(); // Reverb effect
//     echoNodeRef.current = new Tone.FeedbackDelay(0.4, 0.5).toDestination(); // Echo/Delay effect
//     distortionNodeRef.current = new Tone.Distortion(0.8).toDestination(); // Distortion effect

//     // Connect source to effects
//     sourceNodeRef.current
//       .connect(gainNodeRef.current)
//       .connect(echoNodeRef.current)
//       .connect(reverbNodeRef.current)
//       .connect(distortionNodeRef.current);
//   };

//   // Function to start recording
//   // Function to start recording

//   // Function to encode and save the recorded audio
//   const encodeAndSaveAudio = async (recording: Blob) => {
//     const arrayBuffer = await recording.arrayBuffer();
//     const audioBlob = new Blob([arrayBuffer], { type: "audio/wav" });

//     // Create a link element to download the audio file
//     const url = URL.createObjectURL(audioBlob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "recorded_audio.wav";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link); // Clean up the link element
//   };

//   // Function to disconnect and stop all audio nodes
//   const disconnectAudioNodes = () => {
//     sourceNodeRef.current?.disconnect();
//     gainNodeRef.current?.disconnect();
//     reverbNodeRef.current?.disconnect();
//     echoNodeRef.current?.disconnect();
//     distortionNodeRef.current?.disconnect();
//     sourceNodeRef.current?.close();
//   };

//   return (
//     <div className="audio-recorder">
//       <h1 className="text-2xl font-bold mb-4">
//         Advanced Audio Recorder with Effects
//       </h1>

//       {/* Start/Stop Recording Buttons */}
//       <button
//         onClick={isRecording ? stopRecording : startRecording}
//         className={`px-4 py-2 text-white ${
//           isRecording ? "bg-red-500" : "bg-green-500"
//         } rounded`}
//       >
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>

//       {/* Playback Section */}
//       {recordedAudioUrl && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold mb-2">Recorded Audio</h2>
//           <audio controls src={recordedAudioUrl} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvancedAudioRecorder;
