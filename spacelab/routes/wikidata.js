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

const createWikiMap = () => {
  let width = 720,
      height = 180;

  const chart = (selection, data) => {

  }

  chart.width = (val) => {
    if(!arguments.length) return width;
    width = val;
    return chart;
  }

  chart.height = (val) => {
    if (!arguments.length) return height;
    height = value;
    return chart;
  }

  return chart;
}

module.exports = router;
