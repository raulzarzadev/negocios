import React, { useState } from "react";
import MyButton from "../atomos/MyButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MySelectInput from "../atomos/MySelectInput";
import { CONTACT_TYPES } from "../../HardData/CONTACT_TYPES";
import { Grid, Typography } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";

const CONTACTS = [
  {
    type: "ws",
    value: "+52556973456",
  },
];

console.log(CONTACT_TYPES);
export default function ContactInputs() {
  const [contacts, setContacts] = useState([]);
  const [contactInput, setContactInput] = useState([{}]);
  const [contactType, setContactType] = useState("");
  const [contactValue, setContactValue] = useState("");

  
  const handleContactType = (e) => {
    setContactType(e.target.value);
  };
  const handleContactValue = (e) => {
    setContactValue(e.target.value);
    console.log(e.target.value);
  };

  console.log(contactType, contactValue);

  return (
    <div>
      {contacts.map((contact) => (
        <>
          <em>Contactos guardados:</em>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h6">{contact.label}: </Typography>
            </Grid>
            <Grid item style={{ alignSelf: "center", marginLeft: 12 }}>
              <Typography variant="p">{contact.value}</Typography>
            </Grid>
          </Grid>
        </>
      ))}

      {contactInput.map((contact, i) => (
        <InputContact
          contactType={contactType}
          contactValue={contactValue}
          handleContactType={handleContactType}
          handleContactValue={handleContactValue}
          index={i}
        />
      ))}

      <MyButton
        onClick={() =>
          setContactInput([...contactInput, { type: contactType }])
        }
      >
        Agregar contacto <AddCircleOutlineIcon />
      </MyButton>
    </div>
  );
}

const InputContact = ({
  handleContactInput,
  handleContactValue,
  contactType,
  contactValue,
  index,
}) => (
  <>
    <Grid container>
      <Grid item xs={4} style={{ padding: "4px" }}>
        <MySelectInput
          name={`contactType-${index}`}
          value={contactType}
          placeholder="Contacto vía"
          options={CONTACT_TYPES}
          onChange={handleContactValue}
        />
      </Grid>
      <Grid item xs={8} style={{ padding: "4px" }}>
        <MyTextInput
          defaultValue={contactValue}
          name={`contactValue-${index}`}
          onChange={handleContactInput}
        />
      </Grid>
    </Grid>
  </>
);
