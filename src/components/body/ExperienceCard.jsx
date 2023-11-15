import { useState } from "react";

export default function ProjectCard({
  title,
  smdesc,
  techs,
  isLoaded,
  dated,
  datef,
}) {
  const techsArray = techs.split(",");
  const [Hovered, setHovered] = useState(false);
  return (
    <li
      className={`max-w-full ${
        Hovered ? "dark:bg-[#525252] bg-gray-50" : ""
      } px-2 md:max-w-1/2 lg:max-w-1/4 border-2 lg:border-0 relative origin-top rounded-lg ${
        isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
      } transition-all duration-500 ease-in-out group lg:hover:!opacity-100 lg:group-hover/list:opacity-50`}
    >
      <div
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex flex-col">
          <div
            id="title"
            className="py-3 flex flex-col lg:flex-row justify-between"
          >
            <h1
              className={`lg:text-3xl text-start md:text-xl text-lg text-bg-dark dark:text-bg-light font-bold origin-bottom ${
                isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-150 ease-in-out delay-700`}
            >
              {title}
            </h1>
            <div className="my-auto">
              <p
                className={`dark:text-white text-black font-bold text-xs lg:text-sm`}
              >
                {dated} {" -> "} {datef}
              </p>
            </div>
          </div>
          <div
            id="description_tags"
            className={`border-t-2 border-black dark:border-white py-2 flex flex-col lg:flex-row gap-3 justify-between origin-left ${
              isLoaded ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
            } transition-all duration-300 ease-in-out delay-500`}
          >
            <div className="my-auto">
              <p
                className={`capitalize text-bg-dark dark:text-bg-light origin-top ${
                  isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                } transition-all duration-150 ease-in-out delay-700`}
              >
                {smdesc}
              </p>
            </div>
            <div
              className={`grid grid-cols-2 lg:flex gap-3 origin-bottom  ${
                isLoaded ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
              } transition-all duration-300 ease-in-out delay-700`}
            >
              {techsArray.map((tech, index) => (
                <p
                  key={index}
                  className="lg:px-4 lg:py-1 px-2 py-[2px] border-bg-dark text-bg-dark dark:border-bg-light dark:text-bg-light border-[1px] lg:border-[2px] rounded-full text-sm"
                >
                  {tech}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
