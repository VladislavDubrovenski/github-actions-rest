import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import Typography from "@material-ui/core/Typography";
import { AccountInfo } from "@azure/msal-browser";

const arrangeName = (displayName?: string | null): string => {
  if (typeof displayName === "string" && displayName.length > 0) {
    if (displayName.includes(', ')) {
      const parts = displayName.split(", ");
      if (parts.length === 2) {
        return `${parts[1]} ${parts[0]}`;
      }
    }
    return displayName;
  }
  return "";
};

// WILL USE WHEN ADD PROFILE PICTURE
const WelcomeName = (): JSX.Element | null => {
  const { accounts } = useMsal();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (Array.isArray(accounts) && accounts.length > 0) {
      const account = accounts[0] as AccountInfo;
      setName(arrangeName(account.name));
    } else {
      setName("");
    }
  }, [accounts]);

  return typeof name === "string" && name.length > 0 ? <Typography variant="h6" color="secondary">{name}</Typography> : null;
};

export default WelcomeName;
