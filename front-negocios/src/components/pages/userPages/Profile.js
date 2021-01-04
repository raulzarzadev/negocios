import React from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../../../context/userContext";
import UserView from "../../moleculas/UserView";

export default function NewUser(pops) {
  const { isLogged, user } = useUser();
  if (!isLogged) return <Redirect to="/ingresa" />;
  return <UserView user={user} />;
}
