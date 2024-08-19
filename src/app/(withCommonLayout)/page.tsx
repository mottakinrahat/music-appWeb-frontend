import Banner from "@/component/pageComponents/Home/Banner";
import Soponsors from "@/component/pageComponents/Home/Soponsors";
import WhoAreUse from "@/component/pageComponents/Home/WhoAreUse";
import Navbar from "@/components/common/navigation/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <Soponsors />
      <WhoAreUse />
      <Link href="/music">
        <button>Goto music Page</button>
      </Link>
    </div>
  );
}
