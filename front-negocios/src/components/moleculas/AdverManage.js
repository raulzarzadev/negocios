import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Loading from "../atomos/Loading";

import {
  Box,
  Button,
  FormLabel,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { CHIP_LABELS } from "../../HardData/CHIPS_LABELS";
import ToPublishAdvert from "../moleculas/ToPublishAdvert";
import { deleteAdvert, updateAdvert } from "../../utils/adverts";
import AdvertCart from "../atomos/AdvertCard";
import MyModal from "../atomos/MyModal";

import PublishIcon from "@material-ui/icons/Publish";
import GetAppIcon from "@material-ui/icons/GetApp";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DetailsIcon from "@material-ui/icons/Details";

const useStyles = makeStyles((theme) => ({
  root: {
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

export default function AdvertManage({ advert = {} }) {
  const {
    title,
    description,
    labels = [],
    isPublished,
    _id,
    contacts,
  } = advert;

  const classes = useStyles();
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDeleteAdvert = (id) => {
    setLoading(true);
    deleteAdvert(id)
      .then((res) => {
        window.location.replace("");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  const handleOpenPublishModal = () => {
    setPublishModal(!publishModal);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUnpublish = () => {
    updateAdvert(advert._id, {
      ...advert,
      isPublished: false,
      publishedOn: [],
    })
      .then((res) => {
        window.location.replace("");
      })
      .catch((err) => console.log(err));
  };
  const [detailsModal, setDetailsModal] = useState(false);

  const handleOpenDetailsModal = () => {
    setDetailsModal(!detailsModal);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = (advertId) => {
    history.push(`/editar/${advertId}`);
  };

  return (
    <>
      <Grid item xs={12} container style={{ margin: '8px 0'}}>
        <Grid item xs={3}>
          <Typography noWrap>{title}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography noWrap>{description}</Typography>
        </Grid>

        <Grid item xs={2}>
          {isPublished ? (
            <CheckCircleIcon fontSize="small" style={{ color: "green" }} />
          ) : (
            <CancelIcon fontSize="small" style={{ color: "gray" }} />
          )}
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="space-around">
            {isPublished ? (
              <Tooltip title="Despublicar">
                <IconButton
                  size="small"
                  onClick={handleUnpublish}
                  style={{ color: "red" }}
                >
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Publicar">
                <IconButton size="small" onClick={handleOpenPublishModal}>
                  <PublishIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Editar">
              <IconButton size="small" onClick={() => handleEdit(_id)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Detalles">
              <IconButton
                size="small"
                onClick={() => handleOpenDetailsModal(_id)}
              >
                <DetailsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" onClick={handleOpenDeleteModal}>
                <DeleteForeverIcon fontSize="small" style={{ color: "red" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
      <MyModal
        title="Publicar anuncio"
        open={publishModal}
        handleOpenModal={handleOpenPublishModal}
      >
        <ToPublishAdvert advert={advert} closeModal={handleOpenPublishModal} />
      </MyModal>
      <MyModal
        title="Eliminar anuncio"
        open={deleteModal}
        handleOpenModal={handleOpenDeleteModal}
      >
        <Typography variant="p" align="center">
          Para eliminar el siguiente anuncio, da click en
          <strong>'eliminar anuncio'</strong>
        </Typography>
        <Box my={2}>
          <AdvertCart advert={advert} />
        </Box>
        <Box marginTop={2}>
          <Typography>
            <em>Esta accion no se puede deshacer!</em>
          </Typography>
          <Box display="flex" justifyContent="center" m={1}>
            {loading ? (
              <Loading />
            ) : (
              <Button
                variant="outlined"
                style={{ color: "red" }}
                onClick={() => handleDeleteAdvert(_id)}
              >
                Eliminar anuncio
              </Button>
            )}
          </Box>
        </Box>
      </MyModal>
      <MyModal
        title="Detalles de anuncio"
        open={detailsModal}
        handleOpenModal={handleOpenDetailsModal}
      >
        <Box display="flex" justifyContent="center">
          <Box width={240}>
            <AdvertCart advert={advert} />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Box p={1} textAlign="center">
              {isPublished ? (
                <>
                  <CheckCircleIcon
                    fontSize="small"
                    style={{ color: "green" }}
                  />
                  <FormLabel component="legend">publicado</FormLabel>
                </>
              ) : (
                <>
                  <CancelIcon fontSize="small" style={{ color: "red" }} />
                  <FormLabel component="legend">No publicado</FormLabel>
                </>
              )}
            </Box>

            {isPublished ? (
              <Tooltip title="Despublicar">
                <IconButton
                  size="small"
                  onClick={handleUnpublish}
                  style={{ color: "red" }}
                >
                  <GetAppIcon />
                  <FormLabel component="legend">despublicar</FormLabel>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Publicar">
                <IconButton
                  size="small"
                  onClick={handleOpenPublishModal}
                  //color="primary"
                >
                  <PublishIcon />{" "}
                  <FormLabel component="legend">publicar</FormLabel>
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Editar">
              <IconButton size="small" onClick={() => handleEdit(_id)}>
                <EditIcon /> <FormLabel component="legend">editar</FormLabel>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton size="small" onClick={handleOpenDeleteModal}>
                <DeleteForeverIcon style={{ color: "red" }} />{" "}
                <FormLabel component="legend">eliminar</FormLabel>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </MyModal>
    </>
  );
}
