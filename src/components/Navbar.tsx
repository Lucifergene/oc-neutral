import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import {
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageToggleButton,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  Dropdown,
  DropdownToggle,
  Avatar,
  DropdownGroup,
  DropdownItem,
  Brand,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/js/icons/bars-icon";
import imgAvatar from "@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg";
import imgBrand from "../assets/images/logo.webp";
import { signOut } from "firebase/auth";
import { auth } from "src/utils/firebase";

const Navbar = ({ setIsNavOpen, isNavOpen, currentUser }) => {
  const history = useHistory();

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    history.replace("/");
  };

  console.log("currentUser: ", currentUser.email);

  const [state, setState] = useState({
    isDropdownOpen: false,
  });

  const onDropdownSelect = () => {
    setState({
      ...state,
      isDropdownOpen: !state.isDropdownOpen,
    });
  };

  const onDropdownToggle = (isDropdownOpen) => {
    setState({
      ...state,
      isDropdownOpen,
    });
  };

  const userDropdownItems = [
    <DropdownGroup key="group 2">
      <DropdownItem key="group 2 logout" onClick={handleLogout}>
        Logout
      </DropdownItem>
    </DropdownGroup>,
  ];

  const headerToolbar = (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarItem
          visibility={{ default: "visible" }}
          alignment={{ default: "alignRight" }}
        >
          <Dropdown
            isFullHeight
            onSelect={onDropdownSelect}
            isOpen={state.isDropdownOpen}
            toggle={
              <DropdownToggle
                icon={<Avatar src={imgAvatar} alt="Avatar" />}
                onToggle={onDropdownToggle}
              >
                {currentUser.email.split("@")[0]}
              </DropdownToggle>
            }
            dropdownItems={userDropdownItems}
          />
        </ToolbarItem>
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
        <MastheadBrand style={{ height: "70px" }}>
          <Brand src={imgBrand} alt="Patternfly Logo" />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );
};
export default Navbar;
