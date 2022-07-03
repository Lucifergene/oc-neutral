import { Bullseye, Title } from "@patternfly/react-core";
import React from "react";
import HomeImg from "../assets/images/home.png";

export default function Overview({ currentUser }) {
  const user = currentUser.email.split("@")[0];
  return (
    <>
      <div style={{ height: "100vh" }}>        
        <img src={HomeImg} alt="home" />
      </div>
    </>
  );
}
