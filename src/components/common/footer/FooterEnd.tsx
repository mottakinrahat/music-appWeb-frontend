// components/Footer.tsx
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import LanguageSelector from "../navigation/LanguageSelector";
import { MdOutlineEmail } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";

const FooterEnd = () => {
  return (
    <footer className="flex container justify-between flex-wrap gap-4 items-center py-6 ">
      <div className="flex sm:gap-4 flex-1 max-md:justify-center flex-wrap">
        <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:mx-2 text-[#4C4C4C] border-2 p-1 rounded-md bg-black/10 hover:text-[#6b6b6b]"
        >
          <FaFacebookF size={24} />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:mx-2 text-[#4C4C4C] border-2 p-1 rounded-md bg-black/10 hover:text-[#6b6b6b]"
        >
          <FaInstagram size={24} />
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:mx-2 text-[#4C4C4C] border-2 p-1 rounded-md bg-black/10 hover:text-[#6b6b6b]"
        >
          <FaLinkedinIn size={24} />
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:mx-2 text-[#4C4C4C] border-2 p-1 rounded-md bg-black/10 hover:text-[#6b6b6b]"
        >
          <RiTwitterXFill size={24} />
        </Link>
        <Link
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="max-sm:mx-2 text-[#4C4C4C] border-2 p-1 rounded-md bg-black/10 hover:text-[#6b6b6b]"
        >
          <FaYoutube size={24} />
        </Link>
      </div>
      <div className="flex items-center max-md:justify-center max-md:w-full flex-wrap gap-6">
        <div className="flex items-center justify-center flex-wrap gap-2">
          <MdOutlineEmail className="text-xl mt-1" />
          <Link href={"mailto:ask.@soundstreaming.com"}>
            ask.@soundstreaming.com
          </Link>
        </div>
        <div>
          <LanguageSelector />
        </div>
      </div>
    </footer>
  );
};

export default FooterEnd;
