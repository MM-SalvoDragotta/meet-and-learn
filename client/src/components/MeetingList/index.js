import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card'
import { Row } from "react-bootstrap";

const MeetingList = ({
  meetings,  
  showUsername = true,
}) => {
  if (!meetings.length) {
    return <h3>No Meetings Yet</h3>;
  }

  return (
    <Row xs={1} md={2} className="g-4">
      {meetings.map((meeting) => (
              <Card key={meeting.id} meeting={meeting} />
            ))}
    </Row>
  );
};

export default MeetingList;
