import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const LoginPage = (): ReactElement => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default LoginPage;
