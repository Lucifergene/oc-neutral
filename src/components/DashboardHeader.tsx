import { useState } from "react";
import { useHistory } from "react-router";
import {
  Avatar,
  Brand,
  Dropdown,
  DropdownGroup,
  DropdownToggle,
  DropdownItem,
  Masthead,
  MastheadToggle,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  PageToggleButton,
} from "@patternfly/react-core";
import BarsIcon from "@patternfly/react-icons/dist/esm/icons/bars-icon";
import imgBrand from "../assets/images/logo.webp";
import imgAvatar from "@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg";
import { signOut } from "firebase/auth";
import { auth } from "src/utils/firebase";

const DashboardHeader = ({ currentUser, isNavOpen, setIsNavOpen }) => {
  const history = useHistory();
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

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    history.replace("/");
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
    <Masthead>
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
          <Brand
            src={imgBrand}
            alt="Patternfly Logo"
            widths={{ default: "180px", md: "180px", "2xl": "220px" }}
          />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );
};

export default DashboardHeader;
