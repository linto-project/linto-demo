import React, { createContext, useState, useContext, useEffect } from "react";

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const ContextProvider = ({ children }) => {
  const [fileName, setfilename] = useState("0-5min");
  const [reunionName, setreunionName] = useState("Linto");
  const [annot, setannot] = useState([]);
  const [playing, setplaying] = useState(false);

  const [player, setplayer] = useState({
    time: 0,
  });

  const [conf, setconf] = useState({
    locuteurActif: false,
    map: false,
    annotation: false,
    typeAnnotationLocuteur: "ML",
    seuilLocuteur: 0.0,
    transcript: true,
    actLanguage: false,
    typeAnnotationDialogue: "ML",
  });

  // Rename: file
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

  // Rename: player
  const Player = {
    getTime: () => player.time,
    setTime: (e) => {
      const tempo = { ...player, time: e };
      setplayer(tempo);
    },

    getPlaying: () => playing,

    togglePlaying: () => {
      const temp = !playing;
      console.log(temp);
      setplaying(temp);
    },
    getSetterPlaying: () => setplayer,
  };

  // Rename: annotation
  const Annotation = {
    // Rename: getAnnotation
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

  // Reset state when changing corpus / file
  useEffect(() => {
    setplaying(false);
    setplayer({
      time: 0,
    });
    setconf({
      locuteurActif: false,
      map: false,
      annotation: false,
      seuilLocuteur: 0.0,
      typeAnnotationLocuteur: "ML",
      typeAnnotationDialogue: "ML",
      transcript: true,
    });
  }, [fileName, reunionName]);

  useEffect(() => {
    console.log("conf : ");
    console.log(conf);
  }, [conf]);

  useEffect(() => {
    // console.log("Time  : ");
    // console.log(player);
  }, [player]);

  return (
    <GlobalContext.Provider value={state}>{children}</GlobalContext.Provider>
  );
};
