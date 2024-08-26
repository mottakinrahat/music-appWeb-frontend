import { toast } from "sonner";
import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

interface ToastCardProps {
  title: string;
  message: any;
  icon?: ReactNode;
  duration?: number;
  position?:
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center"
    | "top-right"
    | "top-left";
}

const ToastCard = ({
  title,
  message,
  icon,
  duration = 3000,
  position = "top-center",
}: ToastCardProps) => {
  toast(
    <div className="flex items-center space-x-3">
      {icon && <div>{icon}</div>}
      <div>
        <div className="font-bold">{title}</div>
        <div>{message}</div>
      </div>
    </div>,
    { duration }
  );
  return <Toaster position={position} />;
};

export default ToastCard;
