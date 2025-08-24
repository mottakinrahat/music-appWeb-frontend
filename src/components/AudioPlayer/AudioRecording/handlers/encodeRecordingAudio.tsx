
// import WavEncoder from "wav-encoder";

// // Function to mix audio and save it as a WAV file
// export const encodeAndSaveAudio = async (
//   recording: Blob,
//   currentSongBlob: Blob,
//   setRecordedAudioUrl: (url: string) => void
// ): Promise<void> => {
//   const audioContext = new (window.AudioContext ||
//     (window as any).webkitAudioContext)();

//   try {
//     // Convert both blobs to ArrayBuffers
//     const recordingArrayBuffer = await recording.arrayBuffer();
//     const currentSongArrayBuffer = await currentSongBlob.arrayBuffer();

//     // Decode both arrays into AudioBuffers
//     const recordingBuffer = await audioContext.decodeAudioData(
//       recordingArrayBuffer
//     );
//     const songBuffer = await audioContext.decodeAudioData(
//       currentSongArrayBuffer
//     );

//     if (!recordingBuffer || !songBuffer) {
//       console.error("Failed to decode audio buffers.");
//       return;
//     }

//     // Create a mixed AudioBuffer
//     const mixedBuffer = audioContext.createBuffer(
//       Math.max(recordingBuffer.numberOfChannels, songBuffer.numberOfChannels),
//       Math.max(recordingBuffer.length, songBuffer.length),
//       audioContext.sampleRate
//     );

//     // Mix both audio tracks into the mixedBuffer
//     for (let channel = 0; channel < mixedBuffer.numberOfChannels; channel++) {
//       const mixedData = mixedBuffer.getChannelData(channel);
//       const recordingData =
//         channel < recordingBuffer.numberOfChannels
//           ? recordingBuffer.getChannelData(channel)
//           : new Float32Array(mixedBuffer.length); // Silent if channel is not present
//       const songData =
//         channel < songBuffer.numberOfChannels
//           ? songBuffer.getChannelData(channel)
//           : new Float32Array(mixedBuffer.length); // Silent if channel is not present

//       // Mix the channels
//       for (let i = 0; i < mixedBuffer.length; i++) {
//         mixedData[i] = (recordingData[i] || 0) + (songData[i] || 0); // Mixing by summing values
//       }
//     }

//     // Encode the mixed AudioBuffer to WAV format
//     const wavData = await WavEncoder.encode({
//       sampleRate: audioContext.sampleRate,
//       channelData: Array.from({ length: mixedBuffer.numberOfChannels }).map(
//         (_, index) => mixedBuffer.getChannelData(index)
//       ),
//     });

//     // Convert the ArrayBuffer to a Blob
//     const wavBlob = new Blob([new Uint8Array(wavData)], { type: "audio/wav" });

//     // Create a download link for the mixed audio file
//     const url = URL.createObjectURL(wavBlob);
//     setRecordedAudioUrl(url);
//     // const link = document.createElement("a");
//     // link.href = url;
//     // link.download = "mixed_audio.wav"; // Save as WAV file
//     // document.body.appendChild(link);
//     // link.click();
//     // document.body.removeChild(link); // Clean up the link element
//   } catch (error) {
//     console.error("Error encoding and saving audio:", error);
//   } finally {
//     audioContext.close(); // Ensure the audio context is closed
//   }
// };
import WavEncoder from "wav-encoder";

// Function to mix audio and save it as a WAV file
export const encodeAndSaveAudio = async (
  recording: Blob,
  currentSongBlob: Blob,
  setRecordedAudioUrl: (url: string) => void,
  startTime: number,
  endTime: number
): Promise<void> => {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  // Convert both blobs to ArrayBuffers
  const recordingArrayBuffer = await recording.arrayBuffer();
  const currentSongArrayBuffer = await currentSongBlob.arrayBuffer();

  // Decode both arrays into AudioBuffers
  const recordingBuffer = await audioContext.decodeAudioData(
    recordingArrayBuffer
  );
  const songBuffer = await audioContext.decodeAudioData(currentSongArrayBuffer);

  if (!recordingBuffer || !songBuffer) {
    console.error("Failed to decode audio buffers.");
    return;
  }

  // Calculate the sample indices for the specified times
  const startSample = startTime * audioContext.sampleRate;
  const endSample = endTime * audioContext.sampleRate;

  // Check boundaries
  const trimmedSongBuffer = audioContext.createBuffer(
    songBuffer.numberOfChannels,
    endSample - startSample,
    audioContext.sampleRate
  );

  for (let channel = 0; channel < songBuffer.numberOfChannels; channel++) {
    const channelData = trimmedSongBuffer.getChannelData(channel);
    const songChannelData = songBuffer.getChannelData(channel);

    // Fill the trimmed song buffer with the specific segment
    for (let i = 0; i < channelData.length; i++) {
      channelData[i] = songChannelData[startSample + i] || 0; // Silent if out of bounds
    }
  }

  // Create a mixed AudioBuffer
  const mixedBuffer = audioContext.createBuffer(
    Math.max(
      recordingBuffer.numberOfChannels,
      trimmedSongBuffer.numberOfChannels
    ),
    Math.max(recordingBuffer.length, trimmedSongBuffer.length),
    audioContext.sampleRate
  );

  // Mix both audio tracks into the mixedBuffer
  for (let channel = 0; channel < mixedBuffer.numberOfChannels; channel++) {
    const mixedData = mixedBuffer.getChannelData(channel);
    const recordingData =
      channel < recordingBuffer.numberOfChannels
        ? recordingBuffer.getChannelData(channel)
        : new Float32Array(mixedBuffer.length); // Silent if channel is not present
    const songData =
      channel < trimmedSongBuffer.numberOfChannels
        ? trimmedSongBuffer.getChannelData(channel)
        : new Float32Array(mixedBuffer.length); // Silent if channel is not present

    // Mix the channels
    for (let i = 0; i < mixedBuffer.length; i++) {
      mixedData[i] = (recordingData[i] || 0) + (songData[i] || 0); // Mixing by summing values
    }
  }

  // Encode the mixed AudioBuffer to WAV format
  const wavData = await WavEncoder.encode({
    sampleRate: audioContext.sampleRate,
    channelData: Array.from({ length: mixedBuffer.numberOfChannels }).map(
      (_, index) => mixedBuffer.getChannelData(index)
    ),
  });

  // Convert the ArrayBuffer to a Blob
  const wavBlob = new Blob([new Uint8Array(wavData)], { type: "audio/wav" });

  // Create a download link for the mixed audio file
  const url = URL.createObjectURL(wavBlob);

  // Set the recorded audio URL
  setRecordedAudioUrl(url);
};
