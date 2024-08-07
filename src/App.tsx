import { Route, Switch } from "react-router-dom";
import "./App.css";
import { SignUpPage } from "./pages/SignUpPage";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/react-core/dist/styles/base.css";
import {
  Divider,
  PageSection,
  PageSectionVariants,
} from "@patternfly/react-core/dist/esm/components";
import { LoginPageView as LoginPage } from "./pages/LoginPage";
import { useState } from "react";
import UploadConfig from "./pages/UploadConfig";
import Overview from "./pages/Overview";
import ConfigList from "./pages/ConfigList";
import Deployments from "./pages/Deployments";
import DashboardWrapper from "./components/DashboardWrapper";
import Services from "./pages/Services";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/firebase";


export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [mobileView, setMobileView] = useState(false);
  const settings: any = {
    deployment: {
      resourceName: "Deployment",
      resourceNameLower: "deployment",
      resourcePluralName: "Deployments",
      resourcePluralNamePluralLower: "deployments",
      resourceAPIGetURL: "https://neutral-backend.herokuapp.com/deployments",
      resourceColumnNames: {
        name: "Name",
        namespace: "Namespace",
        replicas: "Replicas",
        condition: "Condition",
      },
    },
    service: {
      resourceName: "Service",
      resourceNameLower: "service",
      resourcePluralName: "Services",
      resourcePluralNamePluralLower: "services",
      resourceAPIGetURL: "https://neutral-backend.herokuapp.com/services",
      resourceColumnNames: {
        name: "Name",
        namespace: "Namespace",
        type: "Type",
        ports: "Ports",
      },
    },
  };

  const onPageResize = ({ windowSize }) => {
    if (windowSize >= 1450) {
      setMobileView(false);
    } else {
      setMobileView(true);
    }
  };

  if (!user) {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/register" component={SignUpPage} />
      </Switch>
    );
  } else {
    return (
      <>
        <DashboardWrapper
          mainContainerId="main-content-page-layout-default-nav"
          currentUser={user}
          settings={settings}
          onPageResize={onPageResize}
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
        >
          <Divider component="div" />
          <PageSection
            variant={PageSectionVariants.light}
          >
            <div>
              <Switch>
                <Route exact path="/home" component={Overview}>
                  <Overview currentUser={user} />
                </Route>
                <Route exact path="/upload" component={UploadConfig}>
                  <UploadConfig currentUser={user} />
                </Route>
                <Route exact path="/configs" component={ConfigList}>
                  <ConfigList currentUser={user} />
                </Route>
                <Route
                  exact
                  path={`/k8s/${settings.deployment.resourcePluralNamePluralLower}`}
                >
                  <Deployments setting={settings.deployment} />
                </Route>
                <Route
                  exact
                  path={`/k8s/${settings.service.resourcePluralNamePluralLower}`}
                >
                  <Services setting={settings.service} />
                </Route>
              </Switch>
            </div>
          </PageSection>
        </DashboardWrapper>
      </>
    );
  }
}
