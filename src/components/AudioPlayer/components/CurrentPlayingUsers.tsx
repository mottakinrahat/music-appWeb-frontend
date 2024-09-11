import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface CurrentPlayingUsersProps {
  addFriends: boolean;
  className?: string;
}

const CurrentPlayingUsers = ({
  addFriends,
  className,
}: CurrentPlayingUsersProps) => {
  return (
    <div>
      <div
        className={`${className ? className : "text-white"} flex  items-center`}
      >
        <Avatar className="w-5 h-5 sm:w-7 sm:h-7 border-white border-2 cursor-pointer">
          <AvatarImage src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-5 h-5 sm:w-7 sm:h-7 -mx-3 sm:-mx-4 cursor-pointer border-white border-2">
          <AvatarImage src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="w-5 h-5 sm:w-7 sm:h-7 border-white cursor-pointer border-2">
          <AvatarImage src="https://cdn-icons-png.freepik.com/512/7718/7718888.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mx-2">
          <span className="hover:underline cursor-pointer"> and 2 other </span>
          {addFriends && (
            <span className="underline cursor-pointer select-none">
              Add friends
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default CurrentPlayingUsers;
