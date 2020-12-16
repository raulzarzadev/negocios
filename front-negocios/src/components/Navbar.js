import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import negdelbar_logo from "../assets/negdelbar_logo.png";
import { Box } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import { useLocation } from "react-router-dom";
import { useUser } from "../context/userContext";
import MyLink from "./atomos/MyLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  menu: {
    "& .MuiMenu-paper ": {
      top: "16px !important",
    },
  },
  userMenu: {
    display: "flex",
    textDecoration: "none",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  listItem: {
    margin: theme.spacing(2),
    color: "#fff",
  },
}));

export default function Navbar() {
  const { signout: handleSignOut, data } = useUser();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (isOpen) => {
    setOpenMenu(isOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => handleOpenMenu(true)}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={openMenu}
              onClose={() => handleOpenMenu(false)}
              TransitionComponent={Fade}
              className={classes.menu}
            >
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/">Inicio</MyLink>
              </MenuItem>
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/nuevo-anuncio">Nuevo Anuncio</MyLink>
              </MenuItem>
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/nuevo-barrio">Nuevo Barrio</MyLink>
              </MenuItem>
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/nosotros">¿Nosotros?</MyLink>
              </MenuItem>
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/como-funciona">¿Como funcióna?</MyLink>
              </MenuItem>
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/contacto">¡Contactanos!</MyLink>
              </MenuItem>
              <MenuItem onClick={() => handleOpenMenu(false)}>
                <MyLink to="/guia-visual">Guía visual</MyLink>
              </MenuItem>
            </Menu>
          </div>
          <Box className={classes.title}>
            <MyLink to="/">
              <img
                style={{ width: "120px" }}
                src={negdelbar_logo}
                alt="negocios del barrio"
              />
            </MyLink>
          </Box>
          {data?.user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                className={classes.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <MyLink to="/perfil">Mi Perfil</MyLink>
                </MenuItem>
                <MenuItem onClick={handleSignOut}>Salir</MenuItem>
              </Menu>
            </div>
          ) : (
            <ul className={classes.userMenu}>
              {location.pathname === "/ingresa" ? (
                <li className={classes.listItem}>
                  <MyLink to="/registrate">Registrate</MyLink>
                </li>
              ) : (
                <li className={classes.listItem}>
                  <MyLink to="/ingresa">Ingresa</MyLink>
                </li>
              )}
            </ul>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
