import { RootState } from "@/redux/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import placeHolder from "@/assets/etc/png/song.jpg";
import SongMarquee from "./SongMarquee";
import Link from "next/link";

interface ImportSongProps {
  artwork: string | any;
  songName: string | any;
  songAlbum: string | any;
  songArtist: string | any;
}

const ImportSong: React.FC<ImportSongProps> = ({
  artwork,
  songName,
  songAlbum,
  songArtist,
}) => {
  const importedSong = useSelector((state: RootState) => state.musicData);
  return (
    <div className="text-white flex mb-4 items-center gap-4">
      <Image
        priority
        src={
          importedSong.fileData
            ? placeHolder.src
            : artwork
            ? artwork
            : placeHolder.src
        }
        alt={songName}
        width={40}
        height={40}
        style={{
          borderRadius: "8px",
          marginRight: "8px",
          height: "50px",
          width: "50px",
        }}
        className="lg:"
      />
      <div>
        <h2 className="text-white text-base md:text-xl gap-2 font-semibold mb-1 lg:text-xl sm:text-2xl">
          <SongMarquee
            songName={importedSong.fileData ? importedSong.title : songName}
            className="text-white"
          />
        </h2>
        <div className="flex lg:items-center max-lg:flex-col flex-wrap ">
          {importedSong.fileData ? (
            <p>Imported from device.</p>
          ) : (
            <>
              <p>{songArtist}</p>
              <div className="flex items-center max-md:hidden gap-2">
                <div className="size-2 bg-white rounded-full ml-2"></div>
                <p>
                  Album:{" "}
                  <Link href={"#"} className="underline">
                    {songAlbum.albumName}
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportSong;
