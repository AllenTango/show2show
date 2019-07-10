import requests
import os
import time


# 写入简单粗暴了，往后再加入 diff 判断写入 2019.07.10
def work():
    urls = ["https://api.readhub.cn/topic", "https://api.readhub.cn/news",
            "https://api.readhub.cn/technews", "https://api.readhub.cn/blockchain"]

    root = "/Users/allen/Documents/readhub_datas/"
    for url in urls:
        json_name = url.split('/')[-1] + '.json'
        path = root + json_name
        json = requests.get(url)
        try:
            if not os.path.exists(root):
                os.mkdir(root)
            if not os.path.exists(path):
                with open(path, 'wb') as f:
                    f.write(json.content)
                    print("文件保存成功")
            else:
                with open(path, 'wb') as f:
                    f.write(json.content)
                    print("文件已更新")
        except:
            print("爬取失败")
    print("Well Done！😯😯😯......")


if __name__ == "__main__":
    while True:
        work()
        time.sleep(43200)  # 每隔 12小时更新(无时间校验)
