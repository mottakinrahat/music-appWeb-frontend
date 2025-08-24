import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const MicSVG = () => {
  const isKaraoke = useSelector((state: RootState) => state.karaoke.karaoke);
  const strokeColor = isKaraoke ? "#00BBBF" : "#FFFFFF"; // Example colors: Red for karaoke mode, White otherwise

  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6065 19.2249H13.3965L14.2393 8.01758H9.76367L10.6065 19.2249Z"
        stroke={strokeColor}
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.8877 5.73265C15.884 5.78837 15.8601 5.84084 15.8205 5.88019C15.7809 5.91955 15.7283 5.94309 15.6725 5.9464C14.5991 6.00921 13.3433 6.04484 12.0018 6.04484C10.6602 6.04484 9.40441 6.00921 8.33097 5.9464C8.27523 5.94309 8.22261 5.91955 8.18299 5.88019C8.14337 5.84084 8.11949 5.78837 8.11582 5.73265L8.08066 5.21234C8.07834 5.17983 8.08298 5.1472 8.09427 5.11662C8.10556 5.08605 8.12324 5.05823 8.14613 5.03503C8.16902 5.01183 8.19659 4.99378 8.22701 4.98208C8.25743 4.97038 8.29 4.9653 8.32253 4.96718C9.39738 5.02999 10.6564 5.06609 12.0018 5.06609C13.3471 5.06609 14.6061 5.02999 15.681 4.96718C15.7135 4.9653 15.7461 4.97038 15.7765 4.98208C15.8069 4.99378 15.8345 5.01183 15.8574 5.03503C15.8803 5.05823 15.898 5.08605 15.9092 5.11662C15.9205 5.1472 15.9252 5.17983 15.9228 5.21234L15.8877 5.73265Z"
        stroke={strokeColor}
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.36133 4.96785C8.40635 4.03306 8.80939 3.15145 9.48689 2.50581C10.1644 1.86016 11.0644 1.5 12.0002 1.5C12.9361 1.5 13.8361 1.86016 14.5136 2.50581C15.1911 3.15145 15.5941 4.03306 15.6391 4.96785"
        stroke={strokeColor}
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.44727 5.95312C8.63315 6.77234 9.09691 7.50194 9.75977 8.01797H14.2354C14.8984 7.50212 15.3623 6.77245 15.5479 5.95312"
        stroke={strokeColor}
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.7582 19.2246V21.7877C12.7582 22.1805 12.4924 22.4993 12.1652 22.4993H11.8371C11.509 22.4993 11.2441 22.1805 11.2441 21.7877V19.2246"
        stroke={strokeColor}
        strokeWidth="0.84375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MicSVG;
