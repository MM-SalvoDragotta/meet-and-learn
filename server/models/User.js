const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 16,    
  },
  profilePhoto: {
    type: String,  
  },
  devConfigSTRIPE :[
  {
    stripeKey: {type: String}
  }
  ],
  devConfigZOOM :[
    {
    apiKey: {type: String},
    apiSecret: {type: String},
    meetingNumber: {type: String},
    _name: {type: String},
    passcode: {type: String},
    emailZoom: {type: String},
    role: {type: String},
    signature: {type: String},
    customerKey: {type: String},
    webEndpoint: {type: String}
  }
  ],
  meetings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Meeting',
    },
  ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
