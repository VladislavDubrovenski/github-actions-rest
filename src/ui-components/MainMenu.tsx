import React, { useState, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export const MainMenuButton = (): JSX.Element => {
  const { instance } = useMsal();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleLogout = useCallback(() => {
    setAnchorEl(null);
    instance.logout();
  }, [instance]);
  
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );


  return (
    <div>
      <IconButton onClick={handleOpen} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={anchorEl !== null}
        onClose={handleClose}
      >
       <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default MainMenuButton;