const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const moment = require('moment');
const config = require('../config/config');
const model = require('../models');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signin', (req, res) => {
  req_code = req.body.qrdata
  const rest_url = config.api.guest_signin.url + "/" + req_code 
  console.log(rest_url)
  request.get({
    method: 'GET',
    uri: rest_url,
    headers: {'x-access-token': config.api.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    console.log(jsondata)
    if(!err && resp.statusCode == 200){
      console.log(jsondata)
      return res.render('signin', {data:jsondata,  
                                  moment: moment});
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