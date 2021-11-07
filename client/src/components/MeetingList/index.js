import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../Card'
import { Row } from "react-bootstrap";
import SimpleFileUpload from 'react-simple-file-upload';

function handleUpload(url) {
   console.log(url)
 }

const MeetingList = ({
  meetings,  
  showUsername = true,
}) => {
  return (
    <div className='upload-wrapper'>
      <SimpleFileUpload
            apiKey="1d77f135f55f07f92cad493d75c8d003"
            onSuccess={handleUpload}
            preview="false"
      />
{/*    <Row xs={1} md={3} className="g-4">
      {meetings.map((meeting) => (
              <Card key={meeting.id} meeting={meeting} />
            ))}
    </Row>*/}
    </div>
  );
};

export default MeetingList;
