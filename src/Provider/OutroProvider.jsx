import { createContext, useContext, useState, useEffect } from 'react';
import Papa from "papaparse";

const OutroContext = createContext();

export const useOutroContext = () => {
  return useContext(OutroContext);
};

export const OutroProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(false);
  const [Data, setData] = useState([]);
  const [ExpData, setExpData] = useState([]);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [openlilmenu, setOpenlilmenu] = useState(false);

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgnMZhGepGyF-ZvdhosWwA2dwdBTTtUWP1i84KEgaCLnQNZJusFYQa5p19GSfbzOJVTARyQ-xs5S-F/pub?gid=0&single=true&output=csv",
      {
        download: true,
        header: true,
         newline: "",
        complete: (results) => {
          setData(results.data);
        },
      }
    );
    console.log(Data)
  }, [Data, globalVariable]); // Run this effect only once on component mount

  useEffect(() => {
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgnMZhGepGyF-ZvdhosWwA2dwdBTTtUWP1i84KEgaCLnQNZJusFYQa5p19GSfbzOJVTARyQ-xs5S-F/pub?gid=0&single=true&output=csv",
      // "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZg7oUtiNr1MxOild1zCNj6P8AXk9gNMdHDXm6AtyUh6-YGNc4RdvHKP6OFixG1WQN4OY_xWWzW4Mu/pub?gid="+ (localStorage.getItem("lang")=="en" ? "2133287984" : "1236863901")+"&single=true&output=csv",
      {
        download: true,
        header: true,
        newline: "",
        complete: (results) => {
          setExpData(results.data);
        },
      }
    );
  }, [globalVariable]); // Run this effect only once on component mount

  return (
    <OutroContext.Provider value={{ globalVariable, setGlobalVariable, Data, ExpData, openMobileNav, setOpenMobileNav, openlilmenu, setOpenlilmenu }}>
      {children}
    </OutroContext.Provider>
  );
};
