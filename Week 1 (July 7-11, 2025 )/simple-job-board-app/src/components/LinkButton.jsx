import React from "react";

const LinkButton = (props) => {
  return (
    <li>
      <a
        href={props.href}
        className="rounded-full py-1.5 px-2 hover:bg-[#9a35c6] hover:text-white transition duration-300 cursor-pointer "
        target="_blank"
      >
        <i className={`fab fa-${props.icon}`}></i> {props.title}
      </a>
    </li>
  );
};

export default LinkButton;
