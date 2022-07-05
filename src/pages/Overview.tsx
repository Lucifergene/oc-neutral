import { Bullseye, Title } from "@patternfly/react-core";
import {
  Page,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import React from "react";
import HomeImg from "../assets/images/home.png";

export default function Overview({ currentUser }) {
  const user = currentUser.email.split("@")[0];
  return (
    <>
      <PageSection variant={PageSectionVariants.light}>
        <Bullseye>
          <TextContent>
            {/* <Text component="h1">Welcome</Text> */}
            <img src={HomeImg} alt="home" />
            {/* <Text component="p">
            Body text should be Overpass Regular at 16px. It should have leading
            of 24px because <br />
            of it’s relative line height of 1.5.
          </Text> */}
          </TextContent>
        </Bullseye>
      </PageSection>
      {/* <div>
        <img src={HomeImg} alt="home" />
      </div> */}
    </>
  );
}
