import React from "react";
import { useHistory } from "react-router-dom";
import {
  Alert,
  AlertActionCloseButton,
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import { SignUpPage } from "./SignUpPage";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "src/utils/firebase";

export const LoginPageView = () => {
  const [alert, setAlert] = React.useState<boolean>(true);
  const [usernameValue, setusernameValue] = React.useState<string>("");
  const [passwordValue, setpasswordValue] = React.useState<string>("");
  const [showHelperText, setshowHelperText] = React.useState<boolean>(false);
  const [isValidUsername, setisValidUsername] = React.useState<boolean>(true);
  const [isValidPassword, setisValidPassword] = React.useState<boolean>(true);
  const [signUpFormSelected, setsignUpFormSelected] =
    React.useState<boolean>(false);

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

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
    signInWithEmailAndPassword(usernameValue, passwordValue)
    user && history.replace("/home");
      // .then(() => {
      //   // Signed in
      //   console.log("Signed In: ", user);
      //   alert("SUCCESSFULLY SIGNED IN");
      //   history.replace("/home");
      //   // ...
      // })
      // .catch((error) => {
      //   setloginError(error);
      // });
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
              setAlert(false);
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
      brandImgAlt="Neutral"
      backgroundImgSrc={images}
      backgroundImgAlt="Images"
      textContent="This is placeholder text only. Use this area to place any information or introductory message about your application that may be relevant to users."
      loginTitle={
        signUpFormSelected
          ? "Sign Up to Neutral"
          : "Log in to your account"
      }
      loginSubtitle={
        signUpFormSelected
          ? "Fill up the fields to create a free account."
          : "Enter your sign-on credentials."
      }
      signUpForAccountMessage={signUpForAccountMessage}
    >
      {alert && error && (
        <Alert
          variant="danger"
          title={error.message.substring(9, error.message.length - 1)}
          actionClose={
            <AlertActionCloseButton onClose={() => setAlert(false)} />
          }
        />
      )}
        {loading && (
        <Alert
          variant="success"
          title="Loading..."
        />
      )}
      {signUpFormSelected ? signUpForm : loginForm}
    </LoginPage>
  );
};
