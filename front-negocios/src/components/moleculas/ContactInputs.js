import React, { useEffect, useState } from "react";
import MyButton from "../atomos/MyButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MySelectInput from "../atomos/MySelectInput";
import { CONTACT_TYPES } from "../../HardData/CONTACT_TYPES";
import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import MyTextInput from "../atomos/MyTextInput";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function ContactInputs({ advert, setAdvert }) {
  const [contacts, setContacts] = useState(advert.contacts || []);
  const [newContact, setNewContact] = useState({ contactType: "" });
  const [placeholder, setPlaceholder] = useState("");
  const [defaultValue, setDefaultValue] = useState("");
  useEffect(() => {
    switch (newContact.contactType) {
      case "":
        setPlaceholder("Selecciona el tipo de contacto");
        setDefaultValue("");
        break;
      case "ws":
        setPlaceholder("Escribe tu whats app");
        setDefaultValue("+52");
        break;
      case "tel":
        setPlaceholder("Numero de teléfono");
        setDefaultValue("");
        break;
      case "fb":
        setDefaultValue("https://facebook.com/");
        //setPlaceholder("Numero de teléfono");
        break;
      case "in":
        setDefaultValue("https://instagram.com/");
        break;
      case "web":
        setDefaultValue("https://");
        break;
      default:
        setPlaceholder("Copia el link");
        break;
    }
  }, [newContact.contactType, defaultValue]);
  console.log(defaultValue);

  const addContact = () => {
    setContacts([...contacts, newContact]);
  };
  useEffect(() => {
    setAdvert({ ...advert, contacts });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Grid xs={2}>
              <IconButton
                size="small"
                onClick={() => handleDeleteContact(contact)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
            <Grid item xs={2} style={{ alignSelf: "center" }}>
              <Typography variant="h6" align="center">
                {contact.contactType}:
              </Typography>
            </Grid>
            <Grid item xs={8} style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="p" noWrap>
                {contact.contactValue}
              </Typography>
            </Grid>
          </Grid>
        </>
      ))}

      <InputContact
        contactType={newContact.contactType}
        contactValue={newContact.contactValue}
        handleChange={handleChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      <Box m={3}>
        <MyButton
          disabled={!newContact.contactType || !newContact.contactValue}
          onClick={() => {
            addContact();
            setNewContact({ contactType: "", contactValue: "" });
          }}
        >
          Agregar contacto <AddCircleOutlineIcon />
        </MyButton>
      </Box>
    </div>
  );
}

const InputContact = ({
  contactType,
  contactValue,
  handleChange,
  placeholder,
  defaultValue,
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
          defaultValue={defaultValue}
        />
      </Grid>
    </Grid>
  </>
);
