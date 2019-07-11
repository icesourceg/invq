const express = require('express');
const request = require('request');
const config = require('../config');
const moment = require('moment');
const model = require('../models');
const router = express.Router();


router.get('/signin', (req, res) => {
  let rows = {
    'name': "Test nama guest 1",
    'shop_name': "Test nama toko 1",
    'num_invited': "2",
    'city': "Surabaya",
    'num_reg': "0012",
  };
  //return res.status(200).send({"status": 200, "data": rows})
  return res.render('signin', {data: rows, moment: moment});
});

router.get('/scan', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  return res.render('scan', {data: []});
});


// router.get('/list', VerifyToken, (req, res) => {
//   db.query("select * from guest_history", (err, rows, fields) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send(err);
//     } 
//     return res.status(200).send({"status": 200, "data": rows})
//   });
// });


// router.get('/list', (req, res) => {
//   request.get({
//     method: 'GET',
//     uri: config.api.guest_history.url,
//     headers: {'x-access-token': config.api.guest_history.token}
//   }, (err, resp, body) => {
//     let jsondata = JSON.parse(body)
//     if(!err && resp.statusCode == 200){
//       return res.render('guest', {data:jsondata.data, 
//                                   moment: moment});
//     } else {
//       return res.render('guesterr');
//     }      
//   });
// });

// router.get('/downloadcsv', (req, res) => {
//   request.get({
//     method: 'GET',
//     uri: config.api.guest_history.url,
//     headers: {'x-access-token': config.api.guest_history.token}
//   }, (err, resp, body) => {
//     let jsondata = JSON.parse(body)
//     if(!err && resp.statusCode == 200){
//       return res.render('guest', {data:jsondata.data, 
//                                   moment: moment});
//     } else {
//       return res.render('guesterr');
//     }      
//   });
// });

module.exports = router;