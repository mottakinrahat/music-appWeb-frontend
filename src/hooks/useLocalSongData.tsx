import { useState, useEffect } from "react";

// Define the structure of your song data
interface SongData {
  id: string | null;
  play: boolean;
}

const useLocalSongData = (data?: SongData) => {
  const [storedData, setStoredData] = useState<SongData | null>(null);

  useEffect(() => {
    if (data) {
      // If data is provided, store it in localStorage
      localStorage.setItem("songData", JSON.stringify(data));
      setStoredData(data);
    } else {
      // If no data is provided, retrieve it from localStorage
      const localData = localStorage.getItem("songData");
      if (localData) {
        setStoredData(JSON.parse(localData));
      }
    }
  }, [data]);

  return storedData;
};

export default useLocalSongData;
