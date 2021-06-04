const { NotFound, Unauthorized } = require('http-errors');
//const Cafe = require('./cafes.entity');
const Review = require('./reviews.entity');
const users = require('../users/users.service');
const Cafe = require('../cafes/cafes.entity');
const User =  require('../users/user.entity');
//const cafes = require('../cafes/cafes.service');
//const cafesEntity = require('../cafes/cafes.entity');
// const cafes = require('../cafes/cafes.service');

class ReviewService{

    async addReview(id,creat , payload) {
    //let dbUser = await this.findOne(id);
 //   const caf =  Cafe.findByIdAndUpdate(id,{ new: true });
    const user = await users.findOne(creat.userId);
   
    const rev = {
        ...payload,
        creator: user,
        cafe:id
        
        
    }
    const dbReviews = new Review(rev);
    return dbReviews.save();
 

  }


  async UpdReviews(id){
      const user =  await Review.find( { 'cafe' : id });

    //  const cafe =  await Cafe.findById(id, { name: true }).exec();
       let i = 0;
       user.forEach(us =>i+=us.raitings)
       
      let a = (i/user.length).toFixed(2);

      //await Cafe.findByIdAndUpdate(id, { raitinigs : a });

      return Cafe.findByIdAndUpdate(id, { "raitings" : a });;

  }
  async Search(id){
    //   console.log(id);
    //   return id;
      const user =  await Review.find( { 'cafe' : id } ).populate('creator').exec();
     // const cafe =  await Cafe.findById(id, { name: true }).exec();
     // const person  = await User.findById(user.creator).exec();
     //  person = person.username;
    // let a = [user, person.username]
      return user;
  }

  async checkReview(creat , caf){
    const user = await  Review.findOne({ creator: creat , cafe: caf } ).exec();
    
    if(!user){
     // console.log('in !user');
      return true;
    }
    console.log("false");
    return false;
  }


async update(id, meh, payload) {
  return Review.findOneAndUpdate({ creator: meh , cafe: id }, payload, { new: true });
}


async delete(id, meh) {
  return Review.findOneAndDelete({ creator: meh , cafe: id });
}

}

module.exports = new ReviewService();