import React, { useState } from 'react';
import { Link , Redirect  } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEETING} from '../../utils/mutations';

import Auth from '../../utils/auth';

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button  } from 'react-bootstrap';

import "./meetingForm.css";

import UploadImage from '../UploadImage'
  
export default function MeetingForm () { 
  const [formState, setFormState] = useState({
   title: '',
   description: '',
   meetingPhoto: ''
  });

  const [addMeeting, { error , data }] = useMutation(ADD_MEETING)

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addMeeting({
        variables: {
          ...formState,
          organiser: Auth.getProfile().data._id,
        },
      });
      
      // await console.log (addMeeting)
      
      document.location = "/"
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (file) => {
    await console.log(file)
    await setFormState({
      ...formState,
      // meetingPhoto: formState.meetingPhoto      
      meetingPhoto: file.file? file.file : formState.meetingPhoto
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState ({
      ...formState,
      [name]: value
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
                    <Form onSubmit={handleFormSubmit}>
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
                      <Form.Group>
                        <UploadImage  handleUpload={handleUpload}/>
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