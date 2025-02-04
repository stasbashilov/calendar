import React, { ReactElement, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { Action } from "redux";
import { Box, Button, Typography } from "@mui/material";
import EventsList from "../EventList/EventList.tsx";
import Event from "../Event/Event.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store.ts";
import { EventType } from "../../../types/types.ts";
import {
  addEvent,
  editEvent,
  getEvents,
  deleteEvent,
} from "../../../store/eventsSlice.ts";
import { EventForm } from "../EventForm";
import { ThunkDispatch } from "@reduxjs/toolkit";
import WeekdaysRow from "../WeekDaysRow/WeekdaysRow.tsx";
import CustomWidthTooltip from "../../../components/Tooltip";
import {
  INITIAL_DATE,
  INITIAL_EVENT_ID,
} from "../../../constants/constants.ts";

const Calendar = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [currentDate, setCurrentDate] = useState(DateTime.now());

  const { events, searchQuery } = useSelector(
    (state: RootState) => state.events,
  );
  const dispatch =
    useDispatch<ThunkDispatch<RootState, undefined, Action<string>>>();

  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth;
  const firstDayOfWeek = startOfMonth.weekday;

  const prevMonth = () => setCurrentDate(currentDate.minus({ months: 1 }));
  const nextMonth = () => setCurrentDate(currentDate.plus({ months: 1 }));

  const daysArray = Array.from({ length: daysInMonth }, (_, i) =>
    startOfMonth.plus({ days: i }),
  );
  const emptyDays = Array.from({ length: firstDayOfWeek - 1 }, (_, i) => i);

  const getEvent = (day: DateTime) => {
    return events.find((event) => event.date === day.toISODate());
  };

  const getBackgroundColor = (event: EventType, searchQuery: string) => {
    if (!event) return "transparent";
    return searchQuery === event.label ? "#1976d233" : "#f0f0f0";
  };

  const handleOpenForm = (
    e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>,
    date: string,
    event?: EventType,
  ) => {
    setAnchorEl(e.currentTarget);
    setEventData(
      event || { id: INITIAL_EVENT_ID, label: "", date, description: "" },
    );
  };

  const handleCloseForm = () => {
    setAnchorEl(null);
  };
  const handleSaveEvent = (newEvent: EventType) => {
    if (!newEvent.id || newEvent.id === INITIAL_EVENT_ID) {
      newEvent.id = Date.now();
      dispatch(addEvent(newEvent));
    } else {
      dispatch(editEvent(newEvent));
    }
    handleCloseForm();
  };
  const handleDeleteEvent = (id: number) => {
    const eventToDelete = events.find((event) => event.id === id);
    if (eventToDelete) {
      dispatch(deleteEvent(eventToDelete));
    }
    handleCloseForm();
  };

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        width={{ xs: "100%", sm: "auto" }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={2}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width={{ xs: "100%", sm: "auto" }}
        >
          <Button variant="contained" onClick={prevMonth}>
            &#8592;
          </Button>
          <Typography variant="h4">
            {currentDate.toFormat("MMMM yyyy")}
          </Typography>
          <Button variant="contained" onClick={nextMonth}>
            &#8594;
          </Button>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={(e) => handleOpenForm(e, INITIAL_DATE)}
        >
          Add Event
        </Button>
        <EventsList />
      </Box>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Box sx={{ flex: 1, minWidth: "1408px" }}>
          <WeekdaysRow />
          <Box display="flex" flexWrap="wrap" gap={0.3}>
            {emptyDays.map((_, i) => (
              <Box key={"empty-" + i} sx={{ width: 196, height: 196 }}></Box>
            ))}
            {daysArray.map((day) => {
              const event = getEvent(day);
              return (
                <CustomWidthTooltip
                  maxWidth={"70px"}
                  title={event ? "Edit Event" : "Add Event"}
                  placement="right-start"
                  key={day.toISODate()}
                >
                  <Box
                    sx={{
                      backgroundColor: getBackgroundColor(
                        event as EventType,
                        searchQuery,
                      ),
                      border: "1px solid #e0e0e0",
                      width: 178,
                      height: 178,
                      display: "flex",
                      padding: 1,
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "#e0e0e0" },
                      position: "relative",
                      flexDirection: "column",
                    }}
                    onClick={(e) => handleOpenForm(e, day.toISODate(), event)}
                  >
                    <Box sx={{ mb: 2 }}>{day.toFormat("dd MMMM")}</Box>
                    {event ? <Event event={event} /> : null}
                  </Box>
                </CustomWidthTooltip>
              );
            })}
          </Box>
        </Box>
      </Box>
      <EventForm
        anchorEl={anchorEl}
        onClose={handleCloseForm}
        event={eventData ?? { id: 0, label: "", date: "", description: "" }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
      />
    </Box>
  );
};

export default Calendar;
