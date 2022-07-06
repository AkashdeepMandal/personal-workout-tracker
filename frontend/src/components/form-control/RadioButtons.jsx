import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React from "react";

const RadioButtons = (props) => {
  const { row, error, errorMsg, options, setFieldValue, value, label, name } =
    props;
  return (
    <Stack spacing={1}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
        <RadioGroup
          row={row}
          name={name}
          value={value}
          onChange={(event) => {
            setFieldValue(name, event.currentTarget.value);
          }}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.value}
              key={option.key}
              control={<Radio />}
              label={option.key}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {error && (
        <FormHelperText error id="helper-text-gender">
          {errorMsg}
        </FormHelperText>
      )}
    </Stack>
  );
};

export default RadioButtons;
