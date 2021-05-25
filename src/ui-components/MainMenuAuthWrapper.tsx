import { useIsAuthenticated } from "@azure/msal-react";
import MainMenu from "./MainMenu";

const SignInSignOutButton = (): JSX.Element | null => {
    const isAuthenticated = useIsAuthenticated();
    return isAuthenticated ? <MainMenu /> : null;
}

export default SignInSignOutButton;