

const express = require('express');
const router = express.Router();
const jamaahController = require('../controllers/jamaah');
var jwt = require('jsonwebtoken');


process.env.SECRET_KEY = 'secret';

router.get('/', jamaahController.getAll);
router.get('/:id', jamaahController.getById);
router.post('/create',validateUser, jamaahController.create);
router.put('/:id', jamaahController.updateById);
router.delete('/:id', jamaahController.deleteById);


function validateUser(req, res, next) {
    jwt.verify(req.headers['token'], process.env.SECRET_KEY, function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{
        // add user id to request
        req.body.id = decoded.id;
        next();
      }
    });
    
  }
module.exports = router;