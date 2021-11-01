import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilePhoto
      devConfigSTRIPE
      devConfigZOOM
      meetings {
        _id
        title
        date
        time
        duration
        meetingPhoto
        description
        createdAt
        onLine
        ZoomURL
        location
        organiser
        acceptsDonation
        attendees
        comments {
        _id
        commentText
        commentAuthor
        createdAt
        }
      }     
    }
  }
`;

export const QUERY_MEETINGS = gql`
  query getMeetings {
    meetings {
      _id
      title
      date
      time
      duration
      meetingPhoto
      description
      createdAt
      onLine
      ZoomURL
      location {        
        address
        postCode
        city
        country
        State
      }
      organiser
      acceptsDonation
      attendees {
        _id
        email
      }
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// export const QUERY_SINGLE_THOUGHT = gql`
//   query getSingleThought($thoughtId: ID!) {
//     thought(thoughtId: $thoughtId) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         commentAuthor
//         createdAt
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      meetings {
        _id
        title
        date
        time
        duration
        meetingPhoto
        description
        createdAt
        onLine
        ZoomURL
        location
        organiser
        acceptsDonation
        attendees
      }
    }
  }
`;
