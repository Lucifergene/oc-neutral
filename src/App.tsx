import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { SignUpPage } from "./pages/SignUpPage";
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/react-core/dist/styles/base.css";
import { Page, PageSection } from "@patternfly/react-core/dist/esm/components";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import UploadConfig from "./pages/UploadConfig";
import Overview from "./pages/Overview";
import Deployments from "./pages/Deployments";
import Services from "./pages/Services";
import ConfigList from "./pages/ConfigList";

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={LoginPage} /> */}
          <Route exact path="/register" component={SignUpPage} />
        </Switch>
        <Page
          header={<Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />}
          sidebar={<Sidebar isNavOpen={isNavOpen} />}
        >
          <PageSection sticky="bottom" variant="light">
            <div>
              <Switch>
                <Route exact path="/" component={Overview} />
                <Route exact path="/upload" component={UploadConfig} />
                <Route exact path="/configs" component={ConfigList} />
                <Route exact path="/k8s/deployments" component={Deployments} />
                <Route exact path="/k8s/services" component={Services} />
              </Switch>
            </div>
          </PageSection>
        </Page>
      </Router>
    </>
  );
}
