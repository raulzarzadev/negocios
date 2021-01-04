import React from "react";
import { useUser } from "../../../context/userContext";
import UserView from "../../moleculas/UserView";
import NoLoggedView from "../../NoLoggedView";

export default function NewUser(props) {
  const { isLogged, user } = useUser();
  console.log(user);
  return (
    <>{isLogged ? <UserView user={user} /> : <NoLoggedView text="Perfil" />}</>
  );
}
