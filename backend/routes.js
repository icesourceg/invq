const guest = require('./controllers/Guest');
const guestAPI = require('./controllers/GuestAPI');

module.exports = function(app) {

    //html
    app.use('/', guest);

    // API
    ///For Testing
    app.get('/api', (req, res) => {
      res.status(200).send({"message": "OK", "data": [], "output": "API Works"});
    });

    /// To List All Guests
    app.use('/api/guest', guestAPI);
};
