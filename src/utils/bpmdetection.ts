// utils/bpmDetection.ts

export async function detectBPM(url: string): Promise<number | null> {
  try {
    // Fetch the audio file
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Extract audio data
    const channelData = audioBuffer.getChannelData(0); // Get the first channel

    // Perform peak detection
    const peaks = getPeaksAtThreshold(channelData, 0.5); // Adjust threshold as needed
    const intervals = countIntervalsBetweenNearbyPeaks(peaks);
    const groups = groupNeighborsByTempo(intervals);

    return groups.sort((a, b) => b.count - a.count)[0]?.tempo || null;
  } catch (error) {
    console.error("Error in detectBPM:", error);
    return null;
  }
}

function getPeaksAtThreshold(data: Float32Array, threshold: number): number[] {
  const peaksArray: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (Math.abs(data[i]) > threshold) {
      peaksArray.push(i);
      i += 10000; // Skip forward to avoid picking multiple peaks within the same beat
    }
  }
  return peaksArray;
}

function countIntervalsBetweenNearbyPeaks(peaks: number[]): number[] {
  const intervals: number[] = [];
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1]);
  }
  return intervals;
}

function groupNeighborsByTempo(
  intervals: number[]
): { tempo: number; count: number }[] {
  const tempoCounts: { [tempo: number]: number } = {};
  const sampleRate = 44100; // Sample rate of the audio file

  intervals.forEach((interval) => {
    const tempo = Math.round(60 / (interval / sampleRate));
    tempoCounts[tempo] = (tempoCounts[tempo] || 0) + 1;
  });

  return Object.keys(tempoCounts).map((tempo) => ({
    tempo: parseInt(tempo, 10),
    count: tempoCounts[tempo],
  }));
}
