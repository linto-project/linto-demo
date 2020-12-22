import { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import "./Map.css";

import backgroundImage from "../data/map2.svg";
import colors from "../data/colors";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import styled, { keyframes } from "styled-components";

const getAnimation = (color, speaking) => keyframes`
  0% {
    box-shadow: 0px 0px 9px 4px ${color};
  }
  100% {
    box-shadow: 0px 0px ${speaking ? "30px 20px " : "9px 6px "} ${color};
  }
`;

const Circle = styled.div`
  height: 50px;
  width: 50px;
  border-color: ${(props) => props.color};
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  animation: ${(props) => getAnimation(props.color, props.speaking)} 1.5s linear
    infinite alternate;
`;

const Map = ({ selection }) => {
  const grey = "#757575";

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
            spacing={10}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Circle
                speaking={selection[0]}
                color={selection[0] ? colors[0] : grey}
              ></Circle>
            </Grid>
            <Grid item>
              <Circle
                speaking={selection[1]}
                color={selection[1] ? colors[1] : grey}
              ></Circle>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            spacing={10}
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <Circle
                speaking={selection[2]}
                color={selection[2] ? colors[2] : grey}
              ></Circle>
            </Grid>
            <Grid item>
              <Circle
                speaking={selection[3]}
                color={selection[3] ? colors[3] : grey}
              ></Circle>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Map;
