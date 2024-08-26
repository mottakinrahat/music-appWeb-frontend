import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CurrentPlayingUsers = () => {
  return (
    <div>
      <div className="flex text-white items-center">
        <Avatar className="w-8 h-8 border-white border-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-8 h-8 -mx-4 border-white border-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-8 h-8 border-white border-2">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mx-2">
          and 2 other{" "}
          <span className="underline cursor-pointer select-none">
            Add friends
          </span>
        </p>
      </div>
    </div>
  );
};

export default CurrentPlayingUsers;
