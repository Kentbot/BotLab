var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/subusers', function(req, res, next) {
    res.send('the subusers');
});

module.exports = router;
