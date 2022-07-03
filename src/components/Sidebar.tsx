import {
  Nav,
  NavGroup,
  NavItem,
  NavList,
  PageSidebar,
} from "@patternfly/react-core/dist/esm/components";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarNav = ({ settings }) => {
  const [activeItem, setActiveItem] = useState(0);
  const navItems = Object.keys(settings);

  const onSelect = (result) => {
    setActiveItem(result.itemId);
  };

  return (
    <Nav aria-label="Nav" onSelect={onSelect}>
      <NavGroup>
        <NavItem itemId={0} to="#" isActive={activeItem === 0}>
          <Link to="/home">Home</Link>
        </NavItem>
        <NavItem itemId={1} to="#" isActive={activeItem === 1}>
          <Link to="/upload">Upload Configuration</Link>
        </NavItem>
        <NavItem itemId={2} to="#" isActive={activeItem === 2}>
          <Link to="/configs">Configurations</Link>
        </NavItem>
      </NavGroup>
      <NavGroup title="Resources">
        {navItems.map((item, index) => {
          return (
            <NavItem
              itemId={index + 3}
              to="#"
              isActive={activeItem === index + 3}
            >
              <Link to={`/k8s/${settings[item].resourcePluralNamePluralLower}`}>
                {settings[item].resourcePluralName}
              </Link>
            </NavItem>
          );
        })}
      </NavGroup>
    </Nav>
  );
};

function Sidebar({ isNavOpen, settings }) {
  return (
    <PageSidebar
      nav={<SidebarNav settings={settings} />}
      isNavOpen={isNavOpen}
    />
  );
}

export default Sidebar;
