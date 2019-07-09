module.exports.token = {
  'secret': 'Y2E2YTJjYmUwNTA5ZTYxNjAxNmI0MWU5',
};

module.exports.db = {
  'host': '127.0.0.1',
  'port': 3306,
  'user': 'root',
  'password': 'r00t123',
  'database': 'invqdb',
  'timezone': 'utc'
};

module.exports.api = {
  'guest_history':  { 
    'url': 'http://127.0.0.1:5000/api/guest/list',
    'token': 'Y2E2YTJjYmUwNTA5ZTYxNjAxNmI0MWU5'
  }
};
