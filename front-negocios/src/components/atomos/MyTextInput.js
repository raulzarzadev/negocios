import React from "react";
import { Box, MenuItem, TextField, Typography } from "@material-ui/core";

export default function MyTextInput({
  multiline,
  rows,
  label,
  defaultValue,
  value,
  id,
  name,
  helperText,
  onChange,
  select,
  options = [],
  placeholder,
}) {
  return (
    <>
      <Box mr={1}>
        {label && (
          <Typography align="left" variant="body2">
            {label}:
          </Typography>
        )}
      </Box>
      <TextField
        placeholder={placeholder}
        select={select}
        onChange={onChange}
        fullWidth
        size="small"
        variant="outlined"
        multiline={multiline}
        rows={rows}
        value={value}
        //label={label}
        defaultValue={defaultValue}
        id={id}
        name={name}
        helperText={helperText}
      >
        {select && (
          <MenuItem value="" disabled>
            <em>{placeholder}</em>
          </MenuItem>
        )}
        {options?.map((option) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </TextField>
    </>
  );
}
