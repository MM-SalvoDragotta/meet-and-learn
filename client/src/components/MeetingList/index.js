import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card'
import { Row } from "react-bootstrap";
import "./meetingList.css";

const MeetingList = ({
  meetings,  
  showUsername = true,
}) => {
  if (!meetings.length) {
    return <h3>No Meetings Yet</h3>;
  }

  return (
    <div >
    <Row xs={1} md={2} className="g-4">
      {meetings.map((meeting) => (
              <Card key={meeting.id} meeting={meeting} />
            ))}
    </Row>
    </div>
  );
};

export default MeetingList;
