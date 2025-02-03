import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store.ts";
import { setSearchQuery } from "../../../store/eventsSlice.ts";
import { Box } from "@mui/material";
import {ReactElement} from "react";

const EventList = (): ReactElement => {
  const dispatch = useDispatch();
  const { events, searchQuery } = useSelector(
    (state: RootState) => state.events,
  );

  const filteredEvents = events.filter((event) => {
    return event.label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Box width={{ xs: "100%", sm: "300px" }}>
      <Autocomplete
        disablePortal
        options={filteredEvents}
        sx={{ width: "100%" }}
        onInputChange={(_, newValue) => dispatch(setSearchQuery(newValue))}
        renderInput={(params) => <TextField {...params} label="Event" />}
        renderOption={(props, option) => (
          <li {...props} key={option.id} style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
            <div>{option.label}</div>
            <div style={{ fontSize: "12px", color: "gray" }}>
              {option.date}
            </div>
          </li>
        )}
      />
    </Box>
  );
};

export default EventList;
