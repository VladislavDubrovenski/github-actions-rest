import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import WelcomeName from "./WelcomeName";
import SignInSignOutButton from "./MainMenuAuthWrapper";
import useStyles from "../styles/useStyles";
import Hidden from "@material-ui/core/Hidden";

const NavBar = (): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title}>
          <img
            src="/logo_small.jpg"
            alt="logo"
          />
        </Typography>
        <Hidden only="xs">
          <WelcomeName />
        </Hidden>
        <SignInSignOutButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
