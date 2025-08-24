"use client";
import Card from "@/components/Card/Card";
import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import songImg from "@/assets/etc/png/song.jpg";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAllSongQuery } from "@/redux/api/songApi";
// Import the SkeletonCard component
import { useEffect, useState } from "react";
import CardLoading from "@/components/common/loading/CardLoading";
import { getUserInfo } from "@/service/actions/auth.service";
import { useRouter } from "next/navigation";

const NewReleases = () => {
  const [page, setPage] = useState<number>(1);
  const user = getUserInfo();
  const router = useRouter(); // Initialize the router
  const [queryParam, setQueryParam] = useState<number>(1); // State to hold query param value

  useEffect(() => {
    router.push(`/music?new-release=${encodeURIComponent(queryParam)}`);
  }, [queryParam, router]);
  // Add or update a query parameter

  // Fetch songs with the current page number, `isLoading` tracks if data is being fetched
  const { data: tracks, isLoading } = useAllSongQuery({
    page: page,
    limit: 4,
  });

  const totalPage = tracks?.data?.pagination?.totalPages;
  const currentPage = tracks?.data?.pagination?.currentPage;
  return (
    <Container bgGray={true}>
      <Heading type="primary" heading={"New release"}>
        Get your ears on the hottest new tracks, from chart-topping anthems to
        underground gems bubbling up from the scene.
      </Heading>

      {/* Show loading animation when page is loading */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {isLoading || !tracks?.data?.songs
          ? Array(4)
              .fill(0) // Render 4 skeletons when loading
              .map((_, idx) => <CardLoading key={idx} />)
          : tracks?.data?.songs?.map((music: any, idx: number) => (
              <Card
                isFavourite={music?.favUsers?.includes(user?._id)}
                key={idx}
                musicId={music?._id}
                imageUrl={
                  music.imageUrl
                    ? music.imageUrl
                    : music.artwork
                    ? music.artwork
                    : songImg.src
                }
                artistName={music.artist ? music.artist : music.songArtist}
                title={music.title ? music.title : music.songName}
                type={music}
              />
            ))}
      </div>

      {/* Pagination controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              isActive={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            {Array.from({ length: totalPage }, (_, index) => (
              <PaginationLink key={index}>
                <button
                  disabled={index + 1 === currentPage}
                  onClick={() => {
                    setPage(index + 1);
                    setQueryParam(index + 1);
                  }} // Set page and trigger data loading
                  className="w-full h-full mx-1 text-base font-semibold text-textPrimary "
                >
                  {index + 1} {/* Display page numbers starting from 1 */}
                </button>
              </PaginationLink>
            ))}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
              isActive={currentPage !== totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Container>
  );
};

export default NewReleases;
