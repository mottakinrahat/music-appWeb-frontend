import Banner from "@/components/pageComponents/Home/Banner";
import Blogs from "@/components/pageComponents/Home/Blogs";
import BrowseFreeLencers from "@/components/pageComponents/Home/BrowseFreeLencers";
import Events from "@/components/pageComponents/Home/Events";
import Features from "@/components/pageComponents/Home/Features";
import HotSongs from "@/components/pageComponents/Home/HotSongs";
import LimitedOffer from "@/components/pageComponents/Home/LimitedOffer";
import NewRelease from "@/components/pageComponents/Home/NewRelease";
import Recomended from "@/components/pageComponents/Home/Recomended";
import Soponsors from "@/components/pageComponents/Home/Soponsors";
import TopList from "@/components/pageComponents/Home/TopList";
import VRConcerts from "@/components/pageComponents/Home/VRConcerts";
import WhoAreUse from "@/components/pageComponents/Home/WhoAreUse";


export default function Home() {
  return (
    <>
      <Banner />
      <Soponsors />
      <WhoAreUse />
      <NewRelease />
      <TopList />
      <LimitedOffer />
      <BrowseFreeLencers />
      <Recomended />
      <HotSongs />
      <Events />
      <VRConcerts />
      <Blogs />
      <Features />
    </>
  );
}
