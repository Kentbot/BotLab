var express = require('express');
var router = express.Router();

const createNewPage = () => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const pyscript = 'C:\\Users\\Kent\\Desktop\\Desktop\\spacelab\\spacelab\\routes\\pypy.py';
    const pyprog = spawn('python',[pyscript]);

    pyprog.stdout.on('data', (data) => {
      resolve(data);
    });
    pyprog.stderr.on('data', (data) => {
      reject(data);
    });
  });
}

router.get('/', function(req, res, next) {
  createNewPage().then((fromPy) => {
      res.write(fromPy);
      return res.end();
    })
    .catch((err) => {
      res.write(err.toString());
      return res.end();
    })
});

module.exports = router;
