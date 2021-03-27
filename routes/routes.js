var express = require('express');
const app = express();
const status  = require('http-status');
//Comment out when running npm test
var messagesConfig = {
    db: {
        url:'mongodb://localhost:27017/messages'
    }
};
var messagesDB = require('../lib/messages')(
    messagesConfig.db.url,
    function(err){
        if(err) return new Error(err);
    }
);

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


router.post(
    '/api/v1/messages/',
    function(req, res) {
        messagesDB.create(req.body, function(err, result) {
            if(err) {
                res.sendStatus(status.BAD_REQUEST);
            } else {
                res.sendStatus(status.OK);
            }
        });
    }
);

router.get(
    '/api/v1/messages/:id',
    function(req, res) {

        messagesDB.read(req.params.id, function(err, result) {
            if(err) {
                res.sendStatus(status.BAD_REQUEST);
            } else {
                res.send(result);
            }
        });
    }
);

router.get(
    '/api/v1/messages/',
    function(req, res) {

        messagesDB.readAll( function(err, result) {
            if(err) {
                res.sendStatus(status.BAD_REQUEST);
            } else {
                res.send(result);
            }
        });
    }
);

router.put(
    '/api/v1/messages/:id',
    function(req, res) {

        messagesDB.update(req.params.id, req.body, function(err, result) {
            if(err) {
                res.sendStatus(status.BAD_REQUEST);
            } else {
                res.sendStatus(status.OK);
            }
        });
    }
);

router.delete(
    '/api/v1/messages/:id',
    function(req, res) {

        messagesDB.delete(req.params.id, function(err, result) {
            if(err) {
                res.sendStatus(status.BAD_REQUEST);
            } else {
                res.sendStatus(status.OK);
            }
        });
    }
);
module.exports = router;
