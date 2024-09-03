// pages/bpm.tsx
"use client";
import { detectBPM } from "@/utils/bpmdetection";
import { useState, useEffect } from "react";

const BPMPage = () => {
  const [bpm, setBpm] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBPM = async () => {
      try {
        const url =
          "https://res.cloudinary.com/dnzhxznox/video/upload/v1724324880/io00wbrrde99u7my2wsz.mp3";
        const detectedBPM = await detectBPM(url);
        if (detectedBPM === null) {
          setError(
            "Unable to detect BPM. Please check the audio file and detection logic."
          );
        } else {
          setBpm(detectedBPM);
        }
      } catch (error) {
        console.error("Error fetching or processing audio:", error);
        setError("Failed to detect BPM");
      } finally {
        setLoading(false);
      }
    };

    fetchBPM();
  }, []);

  return (
    <div>
      <h1>BPM Detection</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>BPM: {bpm !== null ? bpm : "Unable to detect BPM"}</p>
      )}
    </div>
  );
};

export default BPMPage;
