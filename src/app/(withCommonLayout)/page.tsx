import Banner from "@/component/pageComponents/Home/Banner";
import Soponsors from "@/component/pageComponents/Home/Soponsors";
import Navbar from "@/components/common/navigation/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <Soponsors />
      <Link href="/music">
        <button>Goto music Page</button>
      </Link>
    </div>
  );
}
