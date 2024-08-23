import Container from "@/components/common/container/Container";
import featuresImage from "@/assets/images/features.png";
import Image from "next/image";
import icon1 from "@/assets/icons/png/Capa_1.png";
import icon2 from "@/assets/icons/png/Frame.png";
import icon3 from "@/assets/icons/png/XMLID_70_.png";

export default function Features() {
  const features = [
    {
      icon: icon3,
      title: "Millions of songs",
      description:
        "Stream a vast library of music, from chart-toppers to hidden gems.",
    },
    {
      icon: icon1,
      title: "Direct-to-Fan",
      description: "Support artists you love directly and fairly.",
    },
    {
      icon: icon2,
      title: "Personalized Discovery",
      description:
        "Find music that speaks to you with our powerful recommendation engine and curated playlists.",
    },
  ];

  return (
    <div className="relative max-w-[1400px] mx-auto py-8 lg:py-16 flex">
      {/* Background wrapper */}
      <div
        className="absolute hidden lg:block top-0"
        style={{
          backgroundImage: `url(${featuresImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover", // Ensure full coverage
          backgroundRepeat: "no-repeat",
          width: "60%", // Takes up 50% of container width
          height: "100%", // Full height of the container
        }}
      />
      <div className="lg:w-1/2"></div>
      <div className="relative lg:w-1/2 p-10 flex flex-col justify-center">
        <h2 className="font-semibold text-5xl mb-12">
          Stream. Support. Discover. All in one place.
        </h2>
        <div className="space-y-6">
          {features?.map((feature, idx) => (
            <div key={idx} className="sm:flex items-center">
              <div className="bg-[#FFF0F9] rounded-lg flex justify-center items-center w-12 h-12 mr-4">
                <Image
                  src={feature.icon}
                  width={feature.icon.width}
                  height={feature.icon.height}
                  alt={feature.title}
                  style={{ height: "24px", width: "24px" }}
                />
              </div>
              <div>
                <h3 className="font-bold text-xl">{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
