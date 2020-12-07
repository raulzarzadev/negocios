import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Loading from "./atomos/Loading";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: 0,
    minHeight: "30rem",
    textAlign: "center",
    padding: theme.spacing(0.5),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 3),
    },
  },
}));

export default function MainContainer({ children, isLoading }) {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container className={classes.mainContainer}>
        {isLoading ? <Loading /> : <>{children}</>}
      </Container>
      <Footer />
    </>
  );
}
