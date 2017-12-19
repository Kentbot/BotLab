let hier;

window.onload = () => {
  let treeData;

  getWikiData().then((data) => {
    treeData = data;
    data = JSON.parse(data);
    hier = d3.hierarchy(data, (d) => {
      return d.links;
    });
  });
}

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
