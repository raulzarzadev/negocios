import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";

import { CONTACT_TYPES } from "../../HardData/CONTACT_TYPES";

export default function ContactLink({ contact }) {
  const { contactType, contactValue } = contact;
  const { label, icon } = CONTACT_TYPES.find(
    (element) => element.value === contact.contactType
  );

  let href;
  if (contactType === "ws") {
    href = `https://wa.me/521${contact.contactValue.replace(
      / /g,
      ""
    )}?text=Hola,%20te%20encontre%20en%20negociosdelbarrio.com%20y%20quisiera..`;
  }
  if (contactType === "tel") {
    href = `tel:${contactValue}`;
  }
  return (
    <Tooltip title={label}>
      <IconButton href={href || contact.contactValue} size="small">
        {icon}
      </IconButton>
    </Tooltip>
  );
}
