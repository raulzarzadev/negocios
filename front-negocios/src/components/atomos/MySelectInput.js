import {
  Box,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";

export default function MySelectInput({
  value = "",
  name,
  onChange,
  displayEmpty = true,
  className,
  inputProps,
  options = [],
  helperText,
  placeholder,
  label,
  error,
}) {
  return (
    <FormControl error={error} size="small" fullWidth focused>
      {label && (
        <Box>
          <Typography align="left" variant="body2">
            {label}:
          </Typography>
        </Box>
      )}
      <Select
        name={name}
        autoFocus
        variant="outlined"
        value={value}
        onChange={onChange}
        displayEmpty={displayEmpty}
        className={className}
        inputProps={inputProps}
        placeholder={placeholder}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
