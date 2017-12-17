'use strict'
const appendCirc = (svg, x, y, r) => {
  d3.select(svg).append('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', r)
    .attr('id', 'bouncyCirc');
}

const bouncy = (x_max, r_max) => {
  let x, r;
  if(!document.getElementById('bouncyCirc')) {
    console.error('You gotta make the bouncy circle first!');
    return;
  }

  d3.select('#bouncyCirc')
    .transition()
    .on('start', function repeat() {
      d3.active(this)
        .transition()
        .duration(3000)
        .attr('r', () => {
          r = Math.random() * r_max;
          return r;
        })
        .attr('cx', () => {
          x = Math.random() * x_max;
          x = x < r ? r : ( x > (x_max - r) ? x_max - r : x);
          return x;
        })
        .style('fill', () => {
          return `hsl(${Math.random() * 360},100%,50%)`;
        })
        .on('start', repeat);
    });
}

window.onload = () => {
  d3.select("#jkl")
    .attr('width', window.innerWidth)
    .attr('height', 120);

  let y = d3.select('#bouncyContainer').node().getBoundingClientRect().height / 2;

  let r_max = y;
  let r = Math.random() * r_max;

  let x_max = d3.select('#bouncyContainer').node().getBoundingClientRect().width;
  let x = Math.random() * x_max;
  x = x < r ? r : ( x > (x_max - r) ? x_max - r : x);

  appendCirc('#bouncyContainer', x, y, 10);
  d3.select('#bouncyCirc')
    .style('fill', '#2047CC');

  console.log("here first");
  bouncy(x_max, r_max);
};
