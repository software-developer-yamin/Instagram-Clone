import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/ModalAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <header className="shadow-sm border-b py-2 bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl space-x-1 mx-5 lg:mx-auto">
        <Link href="/">
          <div className="w-24 relative hidden lg:inline-grid cursor-pointer">
            <Image
              src={"https://links.papareact.com/ocw"}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
        <Link href="/">
          <div className="w-10 relative lg:hidden flex-shrink-0 cursor-pointer ">
            <Image
              src={"https://links.papareact.com/jjm"}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 rounded-md form-input border-gray-300 block w-full pl-10 sm:text-sm focus:ring-black focus:border-black"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Link href="/">
            <HomeIcon className="navBtn" />
          </Link>
          <MenuIcon className="navBtn inline-flex md:hidden" />
          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <span className="absolute flex items-center justify-center animate-pulse text-white -top-1 -right-2 text-xs w-5 h-5 rounded-full bg-red-400">
                  3
                </span>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />
              <img
                onClick={signOut}
                src={session?.user.image}
                alt=""
                className="h-10 rounded-full cursor-pointer object-contain"
              />
            </>
          ) : (
            <>
              <button className="font-bold uppercase" onClick={signIn}>
                SignIn
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
