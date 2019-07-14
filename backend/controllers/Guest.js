const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const moment = require('moment');
const config = require('../config/config');
const model = require('../models');
const numpad = require('../modules/Numberpad');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signedin', (req, res) => {
  req_code = req.body.qrdata
  const rest_url = config.api.guest_signin.url + "/" + req_code 
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    console.log('asdas')

    if(!err && resp.statusCode == 200){
      let num_reg = jsondata.data.id
      console.log(numpad(num_reg,4))
      jsondata.data.id = numpad(num_reg,4)
      console.log(jsondata)
      return res.render('signin', {data:jsondata,moment: moment});
    } else {
      return res.render('signin', {data:jsondata, moment: moment});
    }      
  });

  //return res.status(200).send({"status": 200, "data": rows})
  //return res.render('signin', {data: [], moment: moment});
});

router.get('/scan', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  return res.render('scan', {data: []});
});


router.get('/doorprize1', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  const rest_url = config.api.doorprize1.url
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {

  });
  
  let content = {
    'title': "DOORPRIZE 5gr EMAS",
    'rows': [],
  };
  return res.render('doorprize', {data: content});
});

router.get('/doorprize2', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  let content = {
    'title': "DOORPRIZE 10gr EMAS",
    'rows': [],
  };
  return res.render('doorprize', {data: content});
});


router.get('/grandprize', (req, res) => {
  //return res.status(200).send({"status": 200, "data": rows})
  let content = {
    'title': "GRANDPRIZE 25gr EMAS",
    'rows': [],
  };
  return res.render('grandprize', {data: content});
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