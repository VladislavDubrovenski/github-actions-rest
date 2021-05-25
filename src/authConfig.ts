const host = process.env.REACT_APP_HOST || "localhost:7777" as string;
const schmema = host.startsWith("localhost") ? "http" : "https";
const tenant = process.env.REACT_APP_TENANT_NAME as string;
const signin_signup = process.env.REACT_APP_SIGN_UP_SIGN_IN_POLICY as string;
const clientID = process.env.REACT_APP_CLIENT_ID_LANDING as string;

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

export const loginTestRequest = {
    scopes: [`openid https://${tenant}.onmicrosoft.com/GlobalIAMAdminAPI/Access`]
};
