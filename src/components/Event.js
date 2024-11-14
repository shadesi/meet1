// src/components/Event.js

import React, { useState, useEffect } from "react";
import { ListGroup, Button, Stack } from "react-bootstrap";

const Event = ({ event, forceCollapse, index }) => {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (forceCollapse) {
      setShowDetails(false);
    }
  }, [forceCollapse]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <ListGroup.Item
      as="li"
      role="listitem"
      className="event listitem eventListItem custom-border-radius"
      style={{ minHeight: '150px' }}
      aria-label="event listitem"
      data-testid={`event-${index + 1}`}
    >
      <Stack gap={2}>
        <h3>{event.summary}</h3>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Start Time:</strong>{" "}
          {new Date(event.start.dateTime).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "short",
          })}
        </p>
        {showDetails && (
          <div className="event-details details">
            <h4>About the Event</h4>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Organizer:</strong> {event.organizer.email}
            </p>
          </div>
        )}
        <Button
          variant="primary"
          className="details-btn"
          onClick={toggleDetails}
          data-testid={`btn-${index}`}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
      </Stack>
    </ListGroup.Item>
  );
};

export default Event;
