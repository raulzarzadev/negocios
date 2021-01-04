import React from "react";
import MyButton from "./MyButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";

export default function MyBackButton() {
  let history = useHistory();
  const handleBack = () => {
    history.goBack();
  };

  return (
    <MyButton onClick={handleBack} variant="outlined">
      <ArrowBackIosIcon />
      Atras
    </MyButton>
  );
}
