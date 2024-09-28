// import { RootState } from "@/redux/store";
// import React from "react";
// import { useSelector } from "react-redux";

// const RadioButton = ({
//   className,
//   onClick,
// }: {
//   className?: string;
//   onClick?: () => void;
// }) => {
//   const isRecording = useSelector(
//     (state: RootState) => state.karaoke.isKaraokeRecord
//   );

//   return (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       onClick={onClick}
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <mask
//         id="mask0_4163_795"
//         maskUnits="userSpaceOnUse"
//         x="0"
//         y="0"
//         width="24"
//         height="24"
//       >
//         <rect width="24" height="24" fill="#D9D9D9" />
//       </mask>
//       <g mask="url(#mask0_4163_795)">
//         <path
//           d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
//           fill={isRecording ? "#00CCD0" : "#aaaaaa"} // Toggle color based on isRecording
//           className={`${className && className}`}
//         />
//       </g>
//     </svg>
//   );
// };

// export default RadioButton;



import React from 'react'

const RadioButton = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z"
        stroke="white"
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9991 17.7638C15.1828 17.7638 17.7638 15.1828 17.7638 11.9991C17.7638 8.81531 15.1828 6.23438 11.9991 6.23438C8.81531 6.23438 6.23438 8.81531 6.23438 11.9991C6.23438 15.1828 8.81531 17.7638 11.9991 17.7638Z"
        stroke="white"
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RadioButton
