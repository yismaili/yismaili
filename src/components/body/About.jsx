import { useEffect, useState } from "react";
import { useOutroContext } from "../../Provider/OutroProvider";
import ExperienceCard from "./ExperienceCard";
import { FiArrowUpRight } from "react-icons/fi";
import resen from "../../asset/yismaili.pdf";
import resfr from "../../asset/yismaili.pdf";
import FileSaver from "file-saver";
import { useTranslation } from "react-i18next";

export default function About() {
  const [isLoaded, setisLoaded] = useState(false);
  const { globalVariable, ExpData, setOpenMobileNav, setOpenlilmenu } =
    useOutroContext();
  const [filteredProjects, setfilteredProjects] = useState(null);
  const [t] = useTranslation();

  useEffect(() => {
    // Store the interval ID in state
    setfilteredProjects([]);
    setfilteredProjects(ExpData.sort((a, b) => b.id - a.id));
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
  }, [globalVariable, ExpData]);

  const SavePdf = () => {
    if (localStorage.getItem("lang") === "en") {
      FileSaver.saveAs(resen, "resume English version - yismaili.pdf");
    } else {
      FileSaver.saveAs(resfr, "cv version française- yismaili.pdf");
    }
  };

  const HandelNavClose = () => {
    setOpenlilmenu(false);
    setOpenMobileNav(false);
  };

  return (
    <div
      onClick={HandelNavClose}
      id="about"
      className="h-screen w-screen lg:pt-[100px] pt-[80px] pb-5 bg-bg-light dark:bg-bg-dark 2xl:px-[10%] lg:px[5%] px-[5%] flex flex-col lg:flex-row gap-10 lg:gap-16 "
    >
      <div className="mx-auto lg:hidden flex flex-col relative w-full h-[85px]">
        <div
          className={`bg-bg-dark dark:bg-bg-light mx-auto w-[200px] h-[50px] flex flex-col relative items-center justify-end ${
            isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } origin-top transition-all ease-in-out duration-500`}
        ></div>
        <h1
          className={`text-white mix-blend-difference text-3xl font-bold text-center absolute bottom-0 left-1/2 -translate-x-1/2 origin-center ${
            isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } transition-all duration-500 ease-in-out delay-100`}
        >
          {t("about")}
        </h1>
      </div>
      <div className="mx-auto h-full w-1/2 lg:mx-0 hidden lg:block">
        <div
          className={`bg-bg-dark dark:bg-bg-light w-full h-1/2 flex flex-col items-center justify-end ${
            isLoaded ? "scale-y-100" : "scale-y-0"
          } origin-top transition-all ease-in-out duration-500`}
        >
          <h1
            className={`text-white mix-blend-difference 2xl:text-[170px] lg:text-[120px] font-bold relative bottom-0 origin-bottom ${
              isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            } transition-all duration-500 ease-in-out delay-100`}
          >
            {localStorage.getItem("lang") === "fr" ? (
              <>{t("about").substring(0, 5)}</>
            ) : (
              <>
                AB<span className="left-half">O</span>
              </>
            )}
          </h1>
        </div>
        <div className="h-1/2">
          <h1
            className={`dark:text-white text-black 2xl:text-[170px] lg:text-[120px] font-bold text-center origin-top ${
              isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            } transition-all duration-500 ease-in-out delay-200`}
          >
            {localStorage.getItem("lang") === "fr" ? (
              <>{t("about").substring(5)}</>
            ) : (
              <>
                <span className="right-half">O</span>UT
              </>
            )}
          </h1>
        </div>
      </div>
      <div
        id="exp"
        className={`m-auto lg:w-1/2 w-full flex h-full lg:mt-0 overflow-y-auto origin-top ${
          isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } transition-all ease-in-out duration-300`}
      >
        <div className="h-full flex flex-col gap-5 px-2">
          <p
            className={`lg:text-2xl text-justify text-black dark:text-white origin-top ${
              isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            } transition-all duration-500 ease-in-out delay-300`}
          >
            <div dangerouslySetInnerHTML={{ __html: t("bio") }} />
          </p>
          <button
            onClick={SavePdf}
            className={`flex gap-5 px-4 py-2 w-fit text-bg-dark dark:text-bg-light hover:bg-slate-100 dark:hover:bg-[#525252] rounded transition-all ease-in-out duration-200 lg:text-2xl text-xl origin-top ${
              isLoaded
                ? "scale-y-100 opacity-100 delay-50"
                : "scale-y-0 opacity-0 delay-300"
            } transition-all duration-300 ease-in-out`}
          >
            <p className="h-fit my-auto">
              <FiArrowUpRight />
            </p>
            <p>CV</p>
          </button>
          <h1
            className={`lg:text-4xl text-2xl font-bold text-justify text-black dark:text-white origin-top ${
              isLoaded ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
            } transition-all duration-500 ease-in-out delay-300`}
          >
            {t("experiences")}
          </h1>
          {filteredProjects && filteredProjects.length > 0 ? (
            <div className="">
              <ol className="group/list flex flex-col gap-5">
                {/* {filteredProjects.map((ExpData) => (
                  <ExperienceCard
                    title={ExpData.role}
                    smdesc={ExpData.interprise}
                    techs={ExpData.techs}
                    key={ExpData.id}
                    dated={ExpData.date_d}
                    datef={ExpData.date_f}
                    isLoaded={isLoaded}
                  />
                ))} */}
              </ol>
            </div>
          ) : (
            <div className="p-4 text-black dark:text-white w-full text-center">
              {isLoaded ? "No project of this type yet" : "Loading ..."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
