import Banner from "@/component/Home/Banner";
import Navbar from "@/components/common/navigation/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <Link href="/music">
        <button>Goto music Page</button>
      </Link>
    </div>
  );
}
