import Navbar from "@/components/common/navigation/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <Link href="/music">
        <button>Goto music Page</button>
      </Link>
    </div>
  );
}
