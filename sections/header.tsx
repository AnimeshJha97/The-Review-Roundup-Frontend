"use client";

import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiUser, BiSearchAlt } from "react-icons/bi";
const headerItems = [
  "Movies",
  "TV Series",
  "Destinations",
  "Games",
  "Live Shows",
  "Books",
];

interface propType {
  overlay: boolean;
}

const Header = ({ overlay }: propType) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [searchInputVal, setSearchInputVal] = useState<string>("");
  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setOpenSearch(false);
      setTimeout(() => alert(`Searched Item is ${searchInputVal}`), 10);
    }
  };

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchInputVal(e.target.value);
  };

  return (
    <div
      className={
        overlay
          ? "relative h-[90vh] text-textWhite z-[99]"
          : "relative text-textWhite z-[99]"
      }
    >
      <div className="h-2 bg-primary w-screen mb-[-2px]" />
      <div className="bg-bgHeader backdrop-blur-sm flex justify-between items-center pl-[120px] pr-[120px]">
        {/* logo */}
        <a href="/" className="font-bold text-[32px] font-serif mt-4 mb-4">
          T R R
        </a>
        {/* Header-items */}
        <div className="flex items-center gap-12">
          {headerItems.map((item) => (
            <div
              key={item}
              className="group cursor-pointer justify-center flex items-center w-[140px]"
            >
              {/* <div className="mt-[-52px] h-2 w-full bg-primary hidden group-hover:block" /> */}
              <div className="flex justify-center items-center gap-2">
                <p className="group-hover:text-primary text-md" key={item}>
                  {item}
                </p>
                <span className="invisible group-hover:visible text-primary text-[24px]">
                  <IoMdArrowDropdown />
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* profile items */}
        <div className="flex justify-between items-center text-[24px] gap-4">
          <div className="flex flex-col gap-4 items-end">
            <BiSearchAlt
              className="hover:text-primary "
              onClick={() => handleSearch()}
            />
            {openSearch ? (
              <input
                type="text"
                placeholder="What's on your mind"
                style={{
                  all: "unset",
                  position: "absolute",
                  top: "64px",
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                  width: "300px",
                  background: "white",
                  padding: "8px 4px",
                  borderRadius: "8px",
                }}
                onKeyDown={(e) => handleSearchKeyDown(e)}
                onChange={(e) => handleSearchInputChange(e)}
                autoFocus
              />
            ) : null}
          </div>
          <BiUser className="hover:text-primary " />
        </div>
      </div>
    </div>
  );
};

export default Header;
