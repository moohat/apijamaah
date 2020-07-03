var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

var jamaah = require('./routes/jamaah');
var users = require('./routes/users');

app.use('/api/jamaah', jamaah);
app.use('/api/users', users);




// App Server Connection
app.listen(process.env.PORT || 3000, () => {
    console.log(`aplikasi running pada port ${process.env.PORT || 3000}`)
  })
