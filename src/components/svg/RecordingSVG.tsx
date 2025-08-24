import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const RecordingSVG = ({ onClick }: { onClick: () => void }) => {
  const getIsRecordingState = useSelector(
    (state: RootState) => state.karaoke.isRecording
  );

  return (
    <svg
      onClick={onClick}
      width={48}
      height={48}
      viewBox="0 0 48 48"
      className="cursor-pointer"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_4163_558"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x={12}
        y={12}
        width={24}
        height={24}
      >
        <rect x={12} y={12} width={24} height={24} fill="#D9D9D9" />
      </mask>
      {getIsRecordingState === "play" || getIsRecordingState === true ? (
        <g mask="url(#mask0_4163_558)">
          <path
            d="M25 31V17H31V31H25ZM17 31V17H23V31H17ZM27 29H29V19H27V29ZM19 29H21V19H19V29Z"
            fill="#DF0000"
          />
        </g>
      ) : getIsRecordingState === "pause" ? (
        <g mask="url(#mask0_4163_558)">
          <path d="M20 17L32 24L20 31V17Z" fill="#DF0000" />
        </g>
      ) : (
        <g>
          <circle cx={24} cy={24} r="20" fill="#DF0000" stroke="#00000000" />
        </g>
      )}
      <circle cx={24} cy={24} r="23.5" stroke="white" />
    </svg>
  );
};

export default RecordingSVG;
