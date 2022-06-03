import React from 'react';
import './App.css';
import {LoginPageView} from './pages/LoginPage';
import {SignUpPageView} from './pages/SignUpPage';
import "@patternfly/patternfly/patternfly.css";
import "@patternfly/react-core/dist/styles/base.css";

function App() {
  return (
    <div>
     <LoginPageView/>
      <SignUpPageView/>
    </div>
  );
}

export default App;
