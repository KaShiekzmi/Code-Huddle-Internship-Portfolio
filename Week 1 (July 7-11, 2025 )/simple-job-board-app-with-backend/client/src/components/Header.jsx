import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";

const Header = () => {
  return (
    <header className="bg-white text-gray-800 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="h-13 mr-2 ml-1" />
            <h1 className="text-[28px] font-bold text-[#B03FE8]">Jobeify</h1>
          </div>
        </Link>
        <Link
          to="/post"
          className="bg-[#B03FE8] text-white px-4 py-2 rounded-full hover:bg-[#9a35c6] transition duration-300"
        >
          Post Job
        </Link>
      </div>
    </header>
  );
};

export default Header;
