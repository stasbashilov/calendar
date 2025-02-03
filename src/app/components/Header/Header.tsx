import { Box, IconButton, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useContext } from "react";
import UserContext, { UserContextType } from "../../context/UserContext.tsx";
import { useNavigate, Link, useLocation } from "react-router-dom";
import CustomWidthTooltip from "../Tooltip/CustomWidthTooltip.tsx";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  const isProfilePage = currentPath === "/profile";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#1976d2",
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: "white" }}>
        {title}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {user && (
          <>
            <Typography variant="body1" sx={{ marginRight: 2, color: "white" }}>
              {user?.name || "---"}
            </Typography>
            <CustomWidthTooltip
              maxWidth={100}
              title={isProfilePage ? "" : "Go to Profile Page"}
            >
              <Link to="/profile" style={{ textDecoration: "none" }}>
                <IconButton
                  sx={{
                    color: "#ffffff",
                    "&:hover": {
                      color: "#cccccc",
                    },
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </Link>
            </CustomWidthTooltip>
            {isProfilePage && (
              <CustomWidthTooltip maxWidth={100} title={"Go to Dashboard"}>
                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                  <IconButton
                    sx={{
                      color: "#ffffff",
                      "&:hover": {
                        color: "#cccccc",
                      },
                    }}
                  >
                    <DashboardIcon />
                  </IconButton>
                </Link>
              </CustomWidthTooltip>
            )}
            <CustomWidthTooltip maxWidth={100} title={"Log Out"}>
              <IconButton
                sx={{
                  color: "#ffffff",
                  "&:hover": {
                    color: "#cccccc",
                  },
                }}
                onClick={handleLogout}
              >
                <ExitToAppIcon />
              </IconButton>
            </CustomWidthTooltip>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
