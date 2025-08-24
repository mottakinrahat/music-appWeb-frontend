import { ReactNode} from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import OutlineButton from "../ui/outlineButton";

interface AlertCardProps {
  title: string;
  message: ReactNode;
  icon?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AlertCard = ({
  title,
  message,
  icon,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Ok",
  cancelText = "Cancel",
}: AlertCardProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <div className="flex items-center space-x-3">
          {icon && <div>{icon}</div>}
          <div>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </div>
        </div>
        <AlertDialogFooter>
          <Button onClick={onClose} className="">
            {cancelText}
          </Button>
          {onConfirm && (
            <OutlineButton onClick={onConfirm} className="">
              {confirmText}
            </OutlineButton>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCard;
