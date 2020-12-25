import React, { useEffect, useState } from "react";
import MyButton from "../atomos/MyButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MySelectInput from "../atomos/MySelectInput";
import { CONTACT_TYPES } from "../../HardData/CONTACT_TYPES";
import { Grid, IconButton, Typography } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";

export default function ContactInputs({ advert, setAdvert }) {
  const [contacts, setContacts] = useState(advert.contacts || []);
  const [newContact, setNewContact] = useState({ contactType: "" });
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    switch (newContact.contactType) {
      case "":
        setPlaceholder("Selecciona el tipo de contacto");
        break;
      case "ws":
        setPlaceholder("Escribe tu whats app");
        break;
      default:
        setPlaceholder("Copia el link");
        break;
    }
  }, [newContact.contactType]);

  const addContact = () => {
    setContacts([...contacts, newContact]);
  };
  useEffect(() => {
    setAdvert({ ...advert, contacts });
  }, [contacts]);

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
            <Grid item xs={3} style={{ alignSelf: "center" }}>
              <Typography variant="h6" align="right">
                {contact.contactType}:
              </Typography>
            </Grid>
            <Grid item style={{ alignSelf: "center", marginLeft: 12 }} xs={6}>
              <Typography variant="p">{contact.contactValue}</Typography>
            </Grid>
            <Grid xs={2}>
              <IconButton>
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
              </IconButton>
            </Grid>
          </Grid>
        </>
      ))}

      <InputContact
        contactType={newContact.contactType}
        contactValue={newContact.contactValue}
        handleChange={handleChange}
        placeholder={placeholder}
      />

      <MyButton
        disabled={!newContact.contactType || !newContact.contactValue}
        onClick={() => {
          addContact();
          setNewContact({ contactType: "", contactValue: "" });
        }}
      >
        Agregar contacto <AddCircleOutlineIcon />
      </MyButton>
    </div>
  );
}

const InputContact = ({
  contactType,
  contactValue,
  handleChange,
  placeholder,
}) => (
  <>
    <Grid container>
      <Grid item xs={4} style={{ padding: "4px" }}>
        <MySelectInput
          name={`contactType`}
          value={contactType || ""}
          placeholder={"Tipo"}
          options={CONTACT_TYPES}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={8} style={{ padding: "4px" }}>
        <MyTextInput
          placeholder={placeholder}
          name={`contactValue`}
          value={contactValue}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  </>
);
