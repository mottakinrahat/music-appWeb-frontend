import NewReleases from "@/components/pageComponents/music/NewReleases";
import HotPlayLists from "@/components/pageComponents/music/HotPlayLists";
import Features from "@/components/pageComponents/Home/Features";
import Recomended from "@/components/pageComponents/Home/Recomended";
import RecentlyPlayed from "@/components/pageComponents/music/RecentlyPlayed";
import TopCharts from "@/components/pageComponents/music/TopCharts";
import TopAlbums from "@/components/pageComponents/music/TopAlbums";
import TrandingPlaylist from "@/components/pageComponents/music/TrandingPlaylist";
import BeltWithKaraoke from "@/components/pageComponents/music/BeltWithKaraoke";

const AudioList = () => {
  return (
    <>
      <NewReleases />
      <HotPlayLists />
      <TopCharts />
      <TopAlbums />
      <RecentlyPlayed />
      <TrandingPlaylist />
      <BeltWithKaraoke />
      <Recomended album />
      <Features />
    </>
  );
};

export default AudioList;
