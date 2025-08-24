import { promises as fs } from "fs";
import path from "path";

// Handle GET requests
export async function GET(req: Request) {
  try {
    // Define the directory path for the music files
    const musicDirectory = path.join(process.cwd(), "public", "music");

    // Read all files from the music directory
    const files = await fs.readdir(musicDirectory);

    // Create an array of song metadata
    const songsData = files.map((file, index) => ({
      id: index + 1,
      title: path.parse(file).name, // Song name (without the extension)
      url: `/music/${file}`, // Relative path to the song
    }));

    // Return the list of songs as JSON
    return new Response(JSON.stringify(songsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error reading song files" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
