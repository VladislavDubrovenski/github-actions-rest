import { useMsal } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";
import { useEffect, useState } from "react";


export function useAuth(loginRequest: { scopes: string[]; }): string | null {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  useEffect(() => {
    const handleLogin = async () => {
      if (accounts.length === 0 || inProgress !== "none") {
        return;
      }
      try {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0] as AccountInfo,
        });
        setAccessToken(response.accessToken);
      } catch (error) {
        console.error(error);
      }
    };

    handleLogin();
  }, [accounts, inProgress, instance, loginRequest]);
  return accessToken;
}
