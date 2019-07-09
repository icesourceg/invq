const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../config');
const moment = require('moment');

router.get('/list', (req, res) => {
  request.get({
    method: 'GET',
    uri: config.api.guest_history.url,
    headers: {'x-access-token': config.api.guest_history.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    if(!err && resp.statusCode == 200){
      return res.render('guest', {data:jsondata.data, 
                                  moment: moment});
    } else {
      return res.render('guesterr');
    }      
  });
});

router.get('/downloadcsv', (req, res) => {
  request.get({
    method: 'GET',
    uri: config.api.guest_history.url,
    headers: {'x-access-token': config.api.guest_history.token}
  }, (err, resp, body) => {
    let jsondata = JSON.parse(body)
    if(!err && resp.statusCode == 200){
      return res.render('guest', {data:jsondata.data, 
                                  moment: moment});
    } else {
      return res.render('guesterr');
    }      
  });
});

module.exports = router;