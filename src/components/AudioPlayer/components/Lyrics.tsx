import { useEffect, useRef } from "react";

interface LyricsProps {
  songData?: any;
  currentLyrics: string | any;
  setCurrentLyrics: (value: any) => void;
}

const Lyrics: React.FC<LyricsProps> = ({
  songData,
  currentLyrics,
  setCurrentLyrics,
}) => {
  const lyricsDivRef = useRef<HTMLDivElement>(null);
  const currentLyricsRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (currentLyricsRef.current && lyricsDivRef.current) {
      const activeLyricTop = currentLyricsRef.current.offsetTop;
      const containerHeight = lyricsDivRef.current.clientHeight;
      const scrollPosition = activeLyricTop - containerHeight / 3; // Scroll to center

      lyricsDivRef.current.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [currentLyrics]);

  // Handle click event to set the active lyric
  const handleClick = (line: string) => {
    setCurrentLyrics(line); // Set the clicked lyric as active
  };
  const allLyrics = {
    lines: songData?.lyrics.map((lyric: any) => lyric.line), // Store each line separately
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
      className="absolute w-[1159px] max-h-[480px] no-scrollbar overflow-y-scroll z-50 scroll-smooth top-[174px] left-[120px] text-5xl text-white leading-snug font-semibold"
    >
      {allLyrics.lines.map((line: string, index: number) => (
        <p
          key={index}
          className={`mb-4 ${
            line === currentLyrics ? "text-white" : "text-white/60"
          }`}
          ref={line === currentLyrics ? currentLyricsRef : null}
          onClick={() => handleClick(line)} // On click, set this line as active
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default Lyrics;
