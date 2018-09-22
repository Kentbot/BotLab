from urllib import request
from urllib.parse import quote
from bs4 import BeautifulSoup as bs
import json

base_api_url = 'https://en.wikipedia.org/w/api.php?format=json'

# Wikipedia namespaces
namespaces = {
    'article': 0,
    'talk': 1,
    'user': 2,
    'user_talk': 3,
    'wikipedia': 4,
    'wikipedia_talk': 5,
    'file': 6
}

def getRandomPage(numPages, namespace='article'):
    return base_api_url + '&action=query&list=random&rnlimit=' + str(numPages) + \
        '&rnnamespace=' + str(namespaces[namespace])

def getPageLinks(limit=10, namespace='article', title=''):
    return base_api_url + '&action=query&prop=links&pllimit=' + \
        str(limit) + '&plnamespace=' + str(namespaces[namespace]) + \
        '&titles=' + str(quote(title, safe=''))

url = getRandomPage(1)
pageData = request.urlopen(url).read().decode('utf-8')
data = json.loads(str(pageData))
base_title = data['query']['random'][0]['title']

url = getPageLinks(100, 'article', base_title)
pageData = request.urlopen(url).read().decode('utf-8')
data = json.loads(str(pageData))

link_pages = list(data['query']['pages'])
data = data['query']['pages']
links = []

for page in link_pages:
    for link_obj in data[page]['links']:
        obj = {"page": link_obj["title"], "links": []}
        links.append(obj)

data = {}
data["page"] = base_title
data["links"] = links
print(json.dumps(data))
