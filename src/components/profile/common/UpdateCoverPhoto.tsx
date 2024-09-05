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
    <div>
      <input
        onChange={handleUpdateCover}
        type="file"
        className="hidden"
        name="coverPhoto"
        id="coverPhoto"
      />
      <Button variant={"white"}>
        <label htmlFor="coverPhoto" className="h-full flex items-center z-10">
          Change Cover
        </label>
      </Button>
    </div>
  );
};
