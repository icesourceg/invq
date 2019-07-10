const express = require('express');
const bodyParser = require('body-parser');
const VerifyToken = require('../modules/VerifyToken');
const models  = require('../models');
const uuidv4 = require('uuid/v4')
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/list', VerifyToken, (req, res) => {
  models.Guest.findAndCountAll().then( guests => {
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})
      console.log(guests.count);
      console.log(guests.rows);
    }).catch( err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error retrieving data.."})
    });
});

router.post('/add', VerifyToken, (req, res) => {
  models.Guest.create({
    title: req.body.title,
    full_name: req.body.full_name,
    code: uuidv4()
  }).then(result => {
    return res.status(200).send({"status": 200, "data": result, "msg": "OK"})
    console.log(result)
  }).catch( err =>{
    console.log(err);
    return res.status(500).send({"status": 500, "data": [], "msg": "Error Sending Data.."})
  });
});

module.exports = router;
