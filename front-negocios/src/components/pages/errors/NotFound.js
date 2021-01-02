import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import MyButton from "../../atomos/MyButton";
import MyLink from "../../atomos/MyLink";
//import '../components/styles/Errors.css'
import NotFoundImg from "./404.png";
import BackspaceIcon from "@material-ui/icons/Backspace";

const useStyles = makeStyles((theme) => ({
  errorImage: {
    width: "100%",
  },
}));
export default function NotFound({ errorMessage }) {
  const classes = useStyles();
  return (
    <div className="text-center">
      <h1 className="">{errorMessage || "Error: 404 Page Not Found"}</h1>
      <Box m={2}>
        <MyLink to="/" component={MyButton}>
          <BackspaceIcon />
          Back to home
        </MyLink>
      </Box>
      <img src={NotFoundImg} alt="Error 404" className={classes.errorImage} />
      
    </div>
  );
}
