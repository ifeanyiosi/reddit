/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface iAppProps {
  userImage: string | null;
}

export default function UserDropdown({ userImage }: iAppProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3">
          <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />

          <img
            className="rounded-full h-8 w-8 hidden lg:block"
            src={
              userImage ??
              "https://www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg"
            }
            alt=""
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[200px]" align="end">
        <DropdownMenuItem>
          <Link className="w-full" href="/r/create">
            Create Community
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link className="w-full" href="/r/create">
            Create Post
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link className="w-full" href="/settings">
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutLink className="w-full">Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
