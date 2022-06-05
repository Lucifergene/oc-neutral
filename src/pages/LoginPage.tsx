import React from "react";
import {
  Alert,
  AlertActionCloseButton,
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import { SignUpPage } from "./SignUpPage";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2VDqJZ6Xh65TowUvPvjsOzyTBCQU8Ln4",
  authDomain: "oc-neutral.firebaseapp.com",
  projectId: "oc-neutral",
  storageBucket: "oc-neutral.appspot.com",
  messagingSenderId: "592729192715",
  appId: "1:592729192715:web:3a82f8fc0f106a7e740a0e",
  measurementId: "G-KCZ02PVRSG",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const LoginPageView = () => {
  const [usernameValue, setusernameValue] = React.useState<string>("");
  const [passwordValue, setpasswordValue] = React.useState<string>("");
  const [showHelperText, setshowHelperText] = React.useState<boolean>(false);
  const [isValidUsername, setisValidUsername] = React.useState<boolean>(true);
  const [isValidPassword, setisValidPassword] = React.useState<boolean>(true);
  const [signUpFormSelected, setsignUpFormSelected] =
    React.useState<boolean>(false);

  const [loginError, setloginError] = React.useState<string>("");

  const handleUsernameChange = (value: string) => {
    setusernameValue(value);
  };

  const handlePasswordChange = (passwordValue: string) => {
    setpasswordValue(passwordValue);
  };

  const fbase_login = () => {
    signInWithEmailAndPassword(auth, usernameValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("SUCCESSFULLY SIGNED IN");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setloginError(errorMessage);
      });
  };

  const onLoginButtonClick = (event: any) => {
    event.preventDefault();
    setisValidUsername(!!usernameValue);
    setisValidPassword(!!passwordValue);
    setshowHelperText(!usernameValue || !passwordValue);
    fbase_login();
  };

  const helperText = (
    <React.Fragment>
      <ExclamationCircleIcon />
      &nbsp;Invalid login credentials.
    </React.Fragment>
  );

  const signUpForAccountMessage = (
    <React.Fragment>
      {!signUpFormSelected ? (
        <LoginMainFooterBandItem>
          Need an account?{" "}
          <a
            onClick={() => {
              setsignUpFormSelected(true);
              setloginError("");
            }}
          >
            Sign up.
          </a>
        </LoginMainFooterBandItem>
      ) : (
        <LoginMainFooterBandItem>
          Have an account?{" "}
          <a onClick={() => setsignUpFormSelected(false)}>Login.</a>
        </LoginMainFooterBandItem>
      )}
    </React.Fragment>
  );

  const loginForm = (
    <LoginForm
      showHelperText={showHelperText}
      helperText={helperText}
      helperTextIcon={<ExclamationCircleIcon />}
      usernameLabel="Email"
      usernameValue={usernameValue}
      onChangeUsername={handleUsernameChange}
      isValidUsername={isValidUsername}
      passwordLabel="Password"
      passwordValue={passwordValue}
      isShowPasswordEnabled
      onChangePassword={handlePasswordChange}
      isValidPassword={isValidPassword}
      onLoginButtonClick={onLoginButtonClick}
      loginButtonLabel="Log in"
    />
  );

  const signUpForm = <SignUpPage />;

  const images = {
    lg: "/assets/images/pfbg_1200.jpg",
    sm: "/assets/images/pfbg_768.jpg",
    sm2x: "/assets/images/pfbg_768@2x.jpg",
    xs: "/assets/images/pfbg_576.jpg",
    xs2x: "/assets/images/pfbg_576@2x.jpg",
  };

  return (
    <LoginPage
      brandImgAlt="Openshift Neutral"
      backgroundImgSrc={images}
      backgroundImgAlt="Images"
      textContent="This is placeholder text only. Use this area to place any information or introductory message about your application that may be relevant to users."
      loginTitle={
        signUpFormSelected
          ? "Sign Up to Openshift Neutral"
          : "Log in to your account"
      }
      loginSubtitle={
        signUpFormSelected
          ? "Fill up the fields to create a free account."
          : "Enter your sign-on credentials."
      }
      signUpForAccountMessage={signUpForAccountMessage}
    >
      {loginError && (
        <Alert
          variant="danger"
          title={loginError.substring(9, loginError.length - 1)}
          actionClose={
            <AlertActionCloseButton onClose={() => setloginError("")} />
          }
        />
      )}
      {signUpFormSelected ? signUpForm : loginForm}
    </LoginPage>
  );
};
