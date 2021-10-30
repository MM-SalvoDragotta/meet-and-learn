const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    profilePhoto: String
    devConfigSTRIPE: DevConfigSTRIPE
    vevConfigZOOM : DevConfigZOOM
    meetings: [Meeting]!
  }

  type DevConfigSTRIPE {
    _id: ID
    stripeKey: String
  }

  type DevConfigZOOM {
    _id: ID
    apiKey: String
    apiSecret: String
    meetingNumber: String
    name: String
    passcode: String
    emailZoom: String
    role: String
    signature: String
    customerKey: String
    webEndpoint: String
  }

  type Meeting {
    _id: ID
    name: String
    meetingPhoto: String
    description: String    
    createdAt: String
    onLine: Boolean
    ZoomURL: String
    comments: [Comment]!
    location: Location
    organiser: String
    acceptsDonation: Boolean
    attendees: [User]
  }

  type Location {
    _id: ID
    address: String
    postCode: String
    city: String
    country: String
    State: String

  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    meetings(username: String): [Meeting]
    meeting(meetingId: ID!): Meeting
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMeeting(name: String! , meetingPhoto: String! , description: String! ,onLine: Boolean! , ZoomURL: String! ,name: String! ,name: String!  ): Meeting
    addComment(meetingId: ID!, commentText: String!): Meeting
    removeMeeting(meetingId: ID!): Meeting
    removeComment(meetingId: ID!, commentId: ID!): Meeting
  }
`;

module.exports = typeDefs;
