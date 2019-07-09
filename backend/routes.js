const guestRestController = require('./guest/GuestRestController');
const guestAPIController = require('./guest/GuestAPIController');


module.exports = function(app) {

    //html
    app.use('/guest', guestRestController);

    // API
    ///For Testing
    app.get('/api', (req, res) => {
      res.status(200).send({"message": "OK", "data": [], "output": "API Works"});
    });

    /// To List All Guests
    app.use('/api/guest', guestAPIController);
};
