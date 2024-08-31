interface PlayListProps {
  handlePlayListOpen?: () => void;
}

const PlayLIstIcon: React.FC<PlayListProps> = ({ handlePlayListOpen }) => {
  return (
    <div>
      <svg
        width="22"
        height="21"
        viewBox="0 0 22 21"
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        className="icon cursor-pointer transition fill-white hover:fill-accent"
        onClick={handlePlayListOpen}
      >
        <path d="M0 21V3C0 2.45 0.195833 1.97917 0.5875 1.5875C0.979167 1.19583 1.45 1 2 1H13C13.55 1 14.0208 1.19583 14.4125 1.5875C14.8042 1.97917 15 2.45 15 3V3.425C14.6 3.60833 14.2333 3.83333 13.9 4.1C13.5667 4.36667 13.2667 4.66667 13 5V3H2V15H13V11C13.2667 11.3333 13.5667 11.6333 13.9 11.9C14.2333 12.1667 14.6 12.3917 15 12.575V15C15 15.55 14.8042 16.0208 14.4125 16.4125C14.0208 16.8042 13.55 17 13 17H4L0 21ZM4 13H8V11H4V13ZM17 11C16.1667 11 15.4583 10.7083 14.875 10.125C14.2917 9.54167 14 8.83333 14 8C14 7.16667 14.2917 6.45833 14.875 5.875C15.4583 5.29167 16.1667 5 17 5C17.1833 5 17.3583 5.01667 17.525 5.05C17.6917 5.08333 17.85 5.125 18 5.175V0H22V2H20V8C20 8.83333 19.7083 9.54167 19.125 10.125C18.5417 10.7083 17.8333 11 17 11ZM4 10H11V8H4V10ZM4 7H11V5H4V7Z" />
      </svg>
    </div>
  );
};

export default PlayLIstIcon;
