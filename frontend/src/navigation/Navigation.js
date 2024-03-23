import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-[100%] flex justify-between px-[300px] py-[30px]">
      <span>logo</span>
      <Link to={"/home"}>Home</Link>
      <span>log out</span>
    </div>
  );
};

export default Navigation;
