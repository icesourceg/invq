const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VerifyToken = require('../auth/VerifyToken');
const db = require('../db');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/list', VerifyToken, (req, res) => {
  db.query("select * from guest_history", (err, rows, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    } 
    return res.status(200).send({"status": 200, "data": rows})
  });
});

router.post('/add', VerifyToken, (req, res) => {
  let guestname = req.body.name;
  if (!guestname){
    return res.status(500).send({"status": "500", "output": "'name' not set"});
  }
  try {
    db.query("insert into guest_history(name) values(?)", [guestname], (err, rows, fields) => {
      if (err){
        console.log(err);
        return res.status(500).send(err);
      }
      return res.status(200).send({"status": 200, "data": rows})
      
    });
  }
  catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

module.exports = router;
