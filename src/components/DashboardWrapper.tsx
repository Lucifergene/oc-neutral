import React from "react";
import {
  Page,
  PageSection,
  PageSectionVariants,
  Text,
  TextContent,
} from "@patternfly/react-core";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

type DashboardWrapperProps = {
  children: React.ReactNode;
  mainContainerId?: any;
  onPageResize: any;
  setIsNavOpen: any;
  isNavOpen: any;
  currentUser: any;
  settings: any;
};

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  children,
  mainContainerId,
  onPageResize,
  setIsNavOpen,
  isNavOpen,
  currentUser,
  settings,
}) => {
  const [state, setState] = React.useState({
    activeItem: 1,
  });

  const onNavSelect = (result) => {
    setState({
      ...state,
      activeItem: result.itemId,
    });
  };

  return (
    <Page
      header={
        <DashboardHeader
          currentUser={currentUser}
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
        />
      }
      sidebar={<Sidebar isNavOpen={isNavOpen} settings={settings} />}
      isManagedSidebar
      mainContainerId={
        mainContainerId
          ? mainContainerId
          : "main-content-page-layout-default-nav"
      }
      onPageResize={onPageResize}
    >
      {/* <PageSection variant={PageSectionVariants.light}>
        <TextContent>
          <Text component="h1">Main title</Text>
          <Text component="p">
            Body text should be Overpass Regular at 16px. It should have leading
            of 24px because <br />
            of it’s relative line height of 1.5.
          </Text>
        </TextContent>
      </PageSection> */}
      {children}
    </Page>
  );
};

export default DashboardWrapper;
