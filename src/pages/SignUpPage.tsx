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
import { PasswordField } from "src/components/PasswordField";
import { TextField } from "src/components/TextField";
import { signupvalidationSchema } from "src/utils/signup-validation";

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "src/utils/firebase";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const SignUpPage = () => {
  const [termsAndConditions, settermsAndConditions] =
    React.useState<boolean>(false);
  const [signUpError, setsignUpError] = React.useState<string>("");

  const initValues = {
    fullName: "",
    email: "",
    password: "",
  };

  return (
    <>
      {signUpError && (
        <Alert
          variant="danger"
          title={signUpError}
          actionClose={
            <AlertActionCloseButton onClose={() => setsignUpError("")} />
          }
        />
      )}
      <Formik
        initialValues={initValues}
        onSubmit={(values, { setSubmitting }) => {
          createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              alert("SUCCESSFULLY SIGNED UP");
              setSubmitting(false);
            })
            .catch((error) => {
              const errorMessage = error.message;
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
