import { EventType } from "../../../types/types.ts";
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export type EventProps = {
  event: EventType;
};

const Event = ({ event }: EventProps): ReactElement => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      zIndex: 1,
    }}
  >
    <Typography variant="h6">{event.label}</Typography>
    <Typography>{event.description}</Typography>
  </Box>
);

export default Event;
