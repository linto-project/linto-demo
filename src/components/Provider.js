import React, { createContext, useState, useContext } from "react";

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const ContextProvider = ({ children }) => {
  const [fileName, setfilename] = useState("0-5min");
  const [reunionName, setreunionName] = useState("AMI");

  const [conf, setconf] = useState({
    locuteurActif: false,
    map: false,
  });

  const File = {
    getName: () => fileName,
    setName: (name) => {
      setfilename(name);
    },
    getReunionName: () => reunionName,
    setReunionName: (name) => {
      setreunionName(name);
    },
  };

  const confDemo = {
    getConf: () => conf,
    setConf: (event) => {
      setconf({ ...conf, [event.target.name]: event.target.checked });
    },
  };

  const state = {
    File,
    confDemo,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};
