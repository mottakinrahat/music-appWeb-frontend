"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DropDownBtn({ buttonContent, dropDownContent, onClick }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled
          onClick={onClick}
          className="text-white cursor-pointer"
        >
          {buttonContent}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-md w-full">
        {dropDownContent}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
