import React from "react";
import { makeStyles } from "@material-ui/core";
import MyLink from "./atomos/MyLink";
import negdelbar_logo from "../assets/negdelbar_logo.png";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    height: "22vh",
    padding: theme.spacing(2),
    display: "block",
    textAlign: "center",
  },
  footerLink:{
    margin:theme.spacing(2)
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <div className={classes.footerLink}>
        <MyLink to="/">
          <img
            style={{ width: "120px" }}
            src={negdelbar_logo}
            alt="negocios del barrio"
          />
        </MyLink>
      </div>
      <div>
        Una app de{" "}
        <a href="https://www.raulzarza.com/developer" target="__blank">
          raulzarza.com
        </a>
      </div>
    </div>
  );
}
