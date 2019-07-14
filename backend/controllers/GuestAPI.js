const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config');
const VerifyToken = require('../modules/VerifyToken');
const models  = require('../models');
const uuidv4 = require('uuid/v4');
const sequelize = require('sequelize');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/list', VerifyToken, (req, res) => {
  models.Guest.findAndCountAll().then( guests => {
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})
      console.log(guests.count);
      console.log(guests.rows);
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error Retrieving data.."})
    });
});

router.get('/random/:numrand', VerifyToken, (req, res) => {
  models.Guest.findAll({ 
      order: sequelize.literal('rand()'), 
      limit: parseInt(req.params.numrand),
      include: [{
        model: models.Guesthistory, 
        required: true,
        where: {
          hasprize: 0
        }
      }],
    })
    .then( guests => {
      // update hasprize value
      // sequelize.Promise.map(guests, (g) => {
      //   return g.Guesthistory.update({hasprize:1})
      // })
      return res.status(200).send({"status": 200, "data": guests, "msg": "OK"})      
    }).catch(err => {
      console.log(err);
      return res.status(500).send({"status": 500, "data": [], "msg": "Error Retrieving data.."})
    });
});

router.post('/add', VerifyToken, (req, res) => {
  models.Guest.create({
    name: req.body.name,
    shop_name: req.body.shop_name,
    num_invited: req.body.num_invited,
    city: req.body.city,
    code: uuidv4()
  }).then(result => {
    console.log(result);
    return res.status(200).send({"status": 200, "data": result, "msg": "OK"});
  }).catch(err => {
    console.log(err);
    return res.status(500).send({"status": 500, "data": [], "msg": "Error Sending Data.."});
  });
});


router.post('/addbulk', VerifyToken, (req, res) => {
  const listguest = req.body.data
  console.log(listguest)
  let complete_data = []
  listguest.forEach(eachguest => {
    const each_data = {
      "name": eachguest.name,
      "shop_name": eachguest.shop_name,
      "num_invited": eachguest.num_invited,
      "city": eachguest.city,
      "code": uuidv4()
    }
    complete_data.push(each_data);
  });

  models.Guest.bulkCreate(complete_data).then(result => {
    console.log(result);
    return res.status(200).send({"status": 200, "data": result, "msg": "OK"});
  }).catch(err => {
    console.log(err);
    return res.status(500).send({"status": 500, "data": [], "msg": "Error Sending Data.."});
  });
  
});

router.get('/signin/:code', VerifyToken, (req, res) => {
  const req_code = req.params.code
  console.log(req_code)
  models.Guest.findOne({
    where: {code: req_code},
    attributes: ['id', 'name', 'shop_name', 'city', 'num_invited']
  }).then(result => {
    if (!result){
      throw new Error('no such user');
    }
    console.log(result)
    
    let gh = models.Guesthistory.build({
      checkin: sequelize.literal('CURRENT_TIMESTAMP')
    })
    gh.setGuest(result,  {save: false})
    gh.save().then( result2 => {
      return res.status(200).send({"status": 200, "data": result2, "guest": result, "msg": "OK"});
    }).catch(err2 => {
      console.log(err2)
      const data = {
        "id": "User Already Checked In"
      }
      const guest = {
        "id": "User Already Checked In",
        "name": "User Already Checked In",
        "shop_name": "User Already Checked In",
        "city": "User Already Checked In",
        "num_invited": "User Already Checked In",
        "num_reg": "User Already Checked In"
      }
      return res.status(500).send({"status": 500, "data": data, "guest": guest, "msg": "Error Saving Guest Checkin.."})
    })
  }).catch(err => {
    console.log(err)
    const data = {
      "id": "No Such User"
    }
    const guest = {
      "id": "No Such User",
      "name": "No Such User",
      "shop_name": "No Such User",
      "city": "No Such User",
      "num_invited": "No Such User",
      "num_reg": "No Such User"
    }

    return res.status(500).send({"status": 500, "data": data, "guest": guest, "msg": "Guest Not Found.."})
  });

  //console.log(guest)
  //return res.status(200).send({"status": 200, "data": uest, "msg": "OK"})

});

module.exports = router;
