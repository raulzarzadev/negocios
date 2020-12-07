import React from "react";

import { makeStyles } from "@material-ui/core";
import { useUser } from "../../../context/userContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  profileContent: {
    margin: theme.spacing(4, 0),
  },
}));

export default function NewUser(props) {
  const classes = useStyles();
  const { data } = useUser();
  const history = useHistory();
  console.log(data);
  if (!data?.ok) {
    history.push("/");
  }
  return (
    <div className={classes.profileContent}>
      
    </div>
  );
}
