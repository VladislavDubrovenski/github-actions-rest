import { useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { theme } from "./styles/theme";
import { MsalProvider, useMsalAuthentication } from "@azure/msal-react";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";
import { PageLayout } from "./ui-components/PageLayout";
import Home from "./pages/Home";
import { loginTestRequest } from "./authConfig";
import { ErrorComponent } from "./ui-components/ErrorComponent";
import { ThemeProvider } from "@material-ui/core/styles";
import { GdprProvider } from "@arcadis/gdpr-react";
import axios from 'axios';

interface AppProps {
  pca: PublicClientApplication;
}

const instrumentation_key = process.env.REACT_APP_INTRUMENTATION_KEY as string;
function App({ pca }: AppProps): JSX.Element {
  return (
    // <GdprProvider instrumentationKey={instrumentation_key}>
      <ThemeProvider theme={theme}>
        {/* <MsalProvider instance={pca}> */}
          <Router>
            <PageLayout>
              <Suspense fallback="loading">
                <Pages />
              </Suspense>
            </PageLayout>
          </Router>
        {/* </MsalProvider> */}
      </ThemeProvider>
    // </GdprProvider>
  );
}

function Pages() {
  // const history = useHistory();

  // const { login, result, error } = useMsalAuthentication(
  //   InteractionType.Silent,
  //   loginTestRequest
  // );

  // useEffect(() => {
  //   if (!error) return;
  //   if (
  //     error.errorMessage?.indexOf("AADSTS50005") > -1 ||
  //     error.errorMessage?.indexOf("AADSTS53000") > -1
  //   )
  //   {
  //     history.push("/error");
  //   } else {
  //     login(InteractionType.Redirect, loginTestRequest);
  //   }
  // }, [login, error, history]);

  return (
    <Switch>
      <Route path="/error">
        {/* <ErrorComponent login={login} result={result} error={error} /> */}
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  );
}
export default App;
