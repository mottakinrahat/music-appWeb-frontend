import image from "@/assets/images/Card3.png";
import image1 from "@/assets/images/Card2.png";
import image2 from "@/assets/images/Card.png";
import ConcertsContainer from "@/components/common/container/ConcertsContainer";
import BlogContainer from "@/components/common/container/BlogContainer";

const Blogs = () => {
  const data = [
    {
      id: 1,
      imageUrl: image.src,
      type: "Interview",
      artistName: "Helen Khilar",
      title: "A Beginner's Guide to the Nuances of Jazz",
      description:
        "Lets delve into the captivating story of The Volta. We explore their DIY origins, their infectious blend of indie roc ...",
    },
    {
      id: 2,
      imageUrl: image1.src,
      type: "Genre Exploration",
      artistName: "Helen Khilar",
      title: "An Interview with Rising Star, Luna Sky",
      description:
        "Ever wondered how your favorite songs come to life? This article takes you behind the scenes of music produ ...",
    },
    {
      id: 3,
      imageUrl: image2.src,
      type: "Behind-the-scenes",
      artistName: "Helen Khilar",
      title: "The Magic Behind Your Favorite Albums",
      description:
        "Dive into the rich history of jazz music. This article explores the evolution of jazz, key subgenres, and iconic...",
    },
    {
      id: 4,
      imageUrl: image1.src,
      type: "Artist Spotlight",
      artistName: "Helen Khilar",
      title: "Meteoric Rise of Indie Rock Band, The Volta",
      description:
        "In this exclusive interview, Luna Sky opens up about her musical influences, and the inspiration behind his ...",
    },
  ];
  return (
    <div>
      <BlogContainer
        bgGray={true}
        data={data}
        linkRoute={"/"}
        heading="Our Latest Blog"
        linkText="See all blogs"
      >
        Fuel your passion for music with insightful articles, interviews, and
        exclusive content.
      </BlogContainer>
    </div>
  );
};

export default Blogs;
