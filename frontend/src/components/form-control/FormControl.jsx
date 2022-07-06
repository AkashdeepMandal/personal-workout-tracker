import React from "react";
import DateField from "./DateField";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import RadioButtons from "./RadioButtons";
import TextareaField from "./TextareaField";

function FormFieldControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "input":
      return <InputField {...rest} />;
    case "password":
      return <PasswordField {...rest} />;
    case "textarea":
      return <TextareaField {...rest} />;
    // case "select":
    //   return "";
    case "radio":
      return <RadioButtons {...rest} />;
    // case "checkbox":
    //   return "";
    case "date":
      return <DateField {...rest} />;
    default:
      return null;
  }
}

export default FormFieldControl;
