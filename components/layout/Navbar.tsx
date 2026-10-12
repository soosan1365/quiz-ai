
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Menu,
  X,
  BrainCircuit,
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "My Progress", href: "/progress" },
];

type NavbarProps = {
  children: ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut({ redirectTo: "/" });
    setIsProfileOpen(false);
    setIsMenuOpen(false);
  };

  const UserMenu = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`relative ${mobile ? "w-full" : ""}`}>
      <button
        type="button"
        onClick={() => setIsProfileOpen((open) => !open)}
        aria-expanded={isProfileOpen}
        aria-label="Open profile menu"
        className={`flex items-center gap-2 rounded-xl p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
          mobile ? "w-full" : ""
        }`}
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User profile"}
            width={36}
            height={36}
            className="rounded-full border border-gray-200 object-cover dark:border-gray-700"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-200">
            {user?.name?.charAt(0) ?? "U"}
          </div>
        )}

        <span className="max-w-32 truncate text-sm font-medium text-gray-700 dark:text-gray-200">
          {user?.name ?? "My Account"}
        </span>

        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform ${
            isProfileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isProfileOpen && (
        <div
          className={`z-50 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900 ${
            mobile
              ? "mt-2 w-full"
              : "absolute right-0 top-full mt-2 w-56"
          }`}
        >
          <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-800">
            <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name}
            </p>
            {user?.email && (
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            )}
          </div>

          <Link
            href="/profile"
            onClick={() => {
              setIsProfileOpen(false);
              setIsMenuOpen(false);
            }}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <UserRound size={17} />
            Profile
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
          }}
          className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white"
        >
          <BrainCircuit className="text-violet-600" size={26} />
          <span>QuizAI</span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-violet-600 dark:text-gray-300 dark:hover:text-violet-400"
            >
              {link.label}
            </Link>
          ))}

          {user ? <UserMenu /> : children}

          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
   {user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User profile"}
            width={36}
            height={36}
            className="rounded-full border border-gray-200 object-cover dark:border-gray-700"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700 dark:bg-violet-900 dark:text-violet-200">
            {user?.name?.charAt(0) ?? "U"}
          </div>
        )}
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((open) => !open);
              setIsProfileOpen(false);
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 px-4 py-3 dark:border-gray-800 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsProfileOpen(false);
                }}
                className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800">
            {user ? <UserMenu mobile /> : children}
          </div>
        </div>
      )}
    </header>
  );
}