async window.onload = () => {
  let treeData;
  await getWikiData().then((data) => {
    treeData = data;
    console.log(data);
  });

  let margin = {top: 20, right: 120, bottom: 20, left: 120},
  	width = 960 - margin.right - margin.left,
  	height = 500 - margin.top - margin.bottom;

  let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + margine.left + "," + margin.top + ")");
}

const getWikiData = () => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let url = '/wikidata'
    xhr.open("GET", url);
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
