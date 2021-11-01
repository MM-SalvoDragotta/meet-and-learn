import React, { useState, useEffect } from 'react';
import { Link , Redirect , useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEETING} from '../../utils/mutations';
import { QUERY_MEETINGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

import "./meetingForm.css";
  
export default function MeetingForm () {

  const { title , description } = useParams();

  

  const [formState, setFormState] = useState({
   title: '',
   description: ''
  });


  const [addMeeting, { error }] = useMutation(ADD_MEETING, {
    update(cache, { data: {addMeeting} }) {
      try {
        const { meetings } = cache.readQuery({ query: QUERY_MEETINGS });

        cache.writeQuery({
          query: QUERY_MEETINGS,
          data: { meetings: [addMeeting, ...meetings] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, meetings: [...me.meetings, addMeeting] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addMeeting({
        variables: {
          title :formState.title,
          description: formState.description,
          organiser: Auth.getProfile().data.username,
        },
      });

      formState('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState ({
      ...formState,
      name: value
    })    
  };

  return (
    <div> 
      {Auth.loggedIn() ? (
        <>
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-8">
              <div className="card">
                <h4 className="card-header bg-dark text-light p-2">Create an event</h4>
                <div className="card-body">
                  <div style={{ display: 'block', 
                                // width: 800, 
                                padding: 30 }}>      
                    <Form>
                      <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control 
                          className="form-input form-100"
                          name="title"
                          type="text" 
                          placeholder="Enter a unique title" 
                          value={formState.title}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control 
                          as="textarea"
                          name="description"
                          type="text" 
                          placeholder="Your event description" 
                          style={{ height: '300px' }}
                          value={formState.description}
                          onChange={handleChange}

                        />                
                      </Form.Group>
                      <Button className="bg-dark" type="submit">
                          Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
        ) : (          
            <Redirect to='/'/>          
          )}
    </div>
  );
}