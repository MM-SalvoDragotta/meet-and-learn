import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPLOAD_IMAGE } from '../../utils/mutations';

export default function UploadImage({handleUpload}) {
    const [image, setImage] = useState("");

    const [uploadImage, {error}] = useMutation(UPLOAD_IMAGE, {
        onCompleted: data => console.log(data)
    });

    const imageHandler = async (event) => {
        event.preventDefault();      
        try {
            const file = await event.target.files[0] 
            if(!file) return

            const newImage =  await uploadImage({
                variables: {file}
            });
            console.log(newImage)

            setImage(file.name)

            handleUpload({
                meetingPhoto: `/uploads/${newImage.data.uploadImage.filename}`
            });

            console.log(file.name)

        } catch(error) {
            console.log(error)
        }
    }

  return (
    <>
      <Form.Group controlId="formFile">
        <Form.Label>Upload Meeting image:</Form.Label>
        <Form.Control type="file" name="image" onChange={imageHandler}/>
      </Form.Group>
    </>
  );
}