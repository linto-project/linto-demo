import React, { createContext, useState, useContext } from "react";

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const ContextProvider = ({ children }) => {
  const [fileName, setfilename] = useState("0-5min");
  const [reunionName, setReunionName] = useState("AMI");

  const File = {
    getName: () => fileName,
    setName: (name) => {
      setfilename(name);
    },
    getReunionName: () => reunionName,
    setReunionName: (name) => {
      setReunionName(name);
    },
  };

  const state = {
    File,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};
