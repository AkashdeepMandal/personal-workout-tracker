import {
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React from "react";

function DateField(props) {
  const { error, errorMsg, handleBlur, handleChange, value, label, name } =
    props;
  return (
    <Stack spacing={1}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        fullWidth
        id={name}
        type="date"
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        error={Boolean(error)}
      />
      {error && (
        <FormHelperText error id={`helper-text-${name}`}>
          {errorMsg}
        </FormHelperText>
      )}
    </Stack>
  );
}

export default DateField;
