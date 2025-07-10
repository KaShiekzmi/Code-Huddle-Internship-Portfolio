import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import LinkButton from "./LinkButton";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 p-4 shadow mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/">
          <div className="flex justify-center items-center mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="h-13 mr-2 ml-1" />
            <h1 className="text-[28px] font-bold text-[#B03FE8]">Jobeify</h1>
          </div>
        </Link>
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-semibold mb-3 text-center">
            Social Media
          </h2>
          <ul className="flex flex-row md:flex-row gap-3 space-y-2 md:space-y-0">
            <LinkButton
              title="Github"
              icon="github"
              href="https://github.com/kashiekzmi"
            />
            <LinkButton
              title="LinkedIn"
              icon="linkedin"
              href="https://linkedin.com/in/kashiekzmi"
            />
            <LinkButton
              title="YouTube"
              icon="youtube"
              href="https://www.youtube.com/@kashiekazmi"
            />
          </ul>
        </div>
        <div className="mb-4 md:mb-0 text-center md:text-left mr-0 md:mr-20">
          <h2 className="text-lg font-semibold mb-2">Jobeify Pages</h2>
          <ul className="flex flex-row gap-3 lg:flex-col lg:gap-0 space-y-1">
            <li>
              <Link to="/" className="hover:text-[#9a35c6]">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/post" className="hover:text-[#9a35c6]">
                Post Job
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center my-4 text-gray-600">
        <p>
          Developed during internship at{" "}
          <a
            href="https://www.code-huddle.com/"
            target="_blank"
            className="underline hover:no-underline"
          >
            Code huddle
          </a>
          , Bahria Phase 4, Rawalpindi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
