import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="flex p-2 items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center gap-x-2">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={50}
          // className="h-10 w-auto"
        />

        <h1 className="text-2xl font-bold text-gray-800">QuackDebug</h1>
      </div>
    </header>
  );
};

export default Header;
