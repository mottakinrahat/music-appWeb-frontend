import React from "react";
import Image from "next/image";
import Link from "next/link";
export const tracks2 = [
  {
    id: 1,
    title: "Enna Sona",
    artist: "Arijit Singh",
    album: "Ok Janu",
    artwork:
      "https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2016/12/ok-jaanu-1481374642.jpg",
    url: "http://hindisongs.fusionbd.com/downloads/mp3/hindi/Single_Tracks/Enna_Sona-Ok_Jaanu_FusionBD.Com.mp3",
  },
  {
    id: 2,
    title: "Tujhe Kitna Chahne Lage hum",
    artist: "Arijit Singh",
    album: "Kabir Singh",
    artwork:
      "https://static.abplive.com/wp-content/uploads/2019/04/06192544/kabir-singh.jpg?impolicy=abp_cdn&imwidth=1200&height=675",
    url: "http://hindisongs.fusionbd.com/downloads/mp3/hindi/Kabir_Singh/Tujhe_Kitna_Chahne_Lage-Kabir_Singh_FusionBD.Com.mp3",
  },
  {
    id: 3,
    title: "Kaise Hua",
    artist: "Vishal Mishra",
    album: "Kabir Singh",
    artwork:
      "https://static.abplive.com/wp-content/uploads/2019/04/06192544/kabir-singh.jpg?impolicy=abp_cdn&imwidth=1200&height=675",
    url: "https://soundcloud.com/khadija-malick-416298659/kaise-hua-kabir-singh?si=bd2186d41c47487f8204ae1731f99deb&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
  },
  // Add more tracks as needed
];
const AudioList = () => {
  return (
    <div className="bg-[#F7F7F7] h-screen mx-[120px] mt-10">
      <h2 className="text-3xl font-bold">New release</h2>
      <p className="text-[16px] max-w-[588px]">
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </p>
      <div className="flex flex-wrap justify-between items-center mt-[48px]">
        {tracks2.map((track, index) => (
          <Link key={index} href={`player/${track?.id}`}>
            <div className="max-w-[282px]">
              <Image
                src={track?.artwork}
                height={282}
                width={282}
                className="h-[282px] w-[282px] object-cover object-center rounded-xl"
                alt="w"
              />
              <h2 className="text-[24px] font-bold">{track?.title}</h2>
              <h5 className="text-[16px]">{track?.artist}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AudioList;
