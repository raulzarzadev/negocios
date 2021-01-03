import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Loading from "./atomos/Loading";
import { useUser } from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  layout: {
    marginTop: 0,
    minHeight: "70vh",
    textAlign: "center",
    padding: theme.spacing(0.5),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3, 3),
    },
  },
}));

export default function MyLayout({ children }) {
  const { isLoading } = useUser();
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container className={classes.layout}>
        {isLoading ? <Loading /> : <>{children}</>}
      </Container>
      <Footer />
    </>
  );
}
