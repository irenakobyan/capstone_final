const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;


const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    street_name: {
      type: String,
      required: true,
    },
    district: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required:true   
    },
    cuisine: [String],
    tags: [String], //activity
    selectedFile: String,
    role: {
        type:String,
        default: "cafe admin"
    },
    raitings: {
      type:Number
    }
  },
  { collection: 'cafes' }
);

// eslint-disable-next-line func-names
schema.pre('save', function (next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
  }

  next();
});

module.exports = mongoose.model('Cafe', schema);
