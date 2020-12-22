import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CardMedia from "@material-ui/core/CardMedia";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageIcon from "@material-ui/icons/Language";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    maxWidth: 345,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  media: {
    backgroundPositionY: "0",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardPaper(props) {
  const classes = useStyles();

  const { whatsApp, tel, faceUrl, instaUrl, siteUrl } = props;
  const { googleLocation } = props;

  const {
    title,
    description,
    imgUrl,
    imgUrlDer,
    imgUrlIzq,
    backgroundColor = "#fff",
    styles,
    delibery,
  } = props;

  function onDoubleClick(urlImage) {
    window.location = urlImage;
  }

  return (
    <Card
      className={classes.root}
      style={{ backgroundColor: backgroundColor || styles.backgroundColor }}
      variant="outlined"
    >
      <Typography variant="h5">{title}</Typography>
      <CardContent style={{ padding: "0" }}>
        {imgUrl || imgUrlIzq || imgUrlDer ? (
          <>
            <CardMedia
              className={classes.media}
              image={imgUrl || imgUrlIzq || imgUrlDer}
              title="media title"
              onDoubleClick={() =>
                onDoubleClick(imgUrl || imgUrlIzq || imgUrlDer)
              }
            />
          </>
        ) : null}
        <CardActions style={cardActionsStyle}>
          {googleLocation ? (
            <IconButton style={gradiantBlue}>
              <LocationOnIcon fontSize="large" style={buttonStyle} />
            </IconButton>
          ) : null}
          {siteUrl ? (
            <IconButton href={siteUrl} style={gradiantBlue}>
              <LanguageIcon fontSize="large" style={buttonStyle} />
            </IconButton>
          ) : null}
          {faceUrl ? (
            <IconButton href={faceUrl} style={gradiantBlue}>
              <FacebookIcon fontSize="large" style={buttonStyle} />
            </IconButton>
          ) : null}
          {tel ? (
            <IconButton href={`tel:${tel}`} style={gradiantBlue}>
              <PhoneForwardedIcon fontSize="large" style={buttonStyle} />
            </IconButton>
          ) : null}

          {whatsApp ? (
            <IconButton
              href={`https://wa.me/521${whatsApp.replace(
                / /g,
                ""
              )}?text=Hola,%20te%20encontre%20en%20negociosdelbarrio.com%20y%20quisiera..`}
              style={gradiantBlue}
            >
              <WhatsAppIcon fontSize="large" style={buttonStyle} />
            </IconButton>
          ) : null}
          {instaUrl ? (
            <IconButton href={instaUrl} style={gradiantBlue}>
              <InstagramIcon fontSize="large" style={buttonStyle} />
            </IconButton>
          ) : null}
        </CardActions>
        <Typography className={classes.pos} color="textSecondary">
          {delibery ? "Servicio a Domicilio!" : null}
        </Typography>
        <Typography variant="body1" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
const buttonStyle = {
  color: "blue",
};
const cardActionsStyle = {
  justifyContent: "space-around",
  marginTop: "-15px",
};
const gradiantBlue = {
  background:
    "linear-gradient(to bottom, rgba(15,180,231,1) 0%,rgba(15,180,231,0.99) 1%,rgba(169,228,247,0) 100%)",
};
