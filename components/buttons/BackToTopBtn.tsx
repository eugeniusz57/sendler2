"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const BackToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
    className={`fixed flex items-center justify-center right-auto bottom-5 bg-transparent border-2 border-greenBtn text-greenBtn rounded-full md:hover:scale-105 transition-all text-center w-12 h-12 text-3xl ${
      isVisible ? "opacity-100" : "opacity-0"
    } sm:w-16 sm:h-16 sm:text-2xl md:w-20 md:h-20 md:text-3xl lg:w-24 lg:h-24 lg:text-4xl`}
    onClick={scrollToTop}
  >
    <span className="flex items-center justify-center w-full h-full "><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg></span>
  </button>
  );
};
 
export default BackToTopBtn;
