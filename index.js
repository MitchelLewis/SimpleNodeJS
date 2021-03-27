var express = require('express');
const app = express();
var router = require('./routes/routes');
app.use(express.json());

app.use('/', router);
//Listen specifically on port 3000
var port = 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
