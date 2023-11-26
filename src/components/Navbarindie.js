import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const navigate = useNavigate();

  const logOutUser = () => {
    localStorage.clear();
    navigate(0);
  };
  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div
            className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
          >
            <span className="text-3xl text-lime-500 mr-1 pt-2">
              <ion-icon name="leaf-outline"></ion-icon>
            </span>
            <a href="/home">MyGAIA</a>
          </div>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-[75px] " : "top-[-490px]"
            }`}
          >
            <button className="sm: text-sm" onClick={logOutUser}>
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Nav;
