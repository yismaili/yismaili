import React from "react";
import LOGO from "../../asset/yismaili-dark.png";
import { ImBlog } from "react-icons/im";
import { RiEditBoxFill } from "react-icons/ri";
import { PiSignOutFill } from "react-icons/pi";
import { getAuth, signOut } from "firebase/auth";

import { app } from "../config/firebase";

export default function SideBar({ setPage }) {
  const auth = getAuth(app);
  const HandelSignout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  return (
    <div className="flex flex-col justify-between h-full bg-slate-50 w-[100px]">
      <div className="w-full flex py-3">
        <a href="/">
          <img src={LOGO} alt="" className="w-[50%] mx-auto" />
        </a>
      </div>
      <div className="w-full">
        <ul className="w-full flex flex-col gap-2">
          <li className="bg-transparent hover:bg-slate-200 rounded-md mx-auto transition-colors duration-200 ease-in-out">
            <button onClick={() => setPage(0)} className="block p-4 text-xl">
              <ImBlog />
            </button>
          </li>
          <li className="bg-transparent hover:bg-slate-200 rounded-md mx-auto transition-colors duration-200 ease-in-out">
            <button onClick={() => setPage(1)} className="block p-4 text-xl">
              <RiEditBoxFill />
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full flex my-2">
        <button
          onClick={HandelSignout}
          className="text-2xl m-auto bg-transparent hover:bg-slate-200 rounded-md mx-auto transition-colors duration-200 ease-in-out p-5"
        >
          <PiSignOutFill />
        </button>
      </div>
    </div>
  );
}