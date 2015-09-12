/**
 * ===========
 * = MODULES =
 * ===========
 */
import express from 'express';
import bodyParser from 'body-parser';
import Firebase from 'firebase';
let ref = new Firebase('drank.firebaseIO.com');

let app = express();
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
      next();
    });

/**
 * ==========
 * = ROUTES =
 * ==========
 */
app.get('/', (req, res) => {
  res.send({ message: 'Aw yiss!' });
});

app.post('/start', (req, res) => {
  console.log('pinged start');
  let { timestamp, id } = req.body;
  let chugsRef = ref.child('chugs');
  chugsRef.set({
    startTime: timestamp,
    device: id
  }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Success! Received start ping:
        endTime: ${timestamp}
        device: ${id}`);
    }
    res.end();
  });
});

app.put('/end', (req, res) => {
  console.log('pinged end');
  let { timestamp, id } = req.body;
  let chugsRef = ref.child('chugs');
  chugsRef.update({
    endTime: timestamp
  }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Success! Received end ping:
        timestamp: ${timestamp}
        device: ${id}`);
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
let port = 8000;
let server = app.listen(port, () => {
  console.log('drankadank is listening on port: ' + port);
});