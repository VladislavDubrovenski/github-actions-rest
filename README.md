# React App Sample

The purpose of this application is to serve as an example of how to create a React app for B2C IAM. 
The most notable package that was utilized is Microsoft Authentication Library(MSAL.js v2.0). This [official github link](https://github.com/AzureAD/microsoft-authentication-library-for-js) has a lot of examples on how to utilize this library with various frameworks.

If you have suggestions for improving this example, please use the "Discussions" tab.

## Starting the React Sample App

We utilized [pnpm](https://pnpm.io/) as our package manager. In order to start the application, first run "pnpm i" and then "pnpm start". The application will be available at localhost: http://localhost:7777/ 

In case you don't have pnpm install, simply run: "npm install -g pnpm"

## OAuth2 - Authorization Code Flow with Proof Key for Code Exchange(PKCE)

Before starting with Authorization Code Flow, it is a great idea to consult the [documentation](https://auth0.com/docs/flows/authorization-code-flow-with-proof-key-for-code-exchange-pkce) about what PKCE actually is. Most of the flow is covered by the MSAL.js out-of-box, however, this is very useful to know how the OAuth2 works in case you will need to test the API calls via other means, [Postman](https://www.postman.com/) for example. 

### MSAL Configuration
The MSAL configuration for this sample app is available [here](https://github.com/Arcadis/global-iam/blob/master/interfaces/examples/react-app/src/authConfig.ts) 

Most notably, the following sets up the authentification configuration: 
```tsx
export const msalConfig = {
    auth: {
        clientId: clientID,
        authority: `https://${tenant}.b2clogin.com/${tenant}.onmicrosoft.com/${signin_signup}`,
        knownAuthorities: [`${tenant}.b2clogin.com`],
        redirectUri: `${schmema}://${host}/oauth-callback`,
        postLogoutRedirectUri: `${schmema}://${host}`,
        authorityMetadata: process.env.REACT_APP_B2C_METADATA_PULLED as string || process.env.REACT_APP_B2C_METADATA as string
    }
};
```

Obviously, you will need to set up an app in azure to get the client Id. Also, your redirect uri that is set up in Azure should match  the one in the above configuration, otherwise, the app will not work. 

Note that we also provide the authority metadata above. That improves the user experience as the login flows will work faster. Furthermore, we propose to pull the most updated configuration during the build times in the [package.json file](https://github.com/Arcadis/global-iam/blob/master/interfaces/examples/react-app/package.json):  

```json
     "build:prod": "REACT_APP_B2C_METADATA_PULLED=$(curl https://arcadisb2c.b2clogin.com/arcadisb2c.onmicrosoft.com/b2c_1a_global_signup_signin/v2.0/.well-known/openid-configuration) react-scripts build",

```

You will also need to set up the following configuration: 

```ts
export const loginTestRequest = {
    scopes: [`openid https://ArcadisB2CDEV.onmicrosoft.com/GlobalIAMAdminAPI/Access`] //the second entry is needed to retrieve the access token for the app
};
```

Please note the second entry. This one is needed to retrieve the access token for an app. For just authentification, it would be enough to have just an "openid" there. Please note that you can use only 1 external scope per 1 request. In order to set up 2 or more scope, you will have to do 2 or more requests. Please use our [admin app](https://github.com/Arcadis/global-iam/tree/master/interfaces/applications-interface) as a reference on how to do that. 


### React Authentification with MSAL.js

This section describes how msal.js is used in react. We use functional components and hooks, so, if you are unfimiliar with those, this [link](https://reactjs.org/docs/getting-started.html) provides some great documentation on react.

Most of the authentification is happening in [this file](https://github.com/Arcadis/global-iam/blob/master/interfaces/examples/react-app/src/App.tsx).

First, we utilize the hook called "useMsalAuthentication" from msal.js library as follows:
```ts
const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginTestRequest
  );
```
Note the interaction type is "Silent". The following interaction types are also available: "Popup" and "Redirect". Both of this interaction types are discouraged due to different support by different browsers(especially mobile browsers). 

In order to control various flows, we use the following ["useEffect"](https://reactjs.org/docs/hooks-reference.html#useeffect) react hook:
```ts
  useEffect(() => {
    if (!error) return;
    if (
      error.errorMessage?.indexOf("AADSTS50005") > -1 ||
      error.errorMessage?.indexOf("AADSTS53000") > -1
    )//incompatible devices/OS codes
    {
      history.push("/error");
    } else {
      login(InteractionType.Redirect, loginTestRequest);
    }
  }, [login, error, history]);
```

The code in "useEffect" hook will only run when one of the variable in the array(second parameter) changes. 
Note in the above code we handle various error code. In order to make sure that the correct error message is displayed on devices that are not supported, we have to handle "AADSTS50005" and "AADSTS53000". If you would like to set up the flow for different codes, please use [this link](https://docs.microsoft.com/en-us/azure/active-directory-b2c/error-codes) for all the error codes available in B2C. 

There are few more things that we have to set up in order for our auth to work. The following can be done in multiple ways, and we present one of them.
First, we create the Public Client Application(pca) using the msalConfig we set up earlier and we pass it to App.tsx: 
```tsx
const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.render(
  <React.StrictMode>
      <App pca={msalInstance}/>
  </React.StrictMode>,
  document.getElementById("root")
);
```
Second, we use that pca in MsalProvider as follows: 
```tsx
const instrumentation_key = process.env.REACT_APP_INTRUMENTATION_KEY as string;
function App({ pca }: AppProps): JSX.Element {
  return (
        <MsalProvider instance={pca}>
          <Router>
            <PageLayout>
              <Suspense fallback="loading">
                <Pages />
              </Suspense>
            </PageLayout>
          </Router>
        </MsalProvider>
  );
}
```
And finally, we wrap our data that we component that we want to protect with the authentification in Authenticated Template imported from msal-react: 
```tsx
export function Home(): JSX.Element {

    return (
      <AuthenticatedTemplate>
        <ProtectedData  />
      </AuthenticatedTemplate>
    );
}
```

That concludes the authentification stage of our sample app. 

### React Authorization with MSAL.js
Identity and Access Management(IAM) consists of two parts: Authentification and Authorization. Authentification provides the ability to know who the user is, while authorization provides a way to control what such user should access. IAM in Microsoft is done use Role-based access control-RBAC([docs](https://docs.microsoft.com/en-us/azure/role-based-access-control/overview)). We have the experience utilizing all the component of RBAC in B2C, except the Deny Assignment and Groups.

Referencing our [Admin UI App](https://github.com/Arcadis/global-iam/tree/master/interfaces/applications-interface) again, where we actually able to manage users and roles, as well as apps, the permissions can be done in two ways. We could either just use the role of the user to permit/deny various operations, or, we could calculate the permission in the azure cloud functions (as was done in Admin UI, where users can manage different apps with different access levels). We retrieve all the information regarding user(including roles) in [this file](https://github.com/Arcadis/global-iam/blob/master/interfaces/examples/react-app/src/pages/Protected.tsx). We use the following code in order to retrieve the roles:

```ts
const { accounts } = useMsal();
const account = accounts[0] as AccountInfo;
const idTokenClaimsRoles = Object((accounts[0] as AccountInfo).idTokenClaims)["roles"];

```

The roles come from access token, which has to be retrieved using scopes we described in the beginnning. For interactivity, you could click the following button when running the UI which will provide the description of each claim access token provides(you will not see the button if you didn't get the token): 

![image](https://user-images.githubusercontent.com/80131142/118333194-eef28300-b4d0-11eb-9345-76a2ac381a82.png)



You will be taken to jwt.ms website which should look as follows: 
![image](https://user-images.githubusercontent.com/80131142/118332989-8a372880-b4d0-11eb-9617-644809a4b64f.png)

Note that the access token experies(exp described the time the access token will expire). 


### Tracking with Insights

The Microsoft Insights provides a power tool to track various events([doc](https://docs.microsoft.com/en-us/azure/active-directory-b2c/analytics-with-application-insights?pivots=b2c-user-flow)). It is possible to track exceptions, requests, page views, dependencies, and availability. So, if the request throws an error, and you have the tracking available, this is the first place to look at. 

Additionally, we could track custom events. For example, in the Admin UI, we track the button presses with just the following 5 lines of code: 

```ts
const appInsights = useAppInsightsContext();
const { accounts } = useMsal();
const trackButton = useTrackEvent(appInsights, "Application Access Information", { appName: displayName, homePageUrl: homePageUrl, userName: userName });
const handleTelemetryEvent = useCallback(() => {
    trackButton({ appName: validatedDisplayName, homePageUrl: homePageUrl, userName: userName });
  }, [homePageUrl, trackButton, userName, validatedDisplayName]);
```

As you may know, various countries have different laws regarding privacy. Therefore, the GdprProvider package was implemented. This function is a wrapper for Microsoft Insights, but it also provides a user with a message consenting or denying the usage of cookies for tracking. 

One will need the intrumentation key for the app to use the insights. Then, just wrap that functional component GdprProvider as follows: 
```tsx
<GdprProvider instrumentationKey={instrumentation_key}>
  <ThemeProvider theme={theme}>
    <MsalProvider instance={pca}>
     ...
    </MsalProvider>
  </ThemeProvider>
</GdprProvider>
```
That itself will provide all the tracking except the custom events. Do note that the following line will have to be changed to the correct instrumentation key in the ".env" file:

```
REACT_APP_INTRUMENTATION_KEY = 00000000-0000-0000-0000-0000000000000  
```

## Conclusion

We appreciate you reading this documentation for our React Sample App. Again, if you have suggestions on improving this guide, please use the "Discussion" tab.
