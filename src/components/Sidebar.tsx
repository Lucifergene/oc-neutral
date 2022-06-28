import {
  Nav,
  NavItem,
  NavList,
  PageSidebar,
} from "@patternfly/react-core/dist/esm/components";
import React from "react";
import { Link } from "react-router-dom";

const SidebarNav = () => {
  return (
    <Nav aria-label="Nav">
      <NavList>
        <NavItem itemId={0} to="#">
          <Link to="/upload">Upload Configuration</Link>
        </NavItem>
        <NavItem itemId={1} to="#">
          <Link to="/configs">Configurations</Link>
        </NavItem>
        <NavItem itemId={2} to="#">
          <Link to="/k8s/deployments">Deployments</Link>
        </NavItem>
        <NavItem itemId={3} to="#">
          <Link to="/k8s/services">Services</Link>
        </NavItem>
      </NavList>
    </Nav>
  );
};

function Sidebar({ isNavOpen }) {
  return <PageSidebar nav={<SidebarNav />} isNavOpen={isNavOpen} />;
}

export default Sidebar;
