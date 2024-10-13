"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/constants";
import Link from "next/link";
const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-white font-semibold">
      <div className="container px-4 mx-auto relatve text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-wide font-bold">
              SimplyStepup
            </span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index} className="hover:underline cursor-pointer">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            <Link
              href="login"
              className="py-2 px-3 border rounded-md font-semibold"
            >
              Log In
            </Link>
            <Link
              href="register"
              className="bg-sky-500 py-2 px-3 rounded-md font-semibold"
            >
              Sign Up
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-gradient-to-r from-cyan-400 to-fuchsia-400 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-2 hover:underline cursor-pointer">
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6 mt-2">
              <Link
                href="login"
                className="py-2 px-3 border rounded-md font-semibold"
              >
                Log In
              </Link>
              <Link
                href="register"
                className="py-2 px-3 rounded-md bg-sky-500 font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
