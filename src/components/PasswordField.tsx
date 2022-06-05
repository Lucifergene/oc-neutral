import React, { useState } from "react";
import { FieldHookConfig, useField } from "formik";
import {
  Button,
  FormGroup,
  HelperText,
  HelperTextItem,
  Level,
  LevelItem,
  TextInput,
} from "@patternfly/react-core";

interface OtherProps {
  label: string;
  name: string;
}

export const PasswordField = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);
  const [focus, setFocus] = useState(false);
  const [showPassword, setshowPassword] = React.useState<boolean>(false);

  const { setValue } = helpers;

  return (
    <div>
      <FormGroup label={props.label} type={props.type} fieldId={field.name}>
        <Level>
          <LevelItem style={{ width: "88%" }}>
            <TextInput
              type={showPassword ? "text" : "password"}
              id={field.name}
              name={field.name}
              aria-describedby={`${field.name}-helper`}
              onChange={(value) => {
                setValue(value);
                console.log(value);
              }}
              validated={meta.error && focus ? "error" : undefined}
              onFocus={() => setFocus(true)}
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

        {meta.error && focus && (
          <HelperText>
            <HelperTextItem variant="error" hasIcon>
              {meta.error}
            </HelperTextItem>
          </HelperText>
        )}
      </FormGroup>
    </div>
  );
};
