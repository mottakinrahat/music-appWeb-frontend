"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

export function DropDownBtn({ buttonContent, dropDownContent, onClick }: any) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button onClick={onClick} className="text-white z-50">
          {buttonContent}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md w-full">
        {dropDownContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
