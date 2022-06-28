import {
  FormGroup,
  Checkbox,
  Bullseye,
  Button,
  Alert,
  AlertActionCloseButton,
} from "@patternfly/react-core";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { PasswordField } from "src/components/PasswordField";
import { TextField } from "src/components/TextField";
import { signupvalidationSchema } from "src/utils/signup-validation";

import { auth, signup } from "src/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const SignUpPage = () => {
  const [termsAndConditions, settermsAndConditions] =
    React.useState<boolean>(false);
  const [signUpError, setsignUpError] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);

  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const initValues = {
    fullName: "",
    email: "",
    password: "",
  };

  return (
    <>
      {alert && signUpError && (
        <Alert
          variant="danger"
          title={signUpError.substring(9, signUpError.length - 1)}
          actionClose={
            <AlertActionCloseButton onClose={() => setAlert(false)} />
          }
        />
      )}
      {alert && user && !signUpError && (
        <Alert
          variant="success"
          title={`Account created! Please login to continue.`}
          actionClose={
            <AlertActionCloseButton onClose={() => setAlert(false)} />
          }
        />
      )}

      <Formik
        initialValues={initValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          signup(values.email, values.password)
            .then((userCredential: any) => {
              // Signed in
              const user = userCredential.user;
              // alert("SUCCESSFULLY SIGNED UP");
              setSubmitting(false);
              setAlert(true);
            })
            .catch((error) => {
              const errorMessage = error.message;
              setAlert(true);
              setsignUpError(errorMessage);
            });

          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          // console.log(values);
        }}
        validationSchema={signupvalidationSchema}
      >
        {({ isSubmitting }) => (
          <Form>
            <TextField
              label="Full name"
              name="fullName"
              type="text"
              helperText="Include your middle name if you have one."
            />
            <TextField
              label="Email"
              name="email"
              type="text"
              helperText="We'll never share your email with anyone else."
            />
            <PasswordField label="Password" name="password" />
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
                onClick={() => {
                  console.log("Clicked");
                }}
                type="submit"
                isDisabled={isSubmitting || termsAndConditions === false}
              >
                Sign Up
              </Button>
            </Bullseye>
          </Form>
        )}
      </Formik>
    </>
  );
};
