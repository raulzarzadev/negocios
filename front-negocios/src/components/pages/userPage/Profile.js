import React from "react";

import { makeStyles } from "@material-ui/core";
import { useUser } from "../../../context/userContext";
import { useHistory } from "react-router-dom";
import NoLoggedView from "../../NoLoggedView";

const useStyles = makeStyles((theme) => ({
  profileContent: {
    margin: theme.spacing(4, 0),
  },
}));

export default function NewUser(props) {
  const classes = useStyles();
  const { data, isLogged } = useUser();
  const history = useHistory();
  console.log('is logged',!!isLogged);

  return (
    <>
    {isLogged ?
    <div className={classes.profileContent}>
      is logged
    </div>
    : <NoLoggedView text="Perfil"/>
      }
    </>
  );
}
