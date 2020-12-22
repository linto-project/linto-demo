import React, { createContext, useState, useContext } from "react";
import { timeline } from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const ContextProvider = ({ children }) => {
  const [fileName, setfilename] = useState("0-5min");
  const [reunionName, setreunionName] = useState("AMI");
  const [annot, setannot] = useState([]);
  const [time, settime] = useState();
  const [conf, setconf] = useState({
    locuteurActif: false,
    map: false,
    annotation: false,
    seuilLocuteur: 0.0,
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
    // Default: switch
    setConf: (event) => {
      setconf({ ...conf, [event.target.name]: event.target.checked });
    },
    getSetterConf: (name) => {
      const test = (v) => setconf({ ...conf, [name]: v });
      return test;
    },
  };

  const Player = {
    getTime: () => time,
    setTime: (e) => {
      settime(e);
    },
  };

  const Annotation = {
    getAnnot: () => annot,
    setAnnot: (e) => {
      setannot(e);
    },
  };

  const state = {
    File,
    confDemo,
    Player,
    Annotation,
  };

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};
