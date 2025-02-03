import { Box}  from "@mui/material";
import { weekDays } from "../../../constants/constants.ts";
import {ReactElement} from "react";

const WeekdaysRow= (): ReactElement => {
  return (
    <Box display="flex" justifyContent="space-between" width="100%" mb={1}>
      {weekDays.map((day) => (
        <Box key={day} flex="1" textAlign="center" fontWeight="bold">
          {day}
        </Box>
      ))}
    </Box>
  )
}

export default WeekdaysRow;