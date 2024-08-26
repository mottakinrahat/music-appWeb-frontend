import { ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

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
  confirmText = "Confirm",
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
            <div>{message}</div>
          </div>
        </div>
        <AlertDialogFooter>
          <button onClick={onClose} className="btn btn-outline">
            {cancelText}
          </button>
          {onConfirm && (
            <button onClick={onConfirm} className="btn btn-primary">
              {confirmText}
            </button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCard;
