import { useEffect, useRef, useState } from "react";

interface Lyric {
  _id: string;
  startTime: string; // time in HH:MM:SS format
  endTime: string; // time in HH:MM:SS format
  line: string;
}

interface LyricsProps {
  songData?: {
    lyrics: Lyric[];
  };
  currentLyrics: Lyric | null; // Use Lyric type or null
  setCurrentLyrics: (value: Lyric | null) => void;
}

const Lyrics: React.FC<LyricsProps> = ({
  songData,
  currentLyrics,

  setCurrentLyrics,
}) => {
  const lyricsDivRef = useRef<HTMLDivElement>(null);
  const currentLyricsRef = useRef<HTMLParagraphElement>(null);
  const [duration, setDuration] = useState(0);
  // const [lineTime, setLineTime] = useState(0);

  const convertToSeconds = (time: string): number => {
    const parts = time.split(":").map(Number);
    const seconds = parts.pop() || 0;
    const minutes = parts.pop() || 0;
    const hours = parts.pop() || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  // const currentTimeSeconds = Math.floor(currentTime);

  useEffect(() => {
    if (currentLyrics) {
      const startTime = convertToSeconds(currentLyrics.startTime);
      const endTime = convertToSeconds(currentLyrics.endTime);
      const lineDuration = endTime - startTime;
      setDuration(lineDuration);

      if (currentLyricsRef.current && lyricsDivRef.current) {
        const activeLyricTop = currentLyricsRef.current.offsetTop;
        const containerHeight = lyricsDivRef.current.clientHeight;
        const scrollPosition = activeLyricTop - containerHeight / 2;

        const smoothScroll = (target: number) => {
          const start = lyricsDivRef.current!.scrollTop;
          const change = target - start;
          const duration = 800;
          let startTime: number | null = null;

          const animateScroll = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            lyricsDivRef.current!.scrollTop = start + change * progress;

            if (timeElapsed < duration) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        };

        smoothScroll(scrollPosition);
      }

      const timeout = setTimeout(() => {
        // Reset currentLyrics after duration if needed
      }, lineDuration * 1000);

      return () => clearTimeout(timeout);
    }
  }, [currentLyrics]);

  const handleClick = (lyric: Lyric) => {
    setCurrentLyrics(lyric);
  };

  const allLyrics = songData?.lyrics || [];

  const renderLyricLine = (line: string) => {
    const words = line.split(" ");
    return words.map((word, index) => (
      <span
        key={index}
        style={{
          animation: currentLyrics
            ? `fadeIn ${duration / 2 / words.length}s linear ${
                index * (duration / words.length)
              }s forwards`
            : "none",
          opacity: currentLyrics ? 0.5 : 1,
          color: currentLyrics ? "white" : "rgba(255, 255, 255, 0.55)",
        }}
      >
        {word + (index < words.length - 1 ? " " : "")}
      </span>
    ));
  };

  return (
    <div
      ref={lyricsDivRef}
      style={{
        display: "inline-block",
        WebkitMaskImage:
          "-webkit-gradient(linear, top, bottom, color-stop(0%, rgba(0,0,0,1)), color-stop(20%, rgba(0,0,0,0)), color-stop(80%, rgba(0,0,0,0)), color-stop(100%, rgba(0,0,0,1)))",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 10%, rgba(0,0,0,1) 0%)",
      }}
      className="absolute w-[90%] text-center xl:text-left mx-auto xl:px-0 xl:w-[1000px] max-h-[calc(100vh-480px)] no-scrollbar overflow-y-scroll z-50 scroll-smooth top-[150px] xl:top-[174px] xl:left-[120px] text-xl sm:text-2xl lg:text-4xl xl:text-5xl leading-snug font-semibold"
    >
      {allLyrics.map((lyric) => (
        <p
          key={lyric._id}
          className={`mb-4 ${
            lyric._id === currentLyrics?._id
              ? "text-white animate-color"
              : "text-white/55"
          }`}
          ref={lyric._id === currentLyrics?._id ? currentLyricsRef : null}
          onClick={() => handleClick(lyric)}
        >
          {lyric._id === currentLyrics?._id
            ? renderLyricLine(lyric.line)
            : lyric.line}
        </p>
      ))}
    </div>
  );
};

export default Lyrics;
