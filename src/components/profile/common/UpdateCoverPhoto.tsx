"use client";
import { Button } from "@/components/ui/button";

export const UpdateCoverPhoto = () => {
  const handleUpdateCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Change this to [0] to access the first file
    if (file) {
      console.log("Cover image file:", file);
      // You can now use the file to update the cover (API call or preview)
    }
  };
  return (
    <div className="max-md:absolute right-2 top-2">
      <input
    
        onChange={handleUpdateCover}
        type="file"
        className="hidden"
        name="coverPhoto"
        id="coverPhoto"
      />
      <Button variant={"white"} className="max-md:py-0 max-md:h-8 max-md:px-2">
        <label
          htmlFor="coverPhoto"
          className="h-full  text-xs md:text-base flex items-center z-10"
        >
          Change Cover
        </label>
      </Button>
    </div>
  );
};
