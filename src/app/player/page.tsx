"use client";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
  const [duration, setDuration] = useState(0); // Track duration of the song
  const [currentTime, setCurrentTime] = useState(0); // Track current playback time
  const [isLoaded, setIsLoaded] = useState(false); // Track if the buffer is loaded
  const [reverbValue, setReverbValue] = useState(-100); // Reverb level
  const [distortionValue, setDistortionValue] = useState(0); // Distortion level

  const playerRef = useRef<Tone.Player | null>(null); // Store player instance
  const eqRef = useRef<Tone.EQ3 | null>(null); // Equalizer reference
  const reverbRef = useRef<Tone.Reverb | null>(null); // Reverb reference
  const distortionRef = useRef<Tone.Distortion | null>(null); // Distortion reference

  // Format time in minutes:seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    // Initialize Tone.Player and load the song
    playerRef.current = new Tone.Player({
      url: "https://x-mega-pro.nyc3.cdn.digitaloceanspaces.com/imagine-dragons-beliver",
      autostart: false,
      onload: () => {
        setDuration(playerRef.current?.buffer.duration || 0); // Set song duration
        setIsLoaded(true); // Mark that the buffer is loaded
      },
    });

    // Initialize Equalizer (EQ3) with low, mid, and high bands
    eqRef.current = new Tone.EQ3(-10, 0, 10).toDestination();

    // Initialize Reverb and Distortion effects
    reverbRef.current = new Tone.Reverb({ decay: 1.5, wet: 0 }).toDestination();
    distortionRef.current = new Tone.Distortion(0).toDestination();

    // Connect the player to the equalizer and effects
    playerRef.current.connect(eqRef.current);
    playerRef.current.connect(reverbRef.current);
    playerRef.current.connect(distortionRef.current);

    // Cleanup on component unmount
    return () => {
      playerRef.current?.dispose();
      eqRef.current?.dispose();
      reverbRef.current?.dispose();
      distortionRef.current?.dispose();
    };
  }, []);

  // Play or pause the song
  const handlePlayPause = () => {
    if (!isLoaded) {
      alert("The audio file is still loading. Please wait.");
      return;
    }

    if (isPlaying) {
      playerRef.current?.stop();
      setIsPlaying(false);
    } else {
      playerRef.current?.start();
      setIsPlaying(true);
    }
  };

  // Stop the song
  const handleStop = () => {
    if (!isLoaded) return;

    playerRef.current?.stop();
    setIsPlaying(false);
    setCurrentTime(0); // Reset the time
  };

  // Handle volume control
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    playerRef.current?.volume.rampTo(volume, 0.1); // Smooth volume change
  };

  // Handle seeking the song
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(event.target.value);
    setCurrentTime(time);
    playerRef.current?.seek(time); // Seek to the specific time
  };

  // Handle EQ (Equalizer) control
  const handleEQChange =
    (band: "low" | "mid" | "high") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value);
      if (eqRef.current) {
        eqRef.current[band].value = value; // Adjust the corresponding EQ band
      }
    };

  // Handle Reverb control
  const handleReverbChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (reverbRef.current) {
      // Map value from [-100, 0] to [0, 1]
      const wetValue = (value + 100) / 100; // This will convert -100 to 0 and 0 to 1
      reverbRef.current.wet.value = Math.min(Math.max(wetValue, 0), 1); // Ensure it's within [0, 1]
      setReverbValue(value);
    }
  };

  // Handle Distortion control
  const handleDistortionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    if (distortionRef.current) {
      distortionRef.current.distortion = value; // Adjust distortion level
      setDistortionValue(value);
    }
  };

  // Update the current time as the song plays
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && playerRef.current) {
        // setCurrentTime(playerRef.current?.seek() || 0); // Get the current playback time using seek()
      }
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">
        Music Player with Equalizer & FX
      </h2>
      {/* Play/Pause Button */}
      <button
        onClick={handlePlayPause}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-green-600 transition duration-200"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      {/* Stop Button */}
      <button
        onClick={handleStop}
        className="bg-red-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-red-600 transition duration-200"
      >
        Stop
      </button>
      {/* Volume Control */}
      <div className="flex flex-col items-center mb-4">
        <label className="mb-2 text-lg">Volume</label>
        <input
          type="range"
          min="-60"
          max="0"
          step="1"
          onChange={handleVolumeChange}
          className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
        />
      </div>
      {/* Time/Seek Control */}
      <div className="flex flex-col items-center">
        <label className="mb-2 text-lg">Seek</label>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          step="0.1"
          onChange={handleSeek}
          className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
        />
        <div className="mt-2 text-sm">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      {/* Equalizer Controls */}
      <div className="mt-6 w-full">
        <h3 className="text-2xl font-semibold mb-4">Equalizer</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Low Band */}
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">Low</label>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              onChange={handleEQChange("low")}
              className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
            />
          </div>
          {/* Mid Band */}
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">Mid</label>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              onChange={handleEQChange("mid")}
              className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
            />
          </div>
          {/* High Band */}
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">High</label>
            <input
              type="range"
              min="-40"
              max="40"
              step="1"
              onChange={handleEQChange("high")}
              className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
      {/* FX Controls */}
      <div className="mt-6 w-full">
        <h3 className="text-2xl font-semibold mb-4">FX Controls</h3>
        <div className="flex flex-col items-center">
          {/* Reverb Control */}
          {/* Reverb Control */}
          <div className="flex flex-col items-center mb-4">
            <label className="mb-2 text-lg">Reverb</label>
            <input
              type="range"
              min="-100"
              max="0"
              step="1"
              value={reverbValue}
              onChange={handleReverbChange}
              className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Distortion Control */}
          <div className="flex flex-col items-center">
            <label className="mb-2 text-lg">Distortion</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={distortionValue}
              onChange={handleDistortionChange}
              className="w-full appearance-none bg-gray-400 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
      {!isLoaded && <p>Loading audio file...</p>} {/* Show loading message */}
    </div>
  );
};

export default MusicPlayer;
