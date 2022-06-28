import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Alert,
  AlertActionCloseButton,
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import { auth, login } from "src/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignUpPage } from "./SignUpPage";

export const LoginPageView = () => {
  const [usernameValue, setusernameValue] = React.useState<string>("");
  const [passwordValue, setpasswordValue] = React.useState<string>("");
  const [showHelperText, setshowHelperText] = React.useState<boolean>(false);
  const [isValidUsername, setisValidUsername] = React.useState<boolean>(true);
  const [isValidPassword, setisValidPassword] = React.useState<boolean>(true);
  const [signUpFormSelected, setsignUpFormSelected] =
    React.useState<boolean>(false);

  const [loginError, setloginError] = React.useState<string>("");

  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const handleUsernameChange = (value: string) => {
    setusernameValue(value);
  };

  const handlePasswordChange = (passwordValue: string) => {
    setpasswordValue(passwordValue);
  };

  const onLoginButtonClick = (event: any) => {
    event.preventDefault();
    setisValidUsername(!!usernameValue);
    setisValidPassword(!!passwordValue);
    setshowHelperText(!usernameValue || !passwordValue);
    login(usernameValue, passwordValue)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("SUCCESSFULLY SIGNED IN");
        history.replace("/home");
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setloginError(errorMessage);
      });
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

  const images = {
    lg: "/assets/images/pfbg_1200.jpg",
    sm: "/assets/images/pfbg_768.jpg",
    sm2x: "/assets/images/pfbg_768@2x.jpg",
    xs: "/assets/images/pfbg_576.jpg",
    xs2x: "/assets/images/pfbg_576@2x.jpg",
  };

  const signUpForm = <SignUpPage />;

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
