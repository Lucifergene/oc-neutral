import { useState } from "react";
import { FieldHookConfig, useField } from "formik";
import {
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  TextInput,
} from "@patternfly/react-core";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";

interface OtherProps {
  label: string;
  helperText?: string;
  type?: "text" | "password" | "email" | "number";
}

export const TextField = (props: OtherProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);
  const [focus, setFocus] = useState(false);

  const { setValue } = helpers;

  return (
    <div>
      <FormGroup
        label={props.label}
        type={props.type}
        helperText={
          <FormHelperText icon={<ExclamationCircleIcon />}>
            {props.helperText}
          </FormHelperText>
        }
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
          validated={meta.error && focus ? "error" : undefined}
          onFocus={() => setFocus(true)}
        />
        {meta.error && focus ? (
          <HelperText>
            <HelperTextItem variant="error" hasIcon>
              {meta.error}
            </HelperTextItem>
          </HelperText>
        ) : (
          <HelperText>
            <HelperTextItem>{props.helperText}</HelperTextItem>
          </HelperText>
        )}
      </FormGroup>
    </div>
  );
};
