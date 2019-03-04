import requests
from bs4 import BeautifulSoup
import os

url = "https://octodex.github.com"
headers = {
    'User-Agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Mobile Safari/537.36',
    'Cookie':'_ga=GA1.2.1358274111.1524995188; _octo=GH1.1.1491670804.1524995188; logged_in=yes; dotcom_user=AllenTango; _gauges_unique_month=1; _gauges_unique_year=1; _gauges_unique=1; _gat=1; _gauges_unique_hour=1; _gauges_unique_day=1'
}

web_page = requests.get(url,headers=headers)
soup = BeautifulSoup(web_page.text,'lxml')
imgs = soup.select('img[width="424"]')
srcs = []
for img in list(imgs):
    srcs.append(img.get('data-src'))

root = "/Users/allen/Downloads/document_cache/spider/octodex/images/"

for src in srcs:
    img_name = src.split('/')[-1]
    path = root + img_name
    img_url = url + src
    img = requests.get(img_url)
    try:
        if not os.path.exists(root):
            os.mkdir(root)
        if not os.path.exists(path):
            with open(path, 'wb') as f:
                f.write(img.content)
                print("文件保存成功")
        else:
            print("文件已存在")
    except:
        print("爬取失败")
print("Well Done！😯😯😯......")
