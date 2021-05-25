import { useMsal } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";
import { loginTestRequest } from "../authConfig";

import { Loading } from "../ui-components/Loading";
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import { useAuth } from "../CustomHooks";


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const ProtectedData = (): JSX.Element | null => {
  const accessToken = useAuth(loginTestRequest);
  const { accounts } = useMsal();
  const account = accounts[0] as AccountInfo;
  const idTokenClaimsRoles = Object((accounts[0] as AccountInfo).idTokenClaims)["roles"];

  const classes = useStyles();
  const jwtLink = accessToken ? "https://jwt.ms/#id_token=" + accessToken : null;
  if (!accessToken && !account) {
    return <Loading />
  }
  return (<Grid
    container
    direction="row"
    justify="center"
    alignItems="center"
    spacing={1}
  >
    <Grid item>
      <Card className={classes.root}>
        <CardContent>
          <Typography paragraph  >
            Name: {account.name}
          </Typography>
          <Typography paragraph >
            User Name: {account.username}
          </Typography>
          <Typography paragraph >
            Environment: {account.environment}
          </Typography>
          <Typography paragraph >
            Home Account Id: {account.homeAccountId}
          </Typography>
          <Typography paragraph  >
            Local Account Id: {account.localAccountId}
          </Typography>
          <Typography paragraph >
            Tenant Id: {account.tenantId}
          </Typography>
          <Typography paragraph >
            Roles: {idTokenClaimsRoles}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center" item>
      {
        jwtLink ?
          <Button target="_blank"
            variant="outlined"
            color="secondary"
            href={jwtLink}>JWT Token</Button>
          : <Typography paragraph >
            No Access Token Available
          </Typography>}

    </Grid>
  </Grid>
  );
};
