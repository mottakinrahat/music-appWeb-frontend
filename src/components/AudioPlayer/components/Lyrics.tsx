import { useEffect, useRef } from "react";

interface Lyric {
  _id: string;
  startTime: string;
  endTime: string;
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

  const handleClick = (lyric: Lyric) => {
    setCurrentLyrics(lyric); // Set the clicked lyric as active
  };

  const allLyrics = songData?.lyrics || [];

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
      className="absolute w-full text-center xl:text-left px-10 xl:px-0 xl:w-[1000px] max-h-[340px] md:max-h-[400px] xl:max-h-[480px] no-scrollbar overflow-y-scroll z-50 scroll-smooth top-[150px] xl:top-[174px] xl:left-[120px] text-xl sm:text-2xl lg:text-4xl xl:text-5xl text-white leading-snug font-semibold"
    >
      {allLyrics.map((lyric) => (
        <p
          key={lyric._id}
          className={`mb-4 ${
            lyric._id === currentLyrics?._id ? "text-white" : "text-white/55"
          }`}
          ref={lyric._id === currentLyrics?._id ? currentLyricsRef : null}
          onClick={() => handleClick(lyric)} // On click, set this line as active
        >
          {lyric.line}
        </p>
      ))}
    </div>
  );
};

export default Lyrics;
