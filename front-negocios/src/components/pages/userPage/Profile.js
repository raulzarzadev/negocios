import React from "react";
import { useUser } from "../../../context/userContext";
import NoLoggedView from "../../NoLoggedView";
import UserView from "./UserView";

export default function NewUser(props) {
  const { isLogged, data } = useUser();
  console.log(data);
  return <>{isLogged ? <UserView user={data.user}  /> : <NoLoggedView text="Perfil" />}</>;
}
