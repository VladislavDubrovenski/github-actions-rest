import { Typography } from "@material-ui/core";
import type { MsalAuthenticationResult } from "@azure/msal-react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import useStyles from "../styles/useStyles";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";

const useErrorCardStyles = makeStyles({
  media: {
    height: "100px",
    backgroundSize: "contain",
    maxWidth: "380px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundPosition: "center",
  },
});

interface ErrorCardProps {
  headerText: string;
  errorMessages: string[];
}

export const ErrorCard = (props: ErrorCardProps): JSX.Element | null => {
  const { headerText, errorMessages } = props;
  const classes = useStyles();
  const img = "/bannerlogo.jpg";

  const cardClasses = useErrorCardStyles();
  const errorContent = errorMessages.map((msg, idx) => {
    return (
      <li key={idx}>
        <Typography component="div" variant="subtitle1">
          {msg}
        </Typography>
      </li>
    );
  });

  return (
    <Box
      className={classes.errorBox}
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Container maxWidth="sm">
        <Card
          classes={{
            root: classes.errorCard,
          }}
          elevation={6}
        >
          <CardMedia
            image={img}
            title="logo"
            classes={{ root: cardClasses.media }}
          />

          <Typography
            component="div"
            variant="h5"
            className={classes.textCenter}
          >
            {headerText}
          </Typography>
          {errorContent.length > 0 && (
            <Box p={2}>
              <ul>{errorContent}</ul>
            </Box>
          )}
        </Card>
      </Container>
    </Box>
  );
};

export const ErrorComponent = (
  props: MsalAuthenticationResult
): JSX.Element | null => {
  const { error } = props;
  const { t } = useTranslation();
  if (!error) {
    return null;
  }

  const error_array = error.errorMessage
    .split(".")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);

  return (
    <ErrorCard
      headerText={t("There was an error logging you in")}
      errorMessages={error_array}
    />
  );
};

interface CustomErrorComponentProps {
  error?: string | null;
}

export const CustomErrorComponent = (
  props: CustomErrorComponentProps
): JSX.Element | null => {
  const { error } = props;
  const { t } = useTranslation();
  if (!error) {
    return null;
  }

  return (
    <ErrorCard
      headerText={t("You cannot view this page")}
      errorMessages={[error]}
    />
  );
};
