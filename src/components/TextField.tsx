import React from "react";
import { ErrorMessage, FieldHookConfig, useField } from "formik";
import { FormGroup, FormHelperText, TextInput } from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";

interface OtherProps {
  label: string;
  helperText?: string;
  isRequired?: boolean;
  type?: "text" | "password" | "email" | "number";
}

export const TextField = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

  const { setValue } = helpers;

  return (
    <div>
      <FormGroup
        label={props.label}
        type={props.type}
        helperText={
          meta.error ? (
            <FormHelperText isHidden={!meta.error}>
              {meta.error}
              <br />
            </FormHelperText>
          ) : (
            <FormHelperText icon={<ExclamationCircleIcon />}>
              {props.helperText}
              <br />
            </FormHelperText>
          )
        }
        isRequired={props.isRequired}
        fieldId={field.name}
      >
        <TextInput
          type={props.type}
          name={field.name}
          id={field.name}
          aria-describedby={`${field.name}-helper`}
          onChange={(value) => {
            setValue(value);
            console.log(value);
          }}
          validated={!meta.error ? undefined : "error"}
        />
      </FormGroup>
    </div>
  );
};
