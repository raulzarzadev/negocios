import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  decoratedLink: {
    border: "1px solid",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
  },
}));

export default function MyLink({ to, children, component, decorated }) {
  const classes = useStyles();
  return (
    <Link
      className={decorated ? classes.decoratedLink : classes.link}
      to={to}
      component={component}
    >
      {children}
    </Link>
  );
}
