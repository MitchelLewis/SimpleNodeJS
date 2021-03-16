var express = require('express');
const app = express();
const status  = require('http-status');

var router = express.Router();

router.get(
  '/',
  //Async call - sends back 'Hello world!' to the caller calling 'GET /'
  function(request, result) {
    result.send('Hello world!');
  }
);

router.post(
  '/',
  //Async call - sends back 'Not today.' to the caller calling 'POST /' with 405 code.
  function(request, result) {
    result.sendStatus(status.METHOD_NOT_ALLOWED);
  }
);
module.exports = router;
