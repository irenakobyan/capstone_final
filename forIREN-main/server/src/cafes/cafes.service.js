const { NotFound, Unauthorized } = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//my imports 
const Cafe = require('./cafes.entity');


class CafeService{

    create(payload) {
        const user = new Cafe(payload);
        return user.save();
    }

    async login(email,password) {
        // const user = await this.validate(email, password);
         const user =  await Cafe.findOne({email});
         if (!user || !bcrypt.compareSync(password, user.password)) {
                  throw new Unauthorized('Invalid username or password');
                 }
         return jwt.sign({ userId: user._id, role:user.role }, 'IIXCLtvNHQkCmnkc12qq');
      };

      async findAll(query) {
        const { offset, limit, sort, asc, ...filter } = query;
        const sortObj = {};
        sortObj[sort] = asc === 'true' ? 'asc' : 'desc';
    
        Object.entries(filter).forEach(([key, value]) => {
            if (value === '') {
            filter[key] = { $ne: null };
            }
            if (value === '!') {
            filter[key] = null;
            }
        });
        return Cafe.find(filter, { password: false })
        .skip(+offset)
        .limit(+limit)
        .sort(sortObj)
        .exec();
    }

    async findOne(id) {
        const user = await Cafe.findById(id, { password: false }).exec();
        if (!user) {
          throw new NotFound(`User with id ${id} not found.`);
        }
        return user;
       
      }
 
      
      async update(id, payload) {
        //let dbUser = await this.findOne(id);
        return Cafe.findByIdAndUpdate(id, payload, { new: true });
      }
        async filterik( tagik ,cuisinik, dist){
        let user = Cafe.find({});
       if(!!tagik) {
         user = user.find({ tags : { $in :[Object.values(tagik)][0]}});
        };
       
       if(!!cuisinik){
        user = user.find({cuisine : { $in :[Object.values(cuisinik)][0]}})
       }
       if(!!dist){
        user = user.find({district : { $in :[Object.values(dist)][0]}})
       }


     
       return user;

     // return [Object.values(body)][0][0];
      }
    
    
    

}
module.exports = new CafeService();
