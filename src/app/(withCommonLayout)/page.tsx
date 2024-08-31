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
import Footer from "@/components/common/footer/Footer";
import Navbar from "@/components/common/navigation/Navbar";
// import { useEffect, useState } from "react";
// import { Coming_Soon } from "next/font/google";
// import Link from "next/link";

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
      {/* <Link href="/music">
        <button>Goto music Page</button>
      </Link> */}
    </div>
  );
}
