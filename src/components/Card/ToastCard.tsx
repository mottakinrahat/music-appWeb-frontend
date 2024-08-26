import { toast } from "sonner";
import { ReactNode } from "react";
import { Toaster } from "../ui/sonner";

interface ToastCardProps {
  title: string;
  message: any;
  icon?: ReactNode;
  duration?: number;
}

const ToastCard = ({
  title,
  message,
  icon,
  duration = 3000,
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
  return null;
};

export default ToastCard;
