'use strict';

var appendCirc = function appendCirc(svg, x, y, r) {
  d3.select(svg).append('circle').attr('cx', x).attr('cy', y).attr('r', r).attr('id', 'bouncyCirc');
};

var bouncy = function bouncy(x_max, r_max) {
  var x = void 0,
      r = void 0;
  if (!document.getElementById('bouncyCirc')) {
    console.error('You gotta make the bouncy circle first!');
    return;
  }

  d3.select('#bouncyCirc').transition().on('start', function repeat() {
    d3.active(this).transition().duration(3000).attr('r', function () {
      r = Math.random() * r_max;
      return r;
    }).attr('cx', function () {
      x = Math.random() * x_max;
      x = x < r ? r : x > x_max - r ? x_max - r : x;
      return x;
    }).style('fill', function () {
      return 'hsl(' + Math.random() * 360 + ',100%,50%)';
    }).on('start', repeat);
  });
};

window.onload = function () {
  d3.select("#jkl").attr('width', window.innerWidth).attr('height', 120);

  var y = d3.select('#bouncyContainer').node().getBoundingClientRect().height / 2;

  var r_max = y;
  var r = Math.random() * r_max;

  var x_max = d3.select('#bouncyContainer').node().getBoundingClientRect().width;
  var x = Math.random() * x_max;
  x = x < r ? r : x > x_max - r ? x_max - r : x;
  console.log(r);

  appendCirc('#bouncyContainer', x, y, r);
  d3.select('#bouncyCirc').style('fill', function () {
    return 'hsl(' + Math.random() * 360 + ',100%,50%)';
  });

  console.log("here first");
  bouncy(x_max, r_max);
};