import { Button, CircularProgress, Fade } from "@material-ui/core";
import React from "react";

export default function MyButton({
  loading,
  onClick,
  label,
  variant,
  disable,
  children,
  color,
  fullWidth,
  href,
  size,
  type
}) {
  return (
    <Button
      onClick={onClick}
      label={label}
      variant={variant}
      disable={disable}
      color={color}
      fullWidth={fullWidth}
      href={href}
      size={size}
      type
    >
      {label}
      {children}
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "800ms" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress size={25} thickness={7} />
      </Fade>
    </Button>
  );
}