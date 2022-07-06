import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";

function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { error, errorMsg, handleBlur, handleChange, value, label, name } =
    props;

  return (
    <Stack spacing={1}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        fullWidth
        error={Boolean(error)}
        id={name}
        type={showPassword ? "text" : "password"}
        value={value}
        name={name}
        onBlur={handleBlur}
        onChange={(e) => {
          handleChange(e);
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="large"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        }
        placeholder="********"
        inputProps={{ maxLength: 20 }}
      />
      {error && (
        <FormHelperText error id={`helper-text-${name}`}>
          {errorMsg}
        </FormHelperText>
      )}
    </Stack>
  );
}

export default PasswordField;
