import Banner from "@/component/pageComponents/Home/Banner";
import Blogs from "@/component/pageComponents/Home/Blogs";
import BrowseFreeLencers from "@/component/pageComponents/Home/BrowseFreeLencers";
import Events from "@/component/pageComponents/Home/Events";
import Features from "@/component/pageComponents/Home/Features";
import HotSongs from "@/component/pageComponents/Home/HotSongs";
import LimitedOffer from "@/component/pageComponents/Home/LimitedOffer";
import NewRelease from "@/component/pageComponents/Home/NewRelease";
import Recomended from "@/component/pageComponents/Home/Recomended";
import Soponsors from "@/component/pageComponents/Home/Soponsors";
import TopList from "@/component/pageComponents/Home/TopList";
import VRConcerts from "@/component/pageComponents/Home/VRConcerts";
import WhoAreUse from "@/component/pageComponents/Home/WhoAreUse";
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navigation/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
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
      <Footer />
      <Link href="/music">
        <button>Goto music Page</button>
      </Link>
    </div>
  );
}
