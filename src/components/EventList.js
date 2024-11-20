// src/components/EventList.js
import { useState, useEffect } from "react";
import Event from "./Event";
import { ListGroup, Button, Stack } from "react-bootstrap";
import EventSkeleton from './EventSkeleton';

const EventList = ({ events }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [forceCollapse, setForceCollapse] = useState(false);

  const handleCollapseAll = () => {
    setForceCollapse(true);
    // Reset forceCollapse after a short delay to allow events to collapse
    setTimeout(() => setForceCollapse(false), 50);
  };

  useEffect(() => {
    if (events.length > 0) {
      setIsLoading(false);
    }
  }, [events]);

  return (
    <Stack className="event-list-container" gap={3}>
      <Button
        variant="primary"
        className="toggleBtn"
        data-testid="btn-Collapse"
        onClick={handleCollapseAll}
        alt-text="Collapse all event details"
      >
        Hide All Event Details
      </Button>
      <ListGroup
        as="ul"
        id="event-list"
        data-testid="eventlist"
        aria-label="event list"
        className="eventList"
      >
        {isLoading
          ? Array(5).fill().map((_, index) => <EventSkeleton key={index} />)
          : events.length > 0
            ? events.map((event, index) => (
                <Event
                  key={event.id}
                  event={event}
                  forceCollapse={forceCollapse}
                  index={index}
                />
              ))
            : <p>No events found.</p> /* Display message if no events are found */
        }
      </ListGroup>
      <br />
      <br />
    </Stack>
  );
};

export default EventList;
