import React, { useState , useEffect } from 'react';
import { Link , Redirect  } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_MEETING} from '../../utils/mutations';

import Auth from '../../utils/auth';

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

import "./meetingForm.css";

import UploadImage from '../UploadImage'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import GooglePlacesAutocomplete, {
  geocodeByPlaceId
} from "react-google-places-autocomplete";

import SimpleFileUpload, {
  SimpleFileUploadProvider
} from 'react-simple-file-upload'

require('dotenv').config();

const API = process.env.REACT_APP_GOOGLE_PLACES_API
const SimpleUploadAPI = process.env.REACT_APP_SIMPLE_UPLOAD_API
  
export default function MeetingForm (props) { 
  const [formState, setFormState] = useState({
   title: '',
   description: '',
   meetingPhoto: '',
   date:'',
   duration:'',
   attendees: [],
   onLine:false,
   ZoomURL:''
  });

  let Location = ''

  const [startDate, setStartDate] = useState(new Date());

  const [currentDuration, setCurrentDuration] = useState('');

  const [currentCheckbox, setCurrentCheckbox] = useState(false) ; 

 const [photo, setPhoto] = useState([]) ;
 const [uploadedImages, setUploadedImages] = useState([]);

  const [addMeeting, { error , data }] = useMutation(ADD_MEETING);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (currentCheckbox == false) {
       Location = address.label
    }

    try {
      const { data } = await addMeeting({
        variables: {
          ...formState,
          date:startDate,
          duration:currentDuration,
          location:Location,
          onLine:currentCheckbox,          
          attendees: [Auth.getProfile().data._id],
          organiser: Auth.getProfile().data._id,
          // meetingPhoto: uploadedImages
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
   
  const changeDuration = (newDuration) => {
    setCurrentDuration(newDuration)
  }

  const [address, setAddress] = useState();
  const [addressObj, setAddressObj] = useState();

  const getAddressObject = (address_components) => {

    console.log(address_components);

    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5"
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4"
      ],
      country: ["country"]
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: ""
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };

  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));
      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);

      console.log("addressObject", addressObject);

      setAddressObj(addressObject);

      console.log("address",address);
    //   console.log("address",address.keys);

    };
    func();
  }, [address]);

  function handleFile(url){
    console.log('The URL of the file is ' + url)
    setUploadedImages([...uploadedImages, url]);
  }

  function handleOnDrop(url) {
    console.log("drop started")
    console.log('The URL of the file is ' + url)
  }
   
  return (
    <div> 
      {Auth.loggedIn() ? (
        <>
          <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-8">
              <div className="card">
                <h4 className="card-header bg-dark text-light p-2">{props.formTitle}</h4>
                <div className="card-body">
                  <div style={{ display: 'block', 
                                // width: 800, 
                                padding: 30 }}>      
                    <Form onSubmit={handleFormSubmit}>
                      <Form.Group className=" form-input bg-warning">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                          className="form-input form-100"
                          name="title"
                          type="text" 
                          placeholder="Enter a unique title" 
                          value={formState.title}
                          onChange={handleChange}
                        />
                      </Form.Group>                     
                        
                      <Form.Group className="customDatePickerWidth form-input bg-warning" >
                        <Form.Label>Date and Time:</Form.Label>
                        <div>                                                   
                          <DatePicker 
                            customStyles={{dateInput:{borderWidth: 5}}} 
                            dateFormat="d MMMM yyyy @ h:mm aa"
                            selected={startDate} 
                            onChange={(date) => setStartDate(date)}   
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}                                                                                                             
                          />
                        </div>                          
                      </Form.Group>

                      <Form.Group className="form-input bg-warning">
                        <Form.Label>Meeting Duration:</Form.Label>                          
                          <form >                        
                              <select 
                                className="form-100"
                                onChange={(event) => changeDuration(event.target.value)}
                                value={currentDuration}
                              >
                                <option value="45 minutes">45 minutes</option>
                                <option value="1 hour">1 hour</option>
                                <option value="1.5 hours">1.5 hours</option>
                                <option value="2 hours">2 hours</option>
                                <option value="3 hours">3 hours</option>
                                <option value="4 hours">4 hours</option>
                                <option value="5 hours">5 hours</option>
                                <option value="6 hours">6 hours</option>
                                <option value="7 hours">7 hours</option>
                                <option value="8 hours">8 hours</option>
                              </select>                        
                          </form>
                        
                      </Form.Group>

                      <Form.Group className="form-input bg-warning">
                        <Form.Label>Description</Form.Label>
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
                     
                      <Form.Group className="form-input bg-warning" >
                        <Form.Label>Location</Form.Label>                  
                        <div class="checkbox">
                          <label>
                              <input 
                              type="checkbox"                              
                              Checked={currentCheckbox} 
                              onChange={() => setCurrentCheckbox(!currentCheckbox)}                              
                              /> Make this an online event
                          </label>
                        </div>
                         
                          {!currentCheckbox ? (
                        <div>                                                       
                          <GooglePlacesAutocomplete                            
                            apiKey={API}
                            // placeholder='Search'
                            selectProps={{
                              isClearable: true,
                              value: address,
                              onChange: (val) => {
                                setAddress(val);          
                              }                            
                            }}
                          />
                          <pre style={{ textAlign: "left", background: "#f0f0f0", padding: 20 }}>
                            {JSON.stringify(addressObj, 0, 2)}
                          </pre>
                        </div> ) : (
                          <Form.Group className="bg-warning">
                            <Form.Label>Online Meeting URL </Form.Label>
                            <Form.Control 
                              className="form-input form-100"
                              name="ZoomURL"
                              type="text" 
                              placeholder="Enter meeting link" 
                              value={formState.ZoomURL}
                              onChange={handleChange}
                            />
                          </Form.Group> 
                        )}                        
                      </Form.Group>
                      
                      
                      <Form.Group className="form-input bg-warning">
                       <div> 
                        <UploadImage  handleUpload={handleUpload}/>
                      </div>

                        {/* <div className="App">
                        <header className="App-header">
                          <h1>Simple File Upload</h1>
                          <a className="btn" href="https://simplefileupload.com">
                            Try it now!
                          </a>
                        </header>                                              
                            <main>
                              <div className="upload-wrapper">                      
                                <SimpleFileUpload
                                  apiKey="p387f878c784b7ce41f1f00fc7e04271e"                          
                                  // width="300"
                                  // height="300"
                                  preview="false"
                                  onSuccess={handleFile}                                                  
                                />
                                                    
                              </div>
                              <p>photo url : {photo} </p> 
                            </main>                     
                          </div> */}

                          {/* <div className="App">
                            <header className="App-header">
                              <h1>Simple File Upload Demo</h1>
                              <a className="btn" href="https://simplefileupload.com">
                                Try it now!
                              </a>
                            </header>
                            <main>
                              <div className="upload-wrapper">
                                <SimpleFileUpload
                                  apiKey={SimpleUploadAPI}
                                  onSuccess={handleFile}
                                  onDrop={handleOnDrop}
                                  preview="false"
                                />
                              </div>

                              <ul className="image-grid">
                                {uploadedImages.length ? (
                                  uploadedImages.map((image) => (
                                    <li>
                                      <img src={image} alt="Fun images" />
                                    </li>
                                  ))
                                ) : (
                                  <p>Your uploaded images will appear here!</p>
                                )}
                              </ul>
                            </main>
                          </div> */}
                      
                      </Form.Group>
                      <Button className="btn form-100" type="submit">
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