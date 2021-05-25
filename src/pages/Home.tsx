import { AuthenticatedTemplate } from "@azure/msal-react";
import {
  ProtectedData
} from "./Protected";

export function Home(): JSX.Element {
 
    return (
      <AuthenticatedTemplate>
        <ProtectedData  />
      </AuthenticatedTemplate>
    );
}
export default Home;
