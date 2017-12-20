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

// window.onload = () => {
  let treeData;
  let width = 960;
  let height = 800;
  let svg = d3.select('body')
    .append('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight)
    .attr('style', 'display:block; margin:auto;');
  let g = svg.append('g')
    .attr('transform', 'translate(100, 0)');

  let tree = d3.tree().size([height - 300, width - 360]);
  let root;

  getWikiData().then((data) => {
    data = JSON.parse(data);
    root = d3.hierarchy(data, (d) => {
      return d.links;
    });

    let link = g.selectAll('.link')
      .data(tree(root).links())
      .enter().append('path')
        .attr('class', 'link')
        .attr('d', d3.linkHorizontal()
          .x((d) => { return d.y; })
          .y((d) => { return d.x; }));

    let node = g.selectAll('.node')
      .data(root.descendants())
      .enter().append('g')
        .attr('class', (d) => { return `node ${d.children ? ' node--internal' : ' node--leaf'}`; })
        .attr('id', (d) => { return `${d.depth === 0 ? 'root' : null}`})
        .attr('transform', (d) => {
          return `translate(${d.y}, ${d.x})`
        });

    g.selectAll('#null')
      .attr('id', null);

    node.append('circle').attr('r', 2.5)
      .on('click', (d, i) => {

      });
    node.append('text')
      .attr('dy', 3)
      .attr('x', (d) => {
        return d.children ? -8 : 8;
      })
      .attr('href', (d) => { return d.data.page })
      .style('text-anchor', (d) => { return d.children ? 'end' : 'start'; })
      .text((d) => { return d.data.page; });

    g.attr('transform', `translate(${d3.select('#root').node().getBoundingClientRect().width}, 0)`)

  });
// }
