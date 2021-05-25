import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  loadingScreen: {
    color: "#007377",
    height: "100%",
  },
}));

export const Loading = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
      className={classes.loadingScreen}
    >
      <Grid item>
        <CircularProgress color="inherit" />
      </Grid>
      <Grid item>
        <Typography>Loading, please wait...</Typography>
      </Grid>
    </Grid>
  );
};
