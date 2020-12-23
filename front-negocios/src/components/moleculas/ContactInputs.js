import React, { useState } from "react";
import MyButton from "../atomos/MyButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MySelectInput from "../atomos/MySelectInput";
import { CONTACT_TYPES } from "../../HardData/CONTACT_TYPES";
import { Box, Grid, Typography } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";

export default function ContactInputs() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({});
  console.log(newContact);
  console.log(contacts);

  const addContact = () => {
    setContacts([...contacts, newContact]);
  };
  const handleDeleteContact = (contact) => {
    const arr = contacts.filter((item) => item !== contact);
    setContacts(arr);
  };
  const handleChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {contacts.map((contact) => (
        <>
          <Grid container justify="center">
            <Grid item xs={3}>
              <Typography variant="h6">{contact.contactType}: </Typography>
            </Grid>
            <Grid item style={{ alignSelf: "center", marginLeft: 12 }} xs={6}>
              <Typography variant="p">{contact.contactValue}</Typography>
            </Grid>
            <Grid xs={2}>
              <Box display="flex" alignContent="center" justifyContent="center">
                <div
                  style={{
                    alignSelf: "center",
                    margin: "4px",
                    height: 15,
                    width: 15,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                    borderRadius: "50px",
                  }}
                  onClick={() => handleDeleteContact(contact)}
                >
                  X
                </div>
              </Box>
            </Grid>
          </Grid>
        </>
      ))}

      <InputContact
        contactType={newContact.contactType}
        contactValue={newContact.contactValue}
        handleChange={handleChange}
      />

      <MyButton
        onClick={() => {
          addContact();
          setNewContact({});
        }}
      >
        Agregar contacto <AddCircleOutlineIcon />
      </MyButton>
    </div>
  );
}

const InputContact = ({ contactType, contactValue, handleChange }) => (
  <>
    <Grid container>
      <Grid item xs={4} style={{ padding: "4px" }}>
        <MySelectInput
          name={`contactType`}
          value={contactType || ""}
          placeholder="Contacto vía"
          options={CONTACT_TYPES}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={8} style={{ padding: "4px" }}>
        <MyTextInput name={`contactValue`} onChange={handleChange} />
      </Grid>
    </Grid>
  </>
);
