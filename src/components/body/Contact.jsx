import React, { useState, useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useOutroContext } from "../../Provider/OutroProvider";

export default function Contact() {
  const [isLoaded, setisLoaded] = useState(false);
  const { globalVariable, setOpenMobileNav, setOpenlilmenu } =
    useOutroContext();

  useEffect(() => {
    // Store the interval ID in state
    if (globalVariable) {
      setisLoaded(false);
    } else {
      const delayTask = setTimeout(() => {
        // Your code to execute after the delay
        setisLoaded(true);
      }, 800);

      // Cleanup by clearing the timeout when the component unmounts
      return () => {
        clearTimeout(delayTask); // Clear the timeout if the component unmounts
      };
    }
  }, [globalVariable]);

  const HandelNavClose = () => {
    setOpenlilmenu(false);
    setOpenMobileNav(false);
  };
  return (
    <div
      onClick={HandelNavClose}
      className="w-screen h-screen px-[5%] lg:px-[5%] 2xl:px-[10%] pt-20 flex bg-bg-light dark:bg-bg-dark"
    >
      <div className="flex flex-col gap-5 my-[10%] w-full">
        <h1
          className={`lg:text-7xl text-5xl text-bg-dark dark:text-bg-light font-bold text-start origin-top ${
            isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } transition-all duration-300 ease-in-out`}
        >
          CONTACT
        </h1>
        <div
          className={`lg:h-2 h-1 w-full bg-bg-dark dark:bg-bg-light origin-left ${
            isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          } transition-all duration-300 ease-in-out delay-100`}
        ></div>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          <div
            id="mail"
            className="flex lg:gap-10 gap-2 text-2xl h-fit flex-col lg:flex-row"
          >
            <h1
              className={`my-auto font-bold text-start text-bg-dark dark:text-bg-light origin-top ${
                isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-300 ease-in-out delay-200`}
            >
              E-MAIL
            </h1>{" "}
            <a
              href="mailto:yismaili1337@gmail.com"
              className={`flex gap-5 px-4 py-2 text-bg-dark dark:text-bg-light hover:bg-slate-100 dark:hover:bg-[#525252] rounded transition-all ease-in-out duration-200 lg:text-2xl text-xl origin-top ${
                isLoaded
                  ? "scale-y-100 opacity-100 delay-50"
                  : "scale-y-0 opacity-0 delay-300"
              } transition-all duration-300 ease-in-out`}
            >
              <p className="h-fit my-auto">
                <FiArrowUpRight />
              </p>
              <p>yismaili1337@gmail.com</p>
            </a>
          </div>
          <div
            id="social"
            className="flex lg:gap-10 gap-2 text-2xl flex-col lg:flex-row"
          >
            <h1
              className={`font-bold my-2 text-start text-bg-dark dark:text-bg-light origin-top ${
                isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-300 ease-in-out delay-200`}
            >
              ONLINE PRESENCE
            </h1>
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/in/yo-ismaili/"
                  className={`flex gap-5 px-4 py-2 text-bg-dark dark:text-bg-light hover:bg-slate-100 dark:hover:bg-[#525252] rounded transition-all ease-in-out duration-200 lg:text-2xl text-xl origin-top ${
                    isLoaded
                      ? "scale-y-100 opacity-100 delay-50"
                      : "scale-y-0 opacity-0 delay-300"
                  } transition-all duration-300 ease-in-out`}
                >
                  <p className="h-fit my-auto">
                    <FiArrowUpRight />
                  </p>
                  <p>LinkedIn</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yo-ismaili/"
                  className={`flex gap-5 px-4 py-2 text-bg-dark dark:text-bg-light hover:bg-slate-100 dark:hover:bg-[#525252] rounded transition-all ease-in-out duration-200 lg:text-2xl text-xl origin-top ${
                    isLoaded
                      ? "scale-y-100 opacity-100 delay-50"
                      : "scale-y-0 opacity-0 delay-300"
                  } transition-all duration-300 ease-in-out`}
                >
                  <p className="h-fit my-auto">
                    <FiArrowUpRight />
                  </p>
                  <p>samething</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
