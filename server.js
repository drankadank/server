/**
 * ===========
 * = MODULES =
 * ===========
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var ref = new _firebase2['default']('drank.firebaseIO.com');

var app = (0, _express2['default'])();
app.use(_bodyParser2['default'].urlencoded({ extended: true }));
app.use(_bodyParser2['default'].json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

/**
 * ==========
 * = ROUTES =
 * ==========
 */
app.get('/', function (req, res) {
  res.send({ message: 'Aw yiss!' });
});

app.post('/start', function (req, res) {
  console.log('pinged start');
  var _req$body = req.body;
  var timestamp = _req$body.timestamp;
  var id = _req$body.id;

  var chugsRef = ref.child('chugs');
  chugsRef.set({
    startTime: timestamp,
    device: id
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success! Received start ping:\n        endTime: ' + timestamp + '\n        device: ' + id);
    }
    res.end();
  });
});

app.put('/end', function (req, res) {
  console.log('pinged end');
  var _req$body2 = req.body;
  var timestamp = _req$body2.timestamp;
  var id = _req$body2.id;

  var chugsRef = ref.child('chugs');
  chugsRef.update({
    endTime: timestamp
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Success! Received end ping:\n        timestamp: ' + timestamp + '\n        device: ' + id);
    }
    res.end();
  });
});

/**
 * ============
 * = DATABASE =
 * ============
 */
// let { uri, host, port } = config.get('ServerInfo.db')
// mongoose.connect(uri, (err, database) => {
//   if (err) console.log(err);
//   else console.log('(>^_^)> Connected to database. <(^_^<)')
// })

/**
 * =============
 * = START APP =
 * =============
 */
var port = 8000;
var server = app.listen(port, function () {
  console.log('drankadank is listening on port: ' + port);
});
//# sourceMappingURL=server.js.map