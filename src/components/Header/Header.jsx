import { useEffect, useState } from "react";
import LOGO from "../../asset/yismaili.jpg";
import LOGOWHITE from "../../asset/yismaili.jpg";
import { BiMenuAltRight, BiMoon, BiSun } from "react-icons/bi";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { useOutroContext } from "../../Provider/OutroProvider";
import { useTranslation } from "react-i18next";
import { database } from "../config/firebase";
import { onValue, ref } from "firebase/database";

export default function Header() {
  const [t, i18n] = useTranslation();
  const [isLoaded, setisLoaded] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const {
    setGlobalVariable,
    openMobileNav,
    setOpenMobileNav,
    openlilmenu,
    setOpenlilmenu,
  } = useOutroContext();
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [buttonStyle, setButtonStyle] = useState({});
  const [buttonSelectedStyleForTheme, setButtonSelectedStyleForTheme] =
    useState({});
  const [buttonNotSelectedStyleForTheme, setButtonNotSelectedStyleForTheme] =
    useState({});
  const [buttonSelectedStyleForLang, setButtonSelectedStyleForLang] = useState(
    {}
  );
  const [buttonNotSelectedStyleForLang, setButtonNotSelectedStyleForLang] =
    useState({});
  const [isBlogAvailalble, setIsBlogAvailalble] = useState(false);
  useEffect(() => {
    const unsubscribe = onValue(ref(database, "blogs"), (snapshot) => {
      const dataObject = snapshot.val();
      setIsBlogAvailalble(dataObject);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("lang") === null) {
      localStorage.setItem("lang", "en");
      setLang(localStorage.getItem("lang"));
    }
    i18n.changeLanguage(localStorage.getItem("lang"));
  }, []);

  useEffect(() => {
    const html = document.querySelector("html");
    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  useEffect(() => {
    // Store the interval ID in state
    const delayTask = setTimeout(() => {
      // Your code to execute after the delay
      setisLoaded(true);
    }, 500);

    // Cleanup by clearing the timeout when the component unmounts
    return () => {
      clearTimeout(delayTask); // Clear the timeout if the component unmounts
    };
  }, [location.pathname]);

  useEffect(() => {
    if (openlilmenu == false) {
      setButtonStyle({ transform: "scaleY(1)" });
    }
  }, [openlilmenu]);

  const toggleMobileNav = () => {
    setOpenMobileNav(!openMobileNav);
  };
  const HandelTransition = (to) => {
    if (location.pathname === to) {
      /* empty */
    } else {
      setGlobalVariable(true);
      setTimeout(() => {
        // Your code to execute after the delay
        setisLoaded(false);
      }, 500);
      setTimeout(() => {
        // Your code to execute after the delay
        setGlobalVariable(false);
        history(to);
      }, 1000);
    }
    setOpenMobileNav(false);
  };

  const HandelopenLilMenu = () => {
    setOpenlilmenu(!openlilmenu);
    setButtonStyle({ transform: "scaleY(0)" });
  };

  const HandelcloseLilMenu = () => {
    setOpenlilmenu(!openlilmenu);
    setButtonStyle({ transform: "scaleY(1)" });
  };

  const handleThemeSwitch = () => {
    if (localStorage.getItem("theme") === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      setButtonSelectedStyleForTheme({ transform: "scaleY(0)" }); // Apply transform when switching to dark mode
      setTimeout(() => {
        setButtonSelectedStyleForTheme({ transform: "scaleY(1)" }); // Revert transform after a small delay for transition effect
      }, 500);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      setButtonSelectedStyleForTheme({ transform: "scaleY(0)" }); // Apply transform when switching to light mode
      setTimeout(() => {
        setButtonSelectedStyleForTheme({ transform: "scaleY(1)" }); // Revert transform after a small delay for transition effect
      }, 500);
    }
  };

  const handelLanguageSwitch = () => {
    setisLoaded(false);
    setGlobalVariable(true);
    setTimeout(() => {
      // Your code to execute after the delay
      setGlobalVariable(false);
      setisLoaded(true);
      HandelcloseLilMenu();
      if (localStorage.getItem("lang") === "en") {
        setLang("fr");
        localStorage.setItem("lang", "fr");
      } else if (localStorage.getItem("lang") === "fr") {
        setLang("en");
        localStorage.setItem("lang", "en");
      }
      i18n.changeLanguage(localStorage.getItem("lang"));
      setOpenMobileNav(false);
    }, 500);
  };

  return (
    <div
      className={`fixed w-full px-[3%] lg:px-[5%] 2xl:px-[10%] bg-white h-[80px] dark:bg-bg-dark flex flex-col z-50 ${
        isLoaded ? "scale-y-100" : "scale-y-0"
      } transition-all ease-in-out duration-300 origin-top`}
    >
      <div
        className={`flex justify-between py-4 z-50 ${
          openMobileNav ? "rounded-tl-md rounded-tr-md" : "rounded-md"
        }`}
      >
        <div id="logo">
          <button onClick={() => HandelTransition("/")}>
            <img
              className="w-10"
              src={theme == "dark" ? LOGOWHITE : LOGO}
              alt="younes ismaili's LOGO"
            />
          </button>
        </div>
        <div className="my-auto block lg:hidden">
          <button
            onClick={toggleMobileNav}
            className="text-2xl bg-white focus:bg-slate-50 dark:bg-bg-dark dark:focus:bg-slate-800 dark:text-white transition-all duration-100 p-2 rounded-md"
          >
            <BiMenuAltRight />
          </button>
        </div>
        <div
          id="links"
          className="my-auto hidden lg:block text-black dark:text-white"
        >
          <ul className="flex gap-5">
            <li className="font-bold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-100 rounded-md ease-in-out">
              <button onClick={() => HandelTransition("/about")}>
                {t("header_about")}
              </button>
            </li>
            <li className="font-bold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-100 rounded-md ease-in-out">
              <button onClick={() => HandelTransition("/work")}>
                {t("work")}
              </button>
            </li>
            <li className="font-bold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-100 rounded-md ease-in-out">
              <button onClick={() => HandelTransition("/contact")}>
                {t("header_contact")}
              </button>
            </li>
            {isBlogAvailalble && (
              <li className="font-bold px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-100 rounded-md ease-in-out">
                <button onClick={() => HandelTransition("/blog")}>Blog</button>
              </li>
            )}
          </ul>
        </div>
        <div className="my-auto hidden lg:flex gap-5">
          <button
            style={buttonStyle}
            onClick={HandelopenLilMenu}
            className="font-bold py-2 px-4 border-2 rounded-md border-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out"
          >
            <PiDotsThreeOutlineVerticalBold />
          </button>
        </div>
      </div>

      <div
        className={`${
          openMobileNav
            ? "scale-y-100 translate-y-0 opacity-100 delay-75 rounded-bl-md rounded-br-md"
            : "scale-y-0 -translate-y-1/2 opacity-0"
        } bg-white dark:bg-bg-dark block lg:hidden border-2 border-black rounded-md mb-1 z-50 transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 text-black dark:text-white flex flex-col">
          <button
            onClick={() => HandelTransition("/about")}
            className="font-bold px-4 py-2 hover-bg-slate-100 transition-colors duration-100 rounded-md ease-in-out text-start"
          >
            {t("header_about")}
          </button>
          <button
            onClick={() => HandelTransition("/work")}
            className="font-bold px-4 py-2 hover-bg-slate-100 transition-colors duration-100 rounded-md ease-in-out text-start"
          >
            {t("work")}
          </button>
          <button
            onClick={() => HandelTransition("/contact")}
            className="font-bold px-4 py-2 hover-bg-slate-100 transition-colors duration-100 rounded-md ease-in-out text-start"
          >
            {t("header_contact")}
          </button>
          {isBlogAvailalble && (
            <button
              onClick={() => HandelTransition("/contact")}
              className="font-bold px-4 py-2 hover-bg-slate-100 transition-colors duration-100 rounded-md ease-in-out text-start"
            >
              Blog
            </button>
          )}
          <div className="font-bold py-2 px-4 rounded-md transition-all duration-100 ease-in-out">
            <button
              style={buttonStyle}
              onClick={HandelopenLilMenu}
              className="font-bold py-2 px-4 border-2 rounded-md border-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out"
            >
              <p className="rotate-90">
                <PiDotsThreeOutlineVerticalBold />
              </p>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`lg:w-fit w-full relative bg-bg-light dark:bg-bg-dark ml-auto rounded-md border-2 border-bg-dark dark:border-bg-light p-2 flex justify-between lg:flex-col gap-2 origin-top ${
          openlilmenu ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } transition-all duration-200 ease-in-out`}
      >
        <div className="flex gap-2">
          <button
            disabled={theme == "dark"}
            style={
              theme == "dark"
                ? buttonSelectedStyleForTheme
                : buttonNotSelectedStyleForTheme
            }
            onClick={handleThemeSwitch}
            className={`font-bold py-2 px-4 border-2 rounded-md border-black hover:bg-black ${
              theme == "dark" ? "bg-white text-black" : ""
            } hover:text-white dark:border-white dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out`}
          >
            <BiMoon />
          </button>
          <button
            disabled={theme == "light"}
            style={
              theme == "light"
                ? buttonSelectedStyleForTheme
                : buttonNotSelectedStyleForTheme
            }
            onClick={handleThemeSwitch}
            className={`font-bold py-2 px-4 border-2 rounded-md border-black hover:bg-black ${
              theme == "light" ? "bg-black text-white" : ""
            } hover:text-white dark:border-white dark:text-white dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out`}
          >
            <BiSun />
          </button>
        </div>
        <div className="flex gap-2">
          <button
            disabled={lang == "en"}
            style={
              lang == "en"
                ? buttonSelectedStyleForLang
                : buttonNotSelectedStyleForLang
            }
            onClick={() => handelLanguageSwitch()}
            className={`font-bold py-2 px-4 border-2 rounded-md border-black hover:bg-black ${
              lang == "en"
                ? "text-white bg-black dark:text-bg-dark dark:bg-white"
                : "text-black bg-white dark:text-white dark:bg-black"
            } hover:text-white dark:border-white dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out`}
          >
            En
          </button>
          <button
            disabled={lang == "fn"}
            style={
              lang == "fr"
                ? buttonSelectedStyleForLang
                : buttonNotSelectedStyleForLang
            }
            onClick={() => handelLanguageSwitch()}
            className={`font-bold py-2 px-4 border-2 rounded-md border-black hover:bg-black ${
              lang == "fr"
                ? "text-white bg-black dark:text-bg-dark dark:bg-white"
                : "text-black bg-white dark:text-white dark:bg-black"
            } hover:text-white dark:border-white  dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out`}
          >
            Fr
          </button>
        </div>
        <div className="flex">
          <button
            onClick={HandelcloseLilMenu}
            className="font-bold w-full py-2 px-4 border-2 rounded-md border-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-bg-light dark:hover:text-black origin-bottom transition-all duration-300 ease-in-out"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
