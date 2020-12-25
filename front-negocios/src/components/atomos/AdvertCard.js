import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import defaultImage from "../../assets/negdelbar_logo.png";
import { useHistory } from "react-router-dom";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  Tooltip,
} from "@material-ui/core";
import MyModal from "./MyModal";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";
import ContactLink from "./ContactLink";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 150,
    width: "100%",
  },
  labelsBox: {
    [theme.breakpoints.up("xs")]: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: "16px",
    },
  },
  contactsBox: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
  advertTitle: {
    fontSize: 15,
    [theme.breakpoints.up("sm")]: {
      fontSize: 20,
    },
  },
  actionsAdvert: { display: "flex", justifyContent: "flex-end" },
  cardMedia: { height: 70, objectFit: "cover" },
  cardContent: {
    padding: theme.spacing(0.5),
  },
}));

export default function AdvertCart({
  advert = {},
  admin = false,
  handleDelete,
}) {
  const {
    title,
    description,
    image,
    styles,
    googleLocation,
    labels = [],
    backgroundColor,
    location,
    _id,
    contacts,
  } = advert;

  const classes = useStyles();
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = (advertId) => {
    history.push(`/editar/${advertId}`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card className={classes.root}>
      <Box className={classes.labelsBox} style={styles || { backgroundColor }}>
        <Box className={classes.actionsAdvert}>
          {admin ? (
            <>
              <Tooltip title="Opciones">
                <IconButton
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClickMenu}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Ver Menú</MenuItem>
                <MenuItem onClick={handleClose}>Guardar</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleDelete(_id);
                    handleClose();
                  }}
                >
                  Eliminar
                </MenuItem>
                <MenuItem onClick={() => handleEdit(_id)}>Editar</MenuItem>
              </Menu>
            </>
          ) : (
            <Tooltip title="Guardar">
              <IconButton>
                <BookmarkBorderIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box>
          {labels?.map((label, i) => (
            <Tooltip
              key={i}
              title={label.label}
              style={{ fontSize: 18, margin: "0 2px" }}
            >
              <SvgIcon>
                {CHIP_LABELS.map(
                  (chip) => chip.value === label.value && chip.icon
                )}
              </SvgIcon>
            </Tooltip>
          ))}
        </Box>
      </Box>
      <CardActionArea onClick={handleOpenModal}>
        <CardMedia
          component="img"
          alt={title}
          className={classes.cardMedia}
          src={image?.src || defaultImage}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.advertTitle}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            classes={classes.advertDescription}
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions style={styles || { backgroundColor }}>
        <Box className={classes.contactsBox}>
          {location && (
            <Tooltip title=" Ubicación">
              <IconButton href={googleLocation}>
                <LocationOnIcon />
              </IconButton>
            </Tooltip>
          )}
          {contacts?.map((contact) => (
            <ContactLink contact={contact} />
          ))}
        </Box>
      </CardActions>
      <MyModal open={openModal} handleOpenModal={handleOpenModal}>
        <div> Aca iria el menu</div>
      </MyModal>
    </Card>
  );
}
