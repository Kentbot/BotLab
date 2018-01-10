let hier;

const getWikiData = () => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let url = '/wikidata'
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

let svg = d3.select('body')
  .append('svg')
  .attr('width', window.innerWidth)
  .attr('height', window.innerHeight+ 1000)
  .attr('style', 'display:block; margin:auto;');

const tree = (options) => {
  let g, d3tree, r;

  tree.size = (s) => {
    if(s) d3tree.size(s);
    else return d3tree.size();
  }

  tree.scoot = () => {
    d3.selectAll('.node-leaf')
      .data(d3tree(r).links())
      .transition()
      .duration(1000)
      .attr('transform', (d) => `translate(${d.y / 3}, ${d.x})`);
  }

  tree.update = (data) => {
    let root = d3.hierarchy(data, (d) => d.links);
    r = root;
    d3tree.size(tree.size());

    let link = g.selectAll('.link')
      .data(d3tree(root).links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x));

    // Create the nodes
    let node = g.selectAll('.node')
      .data(root.descendants())
      .enter()
        .append('g')
        .attr('class', (d) => `node ${d.children ? 'node-internal' : 'node-leaf'}`)
        .attr('id', (d) => { return d.depth === 0 ? 'root' : null })
        .attr('transform', (d) => `translate(${d.y}, ${d.x})`)
        .on('click', () => { console.log('clicky'); });

    node.append('circle').attr('r', 2.5);

    node.append('text')
      .attr('dy', 3)
      .attr('x', (d) => d.children ? -8 : 8)
      .attr('href', (d) => d.data.page)
      .style('text-anchor', (d) => d.children ? 'end' : 'start')
      .text((d) => d.data.page);

    g.attr('transform',
      `translate(${d3.select('#root').node().getBoundingClientRect().width}, 0)`)
  }

  init = () => {
    console.log("initialized");
    d3tree = d3.tree().size([800, 600]);
    getWikiData().then((data) => {
      // Set up the data hierarchy
      data = JSON.parse(data);
      tree.data = data;
      g = svg.append('g');
      tree.update(data);
    });
  }

  init();
  return tree
}

let tree1 = d3.tree().size([900, 300])
let root;

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
