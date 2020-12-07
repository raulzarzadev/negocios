const { createMuiTheme } = require("@material-ui/core");

const palette = {
  common: { black: "#000", white: "rgba(254, 246, 246, 1)" },
  background: {
    paper: "rgba(255, 255, 255, 1)",
    default: "rgba(240, 211, 234, 1)",
  },
  primary: {
    light: "rgba(140, 149, 216, 1)",
    main: "rgba(124, 178, 204, 0.42)",
    dark: "rgba(108, 110, 126, 1)",
    contrastText: "rgba(118, 92, 143, 1)",
  },
  secondary: {
    light: "#ff4081",
    main: "rgba(150, 123, 135, 1)",
    dark: "#c51162",
    contrastText: "rgba(255, 255, 255, 1)",
  },
  error: {
    light: "rgba(252, 179, 179, 1)",
    main: "rgba(185, 66, 12, 1)",
    dark: "rgba(252, 19, 19, 1)",
    contrastText: "rgba(19, 219, 219, 1)",
  },
  text: {
    primary: "rgba(12, 12, 12, 0.87)",
    secondary: "rgba(3, 2, 2, 0.54)",
    disabled: "rgba(82, 82, 82, 1)",
    hint: "rgba(231, 154, 154, 0.38)",
  },
};

const breakpoints = {
  values: {
    xs: 320,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

const newTheme = createMuiTheme({ palette, breakpoints });

export default newTheme;
