import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
        }}>
        <Outlet />
      </Box>
    </>
  );
};

export default LoginPage;
