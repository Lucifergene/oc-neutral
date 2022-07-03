import {
  FormGroup,
  Checkbox,
  Bullseye,
  Button,
  Alert,
  AlertActionCloseButton,
} from "@patternfly/react-core";
import { Form, Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import { PasswordField } from "src/components/PasswordField";
import { TextField } from "src/components/TextField";
import { signupvalidationSchema } from "src/utils/signup-validation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "src/utils/firebase";

export const SignUpPage = () => {
  const [termsAndConditions, settermsAndConditions] =
    React.useState<boolean>(false);
  // const [signUpError, setsignUpError] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(true);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const history = useHistory();

  const initValues = {
    fullName: "",
    email: "",
    password: "",
  };

  return (
    <>
      {alert && error && (
        <Alert
          variant="danger"
          title={error.message.substring(9, error.message.length - 1)}
          actionClose={
            <AlertActionCloseButton onClose={() => setAlert(false)} />
          }
        />
      )}
      {alert && user && !error && (
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
          createUserWithEmailAndPassword(values.email, values.password)

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
