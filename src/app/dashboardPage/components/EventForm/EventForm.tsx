import {ReactElement, useEffect, useState} from "react";
import { Box, Typography, Popover, Button, TextField } from "@mui/material";
import { INITIAL_EVENT_ID } from "../../../constants/constants.ts";
import { EventType } from '../../../types/types.ts';

interface EventFormProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  event: EventType | null;
  onSave: (newEvent: EventType) => void;
  onDelete: (id: number) => void;
}

const EventForm = ({ anchorEl, onClose, event, onSave, onDelete }: EventFormProps): ReactElement => {
  const [eventData, setEventData] = useState<EventType>(
    event || { id: INITIAL_EVENT_ID, label: "", date: "", description: "" }
  );

  const isEventAvailable = Boolean(eventData?.id !== INITIAL_EVENT_ID && eventData?.label && eventData?.description);

  const handleChange = (key: keyof EventType, value: string) => {
    setEventData((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  const handleSave = () => {
    if (eventData) {
      onSave(eventData);
    }
    onClose();
  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
    >
      <Box sx={{ p: 2, minWidth: 300 }}>
        <Typography variant="h6">{isEventAvailable ? "Edit event" : "Add event"}</Typography>
        <TextField
          fullWidth
          label="Title"
          value={eventData.label}
          onChange={(e) => handleChange("label", e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          fullWidth
          label="Date"
          value={eventData.date}
          sx={{ mt: 2 }}
          onChange={(e) => handleChange("date", e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          value={eventData.description}
          sx={{ mt: 2 }}
          multiline
          rows={4}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          {isEventAvailable && (
            <Box mr='auto'>
              <Button variant='outlined' color='error' onClick={() => onDelete(eventData.id)}>Delete</Button>
            </Box>
          )}
          <Box>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" sx={{ ml: 1 }} onClick={handleSave}>
              {isEventAvailable ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Popover>
  );
};

export default EventForm;
