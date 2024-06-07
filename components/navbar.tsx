import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UserDropdown from "./user-dropdown";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="h-[10vh] w-full flex items-center border-b px-5 lg:px-14 justify-between ">
      <Link className="flex items-center gap-x-3" href="/">
        <Image
          height={10}
          width={10}
          src="/reddit-full.svg"
          className="h-10 w-fit"
          alt="logo"
        />

        <Image
          height={10}
          width={10}
          src="/logo-name.svg"
          alt="Reddit Desktop"
          className="h-9 w-fit hidden lg:block"
        />
      </Link>

      <div className="flex items-center gap-x-2">
        <ThemeToggle />

        {user ? (
          <UserDropdown userImage={user.picture} />
        ) : (
          <div className="flex items-center gap-x-2">
            <Button asChild>
              <LoginLink>Sign In</LoginLink>
            </Button>
            <Button asChild variant="secondary">
              <RegisterLink>Sign Up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
