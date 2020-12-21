import { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./Map.css";

import backgroundImage from "../data/map2.svg";
import colors from "../data/colors";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import styled, { css, keyframes } from "styled-components";

const getAnimation = (color) => keyframes`
  0% {
    box-shadow: 0px 0px 9px 4px ${color};
  }
  100% {
    box-shadow: 0px 0px 30px 20px ${color};
  }
`;

const Circle = styled.div`
  height: 50px;
  width: 50px;
  border-color: ${(props) => props.color};
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  animation: ${(props) => getAnimation(props.color)} 1.5s linear infinite
    alternate;
`;

// working

// const useStyles = makeStyles((props) => ({
//   root: {
//     margin: "30px",
//     borderRadius: "50%",
//     boxShadow: `0px 0px 9px 4px ${props.color}`,
//     animation: `$myEffect 1500ms linear infinite alternate`,
//   },
//   "@keyframes myEffect": (props) => ({
//     "0%": {
//       boxShadow: `0px 0px 9px 4px ${props.color}`,
//     },
//     "100%": {
//       boxShadow: `0px 0px 30px 20px ${props.color}`,
//     },
//   }),
// }));

// const useStyles = makeStyles((props) => ({
//   root: {
//     animation: `$myEffect 3000ms linear infinite alternate`,
//     opacity: 0,
//     transform: "translateY(-200%)",
//   },
//   "@keyframes myEffect": {
//     "0%": {
//       opacity: 0,
//       transform: "translateY(-200%)",
//     },
//     "100%": {
//       opacity: 1,
//       transform: "translateY(0)",
//     },
//   },
// }));

const Map = ({ url, isPlaying, durationSec, setVideoLoaded }) => {
  console.log("color : " + colors[0]);

  return (
    <div
      className="map"
      style={{ backgroundImage: "url(" + backgroundImage + ")" }}
    >
      <Grid
        style={{
          height: "100%",
        }}
        container
        direction="column"
        justify="space-around"
        alignItems="center"
        spacing={10}
      >
        <Grid item>
          <Grid
            container
            spacing={8}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Circle color={colors[0]}></Circle>
            </Grid>
            <Grid item>
              <Circle color={colors[1]}></Circle>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={8}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Circle color={colors[2]}></Circle>
            </Grid>
            <Grid item>
              <Circle color={colors[3]}></Circle>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Map;
