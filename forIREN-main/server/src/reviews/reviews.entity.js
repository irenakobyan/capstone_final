const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('../users/user.entity');
const Cafe = require('../cafes/cafes.entity');

const schema = new Schema({
    reviews: {
        type: String,
        required: true
    },

    raitings: {
        type:Number,
        required:true
    },

    creator: {
        type: mongoose.Types.ObjectId,
        ref: User,
        required: true
        // type:String
    },

    cafe:{
        //type:String
        type: mongoose.Types.ObjectId,
        ref: Cafe,
        required: true
    },
  
}, { collection: 'reviews' });


schema.index({ 'cafe': 1, 'creator': 1}, { unique: true });

module.exports = mongoose.model('Review', schema);