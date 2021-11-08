import React from 'react';

// Import the `useParams()` hook
import { useParams , Redirect } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import "./SingleMeeting.css";

import heartOutline from "../assets/heart-outline.png"; 
import heartFill from "../assets/heart-fill.png"; 

import { QUERY_SINGLE_MEETING } from '../utils/queries';
import { DELETE_MEETING} from '../utils/mutations';


import 'bootstrap/dist/css/bootstrap.css';
import { Spinner, Button } from 'react-bootstrap';

import Auth from '../utils/auth';

import AvatarGroup from 'react-avatar-group';

// const mongoose = require('mongoose');

const SingleMeeting = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { meetingId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_MEETING, {
    // pass URL parameter
    fetchPolicy: 'cache-and-network',
    variables: { meetingId: meetingId },
  });

  const meeting = data?.meeting || {}; 

  let allAttendees = meeting.attendees

  const [removeMeeting , { loading2, data2 } ]= useMutation(DELETE_MEETING);

  console.log(meeting)
  // console.log("allAttendees " , allAttendees)
  // console.log("attendees" , meeting.attendees)
  // console.log("type of attendees" , typeof(meeting.attendees))

  let avatars = []

  allAttendees?.forEach(function (arrayItem) {
    var _name = arrayItem.attendeeName;
    avatars.push(_name)
    // console.log(_name);
  });

Object.size =  function(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

var size = Object.size(meeting.attendees)
// console.log("size" , size)
//  console.log("id" , meeting._id)
//   console.log("type of meeting._id" , typeof(meeting._id))
//   console.log(Auth.getProfile())

  const handleDelete = (e) => {
    // console.log(e.target)
    removeMeeting({ variables: { meetingId: meeting?._id } });
    window.location.assign('/')  
  };

  const handleUpdate = (e) => {
    // console.log(e.target)
    removeMeeting({ variables: { meetingId: meeting?._id } });
    window.location.assign('/')  
  };

  if (loading) {
    return <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
  }
  return (
    <div> 
      {Auth.loggedIn() ? (  
        <>         
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
              <div className="card-meeting">
                <div className="card-meeting-header">
                  <div className="profile">
                    <span className="letter">{size}</span>
                  </div>
                  <div className="card-meeting-title-group">            
                    <div className="card-meeting-date">{meeting.date}</div>                    
                    <h3 className="card-meeting-title">{meeting.title}</h3>            
                    <h6 className="card-meeting-date">Hosted by {meeting.organiser.organiserName}</h6>
                    {Auth.getProfile().data._id == meeting.organiser._id && 
                    <div>
                      <Button 
                        variant="primary"
                        onClick={handleDelete}
                        className="btn-2"                   
                        > Delete Meeting
                      </Button> 

                    <Button 
                      variant="primary"
                      onClick={handleUpdate}
                      className="btn-1"                   
                      > Update Meeting
                    </Button>
                    
                    </div>
                    }
                  </div>
                </div>
                <img className="card-meeting-image" src={meeting.meetingPhoto} alt="Logo" />
                <h2>Details</h2>
                <div className="card-meeting-text">{meeting.description}</div>
                <div className="card-meeting-like-bar">
                  <div>  
                    <h2>Attendees</h2>                
                    <AvatarGroup
                      avatars={avatars}
                      initialCharacters={1}
                      max={3}
                      size={60}
                      displayAllOnHover
                      shadow={2}
                    />
                  </div>

                  <div > 
                    { meeting.onLine===true ?                   
                      (<>
                        <div>                  
                          <h2>Online Event Link</h2>
                          <a className="card-meeting-date" href={meeting.ZoomURL}>{meeting.ZoomURL}</a>                        
                        </div> 
                      </> 
                      )  : (
                        
                        <div>   
                          <h2>Location</h2>
                          <div className="card-meeting-date">{meeting.location}</div>  
                        </div>        
                      
                      )} 
                  </div>
                  

                  {/* {attendees ? (
                    <img className="card-meeting-like-icon" src={heartFill} alt="Logo" />
                  ) : (
                    <img className="card-meeting-like-icon" src={heartOutline} alt="Logo" />
                  )} */}
                  {/* <div className="like-text">
                    <b>{attendees}</b> kişi bu tarifi beğendi.
                  </div> */}
                </div>
             
              </div>
            </div>
          </main>
        </>) : (
          <Redirect to='/'/>
          )}
    </div>  
  );
};

export default SingleMeeting;
