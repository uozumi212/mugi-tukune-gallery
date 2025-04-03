import React, { useState } from "react";
import { Link } from "react-router-dom";

// ヘッダーの型定義
type HeaderProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ isOpen, setIsOpen }) => {
  // リンク押下時にメニューを閉じる
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-black text-white p-4 justify-between items-center flex overflow-x-hidden">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl title">Mugi & Tukune</h1>
        <button
          className="md:hidden focus:outline-none text-end"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <nav
        className={`md:block absolute md:static top-12 left-0 w-full h-full flex justify-end md:-auto p-4 bg-black transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-[-100%]"
        } z-20 overflow-x-hidden`}
      >
        <ul className="mt-2 md:mt-0 md:flex md:space-x-4 font-bold m-auto">
          <li>
            <Link
              to="/"
              className={`block py-2 hover:text-gray-300 text-2xl ${
                isOpen ? "border-b-2 border-white" : "text-md"
              }`}
              onClick={handleLinkClick}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/mugi"
              className={`block py-2 hover:text-gray-300 text-2xl ${
                isOpen ? "border-b-2 mt-2 border-white" : "text-md"
              }`}
              onClick={handleLinkClick}
            >
              Mugi
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
