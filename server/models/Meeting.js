const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const meetingSchema = new Schema({
  name: {
    type: String,
    required: 'You need a meeting name',
    minlength: 1,
    maxlength: 20,
    trim: true,
  },
  meetingPhoto: {
    type: String,  
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  onLine : {
    type: Boolean,
  },
  ZoomURL: {
    type: String,
  },
  location :{
    address: {type: String},
    postCode: {type: String},
    city: {type: String},
    country: {type: String},
    State: {type: String},
  },    
  organiser :{
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  acceptsDonation : {
    type: Boolean,
  },
  attendees : [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;
