import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./NavBar";

const usePageLayoutStyles = makeStyles({
  outer: {
    height: "100%",
  },
  main: {
    flexGrow: 1,
    overflowY: "auto",
    width: "100%",
    maxHeight: "calc(100vh - 86px)",
  },
});

export const PageLayout = (props: {
  children: React.ReactNode;
}): JSX.Element => {
  const classes = usePageLayoutStyles();
  return (
    <Box height="calc(100vh - 14px)">
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        spacing={1}
        className={classes.outer}
      >
        <Grid item style={{ width: "100%" }}>
          <NavBar />
        </Grid>
        <Grid item className={classes.main}>
          {props.children}
        </Grid>
      </Grid>
    </Box>
  );
};
