import React, { useState } from "react";
import MyButton from "../atomos/MyButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MyTextInput from "../atomos/MyTextInput";
import { CONTACT_TYPES } from "../../HardData/CONTACT_TYPES";
export default function ContactInputs() {
  const [contacts, setContacts] = useState([""]);
  return (
    <div>
      {contacts.map((contact) => (
        <InputContact />
      ))}
      <MyButton>
        Agregar contacto <AddCircleOutlineIcon />
      </MyButton>
    </div>
  );
}

const InputContact = () => (
  <>
    <MyTextInput select options={CONTACT_TYPES} />
  </>
);
