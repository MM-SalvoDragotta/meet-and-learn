import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEETING = gql`
  mutation addMeeting(  $title: String!, $description: String! , $meetingPhoto: String! , $date: String! , $duration: String!, $location: String! , $onLine: Boolean, $ZoomURL: String){
    addMeeting( title: $title, description: $description , meetingPhoto: $meetingPhoto, date: $date, duration: $duration , location: $location , onLine: $onLine , ZoomURL: $ZoomURL ){
      _id
      title
      description
      date
      duration
      location
      meetingPhoto
      onLine
      ZoomURL
      createdAt 
    }
  }
`;

export const UPLOAD_IMAGE = gql`
    mutation uploadImage($file: Upload!){
      uploadImage(file: $file){
        filename
      }
    }
`;

export const DELETE_MEETING = gql`
    mutation removeMeeting($meetingId: ID!){
      removeMeeting(meetingId: $meetingId){
        _id
        title
      }
    }
`;


// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;
