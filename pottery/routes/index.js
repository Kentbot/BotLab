var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/index', { title: 'Pottery v0.1' });
});

module.exports = router;
