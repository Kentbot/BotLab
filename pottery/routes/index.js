var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home/index', { title: 'Pottery v0.1' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('home/about');
});

/* GET projects page. */
router.get('/projects', function(req, res, next) {
    // go to "routes/../public/images/" (routes is current dir)
    let imagesFolder = path.join(__dirname, '..', 'public', 'images');

    fs.readdir(imagesFolder, (err, files) => {
        let imagesArr = [];
        files.forEach(file => {
            imagesArr.push(file);
        });
        res.render('home/projects', { images: imagesArr });
    });
});

module.exports = router;
