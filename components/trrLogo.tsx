import React from "react";
import FullLogo from "../data/logo-full.svg";
import Image from "next/image";
const trrLogo = () => {
  return (
    <div className="relative flex-[0.6] flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-[56px] font-serif mt-4 mb-4 text-textWhite">
        T R R
      </p>
      <Image className="absolute opacity-30" src={FullLogo} alt=""></Image>
    </div>
  );
};

export default trrLogo;
