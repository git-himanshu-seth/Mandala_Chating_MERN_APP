import React from "react";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div
      style={{
        height: "auto",
        marginTop: "20%",
        alignContent: "center",
        position: "absolute",
        left: "50%",
        right: "50%",
        top: "17%"
      }}
    >
      <CircularProgress
        color="primary"
        size={80}
        thickness={4}
      />
    </div>
  );
};

export default Loader;
