import React from "react";
import ControlButton from "../components/ControlButton";
import styled from "styled-components";

const StyledMain = styled.main`
.div {
  text-align: center;
  justify-content: center;
  align-items: center;
}
.h1 {
  text-align: center;
}
  }
`;


function Control() {


  return (
    <div>
      <br />
      <StyledMain>
        <div className="div">
          <iframe title="Live" width="560" height="315" src="https://www.youtube.com/embed/live_stream?channel=UC0Hu-_pAlzKFhiZPqDAUbIw" frameBorder="0" allowFullScreen></iframe>
        </div>
      </StyledMain>
      <br />
      <h1 style={{textDecoration: "underline", textDecorationColor: "#a6eae2", textDecorationThickness: 5}}>로봇 조작</h1>
      <ControlButton />
    </div>
  )
};

export default Control;