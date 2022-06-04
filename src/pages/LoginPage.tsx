import React from "react";
import {
  LoginForm,
  LoginMainFooterBandItem,
  LoginPage,
  Checkbox,
  FormGroup,
  TextInput,
  Button,
  Bullseye,
  Level,
  LevelItem,
  FormHelperText,
} from "@patternfly/react-core";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
import { TextField } from "src/components/TextField";

export const LoginPageView = () => {
  const [usernameValue, setusernameValue] = React.useState<string>("");
  const [passwordValue, setpasswordValue] = React.useState<string>("");
  const [showHelperText, setshowHelperText] = React.useState<boolean>(false);
  const [isValidUsername, setisValidUsername] = React.useState<boolean>(true);
  const [isValidPassword, setisValidPassword] = React.useState<boolean>(true);
  const [signUpFormSelected, setsignUpFormSelected] =
    React.useState<boolean>(false);

  const [showPassword, setshowPassword] = React.useState<boolean>(false);
  const [termsAndConditions, settermsAndConditions] =
    React.useState<boolean>(false);

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
          <a onClick={() => setsignUpFormSelected(true)}>Sign up.</a>
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
      usernameLabel="Username"
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

  const signUpForm = (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
        console.log(values)
      }}
      validationSchema={Yup.object().shape({
        fullName: Yup.string()
          .required("Full name is required")
          .min(3, "Full name must be at least 3 characters")
          .max(255, "Full name must be less than 255 characters"),
        email: Yup.string()
          .required("Email is required")
          .email("Email is invalid")
          .max(255, "Email must be less than 255 characters"),
        password: Yup.string()
          .required("Password is required")
          .min(8, "Password must be at least 8 characters")
          .max(255, "Password must be less than 255 characters"),
      })}
    >
      {({ isSubmitting, values, errors, handleChange }) => (
        <Form>
          <TextField label="Full name" name="fullName" type="text" helperText="Include your middle name if you have one." isRequired/>

          <TextField label="Email" name="email" type="email" helperText="We'll never share your email with anyone else." isRequired/>
          
          {/* <FormGroup
            label="Full name"
            type="text"
            helperText={
              errors.fullName ? (
                <ErrorMessage name="fullName" component="TextInput" />
              ) : (
                <FormHelperText icon={<ExclamationCircleIcon />}>
                  Include your middle name if you have one.
                </FormHelperText>
              )
            }
            isRequired
            fieldId="fullName"
          >
            <TextInput
              type="text"
              name="fullName"
              id="fullName"
              aria-describedby="fullName-helper"
              onChange={(value) => {
                values.fullName = value;
              }}
            />
          </FormGroup> */}
          <br />
          {/* <FormGroup
            label="Email"
            fieldId="email"
            helperText={
              errors.email ? (
                <ErrorMessage name="email" component="TextInput" />
              ) : (
                ""
              )
            }
          >
            <TextInput
              isRequired
              type="email"
              id="email"
              name="email"
              aria-describedby="email-helper"
              onChange={(value) => {
                values.email = value;
              }}
            />
          </FormGroup> */}
          <br />
          <FormGroup
            label="Password"
            isRequired
            fieldId="password"
            helperText={
              errors.password ? (
                <ErrorMessage name="password" component="TextInput" />
              ) : (
                ""
              )
            }
          >
            <Level>
              <LevelItem style={{ width: "88%" }}>
                <TextInput
                  isRequired
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={(value) => {
                    values.password = value;
                  }}
                />
              </LevelItem>
              <LevelItem style={{ width: "12%" }}>
                <Button
                  className="pf-c-button pf-m-control"
                  type="button"
                  aria-label="Hide password"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <i className="fas fa-eye-slash" aria-hidden="true"></i>
                  ) : (
                    <i className="fas fa-eye" aria-hidden="true"></i>
                  )}
                </Button>
              </LevelItem>
            </Level>
          </FormGroup>
          <br />
          <FormGroup
            label="Terms and Conditions"
            fieldId="simple-form-checkbox-01"
          >
            <Checkbox
              id="simple-form-checkbox-01"
              name="termsAndConditions"
              label="I accept the terms and conditions"
              isChecked={termsAndConditions}
              onChange={() => settermsAndConditions(!termsAndConditions)}
            />
          </FormGroup>
          <br />
          <Bullseye>
            <Button
              style={{ width: "100%" }}
              variant="primary"
              onClick={() => {console.log("Clicked")}}
              type="submit"
              isDisabled={isSubmitting || termsAndConditions === false}
            >
              Sign Up
            </Button>
          </Bullseye>
        </Form>
      )}
    </Formik>
  );

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
      {signUpFormSelected ? signUpForm : loginForm}
    </LoginPage>
  );
};
