# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
from os import environ
import json
from flask import Flask, request,Response # 导入flask模块
from flask_cors import CORS
import pymysql
from msqlconfig import mysql_config
from gevent import pywsgi

app = Flask(__name__) # 将当前模块注册为Flask实例
CORS(app=app, supports_credentials=True) # flask前后端跨域处理
app.debug = True

dbinfo = 'tms_webwx'  # tms数据库名
dbrecord = 'userrecord'  # 实习记录数据库名


# 装饰器 记录用户访问
def logging_accesstime(func):
    def wrapper(*args, **kwargs):
        ip = request.remote_addr
        starttime = datetime.datetime.now()
        print(f"ip:{ip} - time:{starttime}  访客访问了主页")
        res=func(*args, **kwargs)
        return res
    return wrapper

# 查询用户信息
@app.route('/fetchinfo', methods=["POST", "GET"])
def queryInfo():
    return_dict = {'code': '200', 'msg': '处理成功', 'result': False} #默认返回对象
    get_data = request.get_json()
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = "select * from userinfo"
    cursor.execute(sqlsen)
    result = cursor.fetchall()
    conn.close()
    print(result)

    
    return crossDomainResponse(json.dumps(result[0],ensure_ascii=False))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(request)
    else:
        print(request)
    
    return "nihao"


def crossDomainResponse(data):
    response = Response(data)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

# 常见HTTP状态码识别
# HTTP200状态码代表的意思是 请求成功，即 HTTP 200 OK 响应状态。
# HTTP 400 表示请求包含语法错误。除非进行修改，否则客户端不应该重复提交这个请求。
# HTTP500状态码代表的意思是 服务器端程序错误，即 HTTP 500 Internal Server Error 响应状态。
# HTTP503状态码代表的意思是 服务器端临时错误，即 HTTP 503 Service Unavailable 响应状态。
# HTTP504状态码代表的意思是 网关超时，即 HTTP 504 Gateway Timeout 响应状态。


#HTTP 方法，可以根据需要设置
if __name__ == '__main__':
    HOST = environ.get('0.0.0.0')
    try:
        PORT = int(environ.get('0.0.0.0', '5988'))  # 指定端口
    except ValueError:
        PORT = 5988
    app.run(HOST, PORT, debug=True)
    # server = pywsgi.WSGIServer(('0.0.0.0',5988),app)
    # server.serve_forever()
 
