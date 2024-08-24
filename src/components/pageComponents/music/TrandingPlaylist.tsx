import Container from "@/components/common/container/Container";
import Heading from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrandingPlaylist = () => {
  return (
    <Container>
      <Heading
        type="primary"
        heading="Trending playlist"
        linkText="See all trending playlist"
        route="/"
      >
        popular playlists meticulously crafted by our talented community
        members.
      </Heading>

      <Tabs defaultValue="account" className="w-full justify-between my-10">
        <TabsList className="flex justify-between">
          <TabsTrigger value="top-50">Top 50</TabsTrigger>
          <TabsTrigger value="ViralHits">Viral Hits</TabsTrigger>
          <TabsTrigger value="EditorsPicks">Editor's Picks</TabsTrigger>
          <TabsTrigger value="Freshnew">Fresh new</TabsTrigger>
          <TabsTrigger value="BestPlaylist">Best Playlist</TabsTrigger>
          <TabsTrigger value="Mostreecent">Most reecent</TabsTrigger>
        </TabsList>
        <TabsContent value="top-50">Change your password here.</TabsContent>
        <TabsContent value="ViralHits">Change your password here.</TabsContent>
        <TabsContent value="EditorsPicks">
          Change your password here.
        </TabsContent>
        <TabsContent value="Freshnew">Change your password here.</TabsContent>
        <TabsContent value="BestPlaylist">
          Change your password here.
        </TabsContent>
        <TabsContent value="Mostreecent">
          Change your password here.
        </TabsContent>
      </Tabs>
    </Container>
  );
};

export default TrandingPlaylist;
