import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPLOAD_IMAGE } from '../../utils/mutations';

export default function UploadImage({handleUpload}) {
    const [image, setImage] = useState("");

    const [uploadImage, {error}] = useMutation(UPLOAD_IMAGE, {
        // onCompleted: data => console.log(data) //1
    });

    // console.log(uploadImage)

    const imageHandler = async (event) => {
        event.preventDefault();      
        try {
            const file = await event.target.files[0] 
            if(!file) return

            // console.log(meetingPhoto); //2

            const newImage =  await uploadImage({variables: {file}});
            // console.log(newImage) //3

            setImage(file.name)

            handleUpload({

                //file: `/uploads/${newImage.data.uploadImage.filename}`
                // file: newImage.data.uploadImage.filename
                
            });

            // console.log(meetingPhoto.name) //4

        } catch(error) {
            console.log(error)
        }
    }

  return (
    <>
      <Form.Group controlId="formFile">
        <Form.Label>Featured Meeting Photo:</Form.Label>


        <Form.Control type="file" name="file" onChange={imageHandler}/>
      </Form.Group>
    </>
  );
}