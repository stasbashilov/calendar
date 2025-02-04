import { ReactElement } from "react";
import { Box } from "@mui/material";
import Calendar from "./components/Calendar";
import Header from "../components/Header/Header.tsx";

const DashboardPage = (): ReactElement => {
  return (
    <>
      <Header title="Dashboard" />
      <Box sx={{ padding: 2 }}>
        <Calendar />
      </Box>
    </>
  );
};

export default DashboardPage;
