'use strict';

var hier = void 0;

var getWikiData = function getWikiData() {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = '/wikidata';
    xhr.open("GET", url);
    xhr.onload = function () {
      return resolve(xhr.responseText);
    };
    xhr.onerror = function () {
      return reject(xhr.statusText);
    };
    xhr.send();
  });
};

var svg = d3.select('body').append('svg').attr('width', window.innerWidth).attr('height', window.innerHeight + 1000).attr('style', 'display:block; margin:auto;');

var tree = function tree(options) {
  var g = void 0,
      d3tree = void 0,
      r = void 0;

  tree.size = function (s) {
    if (s) d3tree.size(s);else return d3tree.size();
  };

  tree.scoot = function () {
    d3.selectAll('.node-leaf').data(d3tree(r).links()).transition().duration(1000).attr('transform', function (d) {
      return 'translate(' + d.y / 3 + ', ' + d.x + ')';
    });
  };

  tree.update = function (data) {
    var root = d3.hierarchy(data, function (d) {
      return d.links;
    });
    r = root;
    d3tree.size(tree.size());

    var link = g.selectAll('.link').data(d3tree(root).links()).enter().append('path').attr('class', 'link').attr('d', d3.linkHorizontal().x(function (d) {
      return d.y;
    }).y(function (d) {
      return d.x;
    }));

    // Create the nodes
    var node = g.selectAll('.node').data(root.descendants()).enter().append('g').attr('class', function (d) {
      return 'node ' + (d.children ? 'node-internal' : 'node-leaf');
    }).attr('id', function (d) {
      return d.depth === 0 ? 'root' : null;
    }).attr('transform', function (d) {
      return 'translate(' + d.y + ', ' + d.x + ')';
    }).on('click', function () {
      console.log('clicky');
    });

    node.append('circle').attr('r', 2.5);

    node.append('text').attr('dy', 3).attr('x', function (d) {
      return d.children ? -8 : 8;
    }).attr('href', function (d) {
      return d.data.page;
    }).style('text-anchor', function (d) {
      return d.children ? 'end' : 'start';
    }).text(function (d) {
      return d.data.page;
    });

    g.attr('transform', 'translate(' + d3.select('#root').node().getBoundingClientRect().width + ', 0)');
  };

  init = function init() {
    console.log("initialized");
    d3tree = d3.tree().size([800, 600]);
    getWikiData().then(function (data) {
      // Set up the data hierarchy
      data = JSON.parse(data);
      tree.data = data;
      g = svg.append('g');
      tree.update(data);
    });
  };

  init();
  return tree;
};

var tree1 = d3.tree().size([900, 300]);
var root = void 0;

// getWikiData().then((data) => {
//   data = JSON.parse(data);
//   root = d3.hierarchy(data, (d) => {
//     return d.links;
//   });
//
//   let link = g.selectAll('.link')
//     .data(tree1(root).links())
//     .enter().append('path')
//       .attr('class', 'link')
//       .attr('d', d3.linkHorizontal()
//         .x((d) => d.y)
//         .y((d) => d.x));
//
//   let node = g.selectAll('.node')
//     .data(root.descendants())
//     .enter().append('g')
//       .attr('class', (d) => `node ${d.children ? ' node--internal' : ' node--leaf'}`)
//       .attr('id', (d) => `${d.depth === 0 ? 'root' : null}`)
//       .attr('transform', (d) => `translate(${d.y}, ${d.x})`);
//
//   g.selectAll('#null')
//     .attr('id', null);
//
//   node.append('circle').attr('r', 2.5)
//     .on('mouseover', function() {
//       d3.select(this).attr('r', 5);
//     })
//     .on('mouseout', function() {
//       d3.select(this).attr('r', 2.5);
//     });
//   node.append('text')
//     .attr('dy', 3)
//     .attr('x', (d) => d.children ? -8 : 8)
//     .attr('href', (d) => d.data.page)
//     .style('text-anchor', (d) => d.children ? 'end' : 'start')
//     .text((d) => d.data.page);
//
//   g.attr('transform', `translate(${d3.select('#root').node().getBoundingClientRect().width}, 0)`)
//
// });