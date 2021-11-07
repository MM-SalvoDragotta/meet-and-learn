import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_MEETING} from '../utils/queries';

const SingleMeeting = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { meetingId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_MEETING, {
    // pass URL parameter
    variables: { meetingId: meetingId },
  });

  const meeting = data?.meeting || {};

  console.log(meeting)

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {meeting.title} <br />    
      </h3> 
      <h1>hello</h1>
  
    </div>
  );
};

export default SingleMeeting;
