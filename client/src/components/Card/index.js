import React from 'react';
import { Link , Redirect } from 'react-router-dom';
import "./card.css";

import { Row, Col , Card, Button, CardGroup } from "react-bootstrap";

import Auth from '../../utils/auth';

const styles = {
  card :{
    marginBottom: "4rem",
    backgroundColor: "rgb(247, 247, 247)",
    height: "100%",
    // borderRadius: "100px",
  },
  cardTitle : {
      fontWeight: "900",
      flexGrow: "1"
  },
  cardDescription : {
      fontSize: "13px" ,
      height: "100px"
  },
  cardImage :{
    width:  "100px",
    height: "150px",
    objectFit: "cover",
    textAlign: "center"     
  },
  btn: {
    marginTop: "1rem",
    textAlign: "center",
    color: "black",
    backgroundColor: "goldenrod",
    borderColor: "black",
    transition: "all ease .5s",  
    width: "265px",
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const MeetingCard = (props) => {
  // console.log(props)
  const length = 250;
  let description = props.meeting.description;    
  if (description.length > length) {
      description = description.substring(0, length) + ".....";
  }
return (
  <CardGroup>
    <Col>
      <Card className="m-6 border-0 shadow" style={styles.card}>
      {props.meeting.onLine==true ? (
      <Card.Header>Featured (Online)</Card.Header> ) :(
        <Card.Header>Featured</Card.Header>
      ) }
        <Card.Img {...styles.cardImage} variant="top" src={props.meeting.meetingPhoto} alt={props.meeting.title} />
        <Card.Body>
          <Card.Title style={styles.cardTitle}> {props.meeting.title} </Card.Title>
          <Card.Text style={styles.cardDescription}>
          {description}
          </Card.Text>          
        </Card.Body>
        {Auth.loggedIn() ? (
            <>
            <Link
                // className="btn btn-primary btn-block btn-squared"
                to={`/meeting/${props.meeting._id}`}
              > 
              <Button style={styles.btn} variant="primary" className="btn1">Click for details</Button>
              </Link>
            </>
          ) : (    
            <Link to="/login">
            <Button style={styles.btn} variant="primary" className="btn1">Login for details</Button>     
            </Link>             
           )}         
          
          <Card.Footer>
            <small className="text-muted">Event Date & Time : <strong>{props.meeting.date}</strong></small>
          </Card.Footer>
        </Card>
    </Col>
  </CardGroup>

);
};

export default MeetingCard;