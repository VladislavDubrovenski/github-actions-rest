import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      height: "auto",
      color: "white",
      margin: "8px"
    },
    html: {
      height: "100%",
      margin: 0,
    },
    "#componentWithId": {
      height: "100%",
    },
  },
  errorCard:{
    backgroundColor: "#fff",
    color: "#1b1b1b",
  },
  errorBox:{
    backgroundColor: "#e3610d",
  },
  root: {
    flexGrow: 1,
    color: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: "215px",
    // paddingTop: "37%",
    // width: "80%",
    // marginLeft: "10%",
    // marginRight: theme.spacing(1),
    // marginLeft: theme.spacing(1),
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    backgroundSize: "auto",
    backgroundPosition: "center",
  },
  expand: {
    marginLeft: "auto",
    opacity: "100%",
    color: "#fff",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    opacity: "60%",
  },
  boldText: {
    fontWeight: 600,
  },
  textRight: {
    textAlign: "right",
  },
  textCenter: {
    textAlign: "center",
  },
}));

export default useStyles;