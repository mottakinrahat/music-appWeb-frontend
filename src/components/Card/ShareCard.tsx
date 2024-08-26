import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookMessengerShareButton,
} from "react-share";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import {
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaTelegram,
  FaFacebookMessenger,
} from "react-icons/fa";

interface AlertDialogFace {
  open: boolean;
  shareUrl: string;
  setOpen: (isOpen: boolean) => void;
}

const ShareCard = ({ open, shareUrl, setOpen }: AlertDialogFace) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share content with your friends!</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex space-x-4">
          <FacebookShareButton url={shareUrl}>
            <FaFacebook size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <FaTwitter size={32} />
          </TwitterShareButton>
          <EmailShareButton url={shareUrl}>
            <FaEnvelope size={32} />
          </EmailShareButton>
          <WhatsappShareButton url={shareUrl}>
            <FaWhatsapp size={32} />
          </WhatsappShareButton>
          <TelegramShareButton url={shareUrl}>
            <FaTelegram size={32} />
          </TelegramShareButton>
        </div>
        <AlertDialogFooter>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShareCard;
