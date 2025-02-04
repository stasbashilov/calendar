import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { EventType } from "../types/types.ts";

interface EventsState {
  events: EventType[];
  searchQuery: string;
}

const initialState: EventsState = {
  events: [],
  searchQuery: "",
};

export const getEvents =
  () => (dispatch: Dispatch<PayloadAction<EventType[]>>) => {
    const storedEvents = localStorage.getItem("events");
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    dispatch(eventsSlice.actions.setEvents(events));
  };

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state: EventsState, action: PayloadAction<EventType[]>) => {
      state.events = action.payload;
    },
    setSearchQuery: (state: EventsState, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addEvent: (state: EventsState, action: PayloadAction<EventType>) => {
      state.events.push(action.payload);
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    deleteEvent: (state: EventsState, action: PayloadAction<EventType>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload.id,
      );
      localStorage.setItem("events", JSON.stringify(state.events));
    },
    editEvent: (state: EventsState, action: PayloadAction<EventType>) => {
      const updatedEventIndex = state.events.findIndex(
        (event) => event.id === action.payload.id,
      );
      if (updatedEventIndex !== -1) {
        state.events[updatedEventIndex] = action.payload;
        localStorage.setItem("events", JSON.stringify(state.events));
      }
    },
  },
});

export const { addEvent, setSearchQuery, editEvent, deleteEvent } =
  eventsSlice.actions;
export default eventsSlice.reducer;
