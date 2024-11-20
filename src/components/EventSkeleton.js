import React from 'react';
import { ListGroup, Placeholder } from 'react-bootstrap';

const EventSkeleton = () => (
  <ListGroup.Item className="event listitem eventListItem custom-border-radius" data-testid="event-skeleton">
    <Placeholder as="h3" animation="glow">
      <Placeholder xs={6} />
    </Placeholder>
    <Placeholder as="p" animation="glow">
      <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={4} />
    </Placeholder>
    <Placeholder.Button variant="primary" xs={4} />
  </ListGroup.Item>
);

export default EventSkeleton;
