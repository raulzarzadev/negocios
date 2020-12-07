import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    borderRadius: theme.spacing(2),
    position: "absolute",
    width: "90%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    //border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    padding: theme.spacing(0.5, 0.5),
    borderRadius: theme.spacing(2, 2, 0, 0),
  },
  modalTitle: {
    paddingLeft: theme.spacing(2),
    margin: 0,
  },
  contentModal: {
    height: "calc(100vh/2)",
    padding: theme.spacing(2),
  },
}));

export default function MyModal({
  open,
  handleOpenModal,
  title = "title",
  children,
}) {
  const classes = useStyles();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleOpenModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <div className={classes.modalHeader}>
            <h4 className={classes.modalTitle} id="simple-modal-title">
              {title}
            </h4>
            <div>
              <IconButton onClick={handleOpenModal} size="small">
                <HighlightOffIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.contentModal}>{children}</div>
        </div>
      </Modal>
    </div>
  );
}
