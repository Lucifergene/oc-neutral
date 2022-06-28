import React from "react";
import { Link } from "react-router-dom";
import {
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  Button,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/js/icons/bars-icon";

const Navbar = ({ setIsNavOpen, isNavOpen }) => {
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const headerToolbar = (
    <Toolbar id="toolbar">
      <ToolbarContent>
        <ToolbarItem>header-tools</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  return (
    <Masthead
      id="stack-masthead"
      display={{ default: "inline", lg: "stack", "2xl": "inline" }}
    >
      <MastheadToggle>
        <PageToggleButton
          variant="plain"
          aria-label="Global navigation"
          isNavOpen={isNavOpen}
          onNavToggle={handleNavToggle}
        >
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand>
          <Link to="/">Neutral</Link>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );
};
export default Navbar;
