const express = require('express');

const router = express.Router();
const asyncHandler = require('express-async-handler');

const cafes = require('./cafes.service.js');
 //adding cafe(signup) to enity and logining after successful signup
router.post(
    '/',
    asyncHandler(async (req, res) => {
      const { body } = req;
      const result = await cafes.create(body);
  
      const { email, password } = body;
      const token = await cafes.login(email, password);
  
     // const response = { ...result._doc, token };
       res.status(201).json({token});
    })
  );
//logging into account
router.post('/login', asyncHandler( async(req, res) => {
    const { email, password }= req.body;
    const token = await cafes.login(email, password);
    res.json({ token });
}));

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
      //req.user definition is in auth.middleware.js
      const { id } = req.params;
      const result = await cafes.findOne(id);
      res.json(result);
  })
);
//getting list of all cafes
router.get(
    '/',
    asyncHandler(async (req, res) => {
      const result = await cafes.findAll(req.query);
      res.json(result);
    })
  );
//getting user by token

router.get(
    '/mypage',
    asyncHandler(async (req, res) => {
        //req.user definition is in auth.middleware.js
        const result = await cafes.findOne(req.user.userId);
        res.json(result);
    })
  );
//updating info about cafe by owner
  router.patch(
    '/mypage',
    asyncHandler(async (req, res) => {
        //req.user definition is in auth.middleware.js
        const result = await cafes.update(req.user.userId, req.body);
        res.json(result);
    })
  );
 
  router.post('/filter', asyncHandler(async (req, res) => {
    const { tags , cuisine, district }= req.body;
    const result = await cafes.filterik(tags , cuisine, district);
    res.json(result);
   
  }))



  module.exports = router;

