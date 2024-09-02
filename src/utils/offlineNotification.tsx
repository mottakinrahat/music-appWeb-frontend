"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useOnlineStatus from "@/hooks/useOnlineStatus";

const OfflineNotification = () => {
  const isOnline = useOnlineStatus();
  const router = useRouter();

  useEffect(() => {
    if (isOnline) {
      toast.error(
        <div>
          <p>You are offline. </p>
          <button
            onClick={() => router.push("/offline")}
            className="underline text-blue-500 hover:text-green-500"
          >
            Go to Offline Page
          </button>
        </div>,
        {
          duration: 10000, // Keep the notification visible until the user interacts
          style: {
            backgroundColor: "#fffff", // Red background color
            color: "#00000", // White text color
            padding: "10px", // Padding around the notification
          },
        }
      );
    }
  }, [isOnline, router]);

  return null; // This component does not render anything
};

export default OfflineNotification;
