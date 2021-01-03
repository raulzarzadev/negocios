import React from "react";
import { useUser } from "../../../context/userContext";
import NoLoggedView from "../../NoLoggedView";
import UserView from "./UserView";

export default function NewUser(props) {
  const { isLogged, user } = useUser();
  console.log(user);
  return <>{isLogged ? <UserView user={user}  /> : <NoLoggedView text="Perfil" />}</>;
}
