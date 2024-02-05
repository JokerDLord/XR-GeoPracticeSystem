# -*- coding: utf-8 -*-
import os
from os import environ
import json
from flask import Flask, request, Response  # 导入flask模块
from flask_cors import CORS
import pymysql
import datetime
import time
from msqlconfig import mysql_config
from gevent import pywsgi

app = Flask(__name__)  # 将当前模块注册为Flask实例
CORS(app=app, supports_credentials=True)  # flask前后端跨域处理
app.debug = True

server_path = "http://127.0.0.1:5988/static/img/"

dbinfo = 'tms_wx_recordupload1'  # tms数据库名
dbrecord = 'userrecord'  # 实习记录数据库名


# 装饰器 记录用户访问
def logging_accesstime(func):
    def wrapper(*args, **kwargs):
        ip = request.remote_addr
        starttime = datetime.datetime.now()
        print(f"ip:{ip} - time:{starttime}  访客访问了主页")
        res = func(*args, **kwargs)
        return res
    return wrapper

# 查询用户信息


@app.route('/fetchinfo', methods=["POST", "GET"])
def queryInfo():
    return_dict = {'code': '200', 'msg': '处理成功', 'result': False}  # 默认返回对象
    get_data = request.get_json()
    print(get_data)
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = "select * from userinfo"
    cursor.execute(sqlsen)
    result = cursor.fetchall()
    conn.close()
    print(result)

    return crossDomainResponse(json.dumps(result[0], ensure_ascii=False))

# 更新用户信息


@app.route('/uploadinfo', methods=['GET', 'POST'])
def login():
    return_dict = {'code': '200', 'msg': '处理成功', 'result': False}  # 默认返回对象
    get_data = request.get_json()
    print(get_data)
    realname, stuid, password = get_data.values()
    print(realname, stuid, password)

    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = f'replace into userinfo(realname,stuid,password) values(%s,%s,%s)'
    try:
        cursor.execute(sqlsen, (realname, stuid, password))
    except Exception as e:
        print(e)
    finally:
        conn.close()
    return_dict['result'] = True

    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))

# 上传用户照片
# 上传用户记录
@app.route('/uploadrecordimg', methods=['GET', 'POST'])
def uploadrecordimg():
    return_dict = {'code': '200', 'msg': '处理成功', 'path': False}
    f = request.files['upimg']
    todayf = datetime.date.today()
    fpath = f'./static/img/{todayf}'
    if (not os.path.exists(fpath)):
        os.mkdir(fpath)
    fname = f'{int(round(time.time()*1000))}-{f.filename}'
    f.save(f'{fpath}/{fname}')
    return_dict['path'] = f'{server_path}/{todayf}/{fname}'

    # conn = pymysql.connect(**mysql_config)
    # conn.autocommit(1)
    # conn.select_db(dbinfo)
    # cursor = conn.cursor()
    # sqlsen = f'replace into userinfo(realname,stuid,password) values(%s,%s,%s)'
    # try:
    #     cursor.execute(sqlsen,(realname,stuid,password))
    # except Exception as e:
    #     print(e)
    # finally:
    #     conn.close()

    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))


# 上传用户记录
@app.route('/submitrecord', methods=['GET', 'POST'])
def submitrecord():
    return_dict = {'code': '200', 'msg': '上传记录成功'}
    get_data = request.get_json()
    openid = get_data['openid']
    stuid = get_data['stuid']
    realname = get_data['realname']
    recordname = get_data['recordname']
    pointtype = get_data['pointtype']
    recordtext = get_data['recordtext']
    photopath = str(get_data['photopath'])
    rcdtime = get_data['time']
    altitude = get_data['altitude']
    lonlat = get_data['lonlat']
    address = get_data['address']
    extra = get_data['extra']
    shared = 0  # 默认未分享
    print(get_data)

    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = f'insert into userrecord (openid,stuid,realname,recordname,pointtype,recordtext,photopath,time,altitude,lonlat,address,extra,shared) values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
    print(sqlsen)
    try:
        cursor.execute(sqlsen, (openid, stuid, realname,
                                recordname, pointtype, recordtext, photopath, rcdtime, altitude, lonlat,
                                address, extra, shared,))
    except Exception as e:   
        print(e)
    finally:
        conn.close()

    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))

# 获取用户所有记录

@app.route('/fetchrecord', methods=['GET', 'POST'])
def fetchrecord():
    return_dict = {'code': '200', 'msg': '处理成功', 'record': False}
    get_data = request.get_json()
    openid = get_data['openid']
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = 'select * from userrecord where openid = %s'
    print(sqlsen)
    try:
        cursor.execute(sqlsen,(openid))
        result = cursor.fetchall()
        print(result)
        for (idx,item) in enumerate(result):
            item['photopath'] = eval(item['photopath'])
            result[idx] = item
        return_dict['record'] = result
    except Exception as e:   
        print(e)
    finally:
        conn.close()
    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))

# 删除用户记录

@app.route('/deleterecord', methods=['GET', 'POST'])
def deleterecord():
    return_dict = {'code': '200', 'msg': '删除记录成功'}
    get_data = request.get_json()
    recorid = get_data['id']
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = f'DELETE from userrecord WHERE id = %s '
    print(sqlsen)
    try:
        cursor.execute(sqlsen, (recorid))
    except Exception as e:
        print(e)
    finally:
        conn.close()
    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))

# 分享用户记录

@app.route('/sharerecord', methods=['GET', 'POST'])
def sharerecord():
    return_dict = {'code': '200', 'msg': '分享成功','sharednow':None}
    get_data = request.get_json()
    recorid = get_data['id']
    shared = int(get_data['sharenow'])
    sharednow = int(not(shared))
    print(recorid)
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = f'update userrecord set shared = %s WHERE id = %s '
    print(sqlsen)
    try:
        cursor.execute(sqlsen, (sharednow,recorid))
        return_dict['sharednow'] = sharednow
    except Exception as e:
        print(e)
    finally:
        conn.close()
    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))

# 获取所有用户分享过的记录
@app.route('/getsharerecord', methods=['GET', 'POST'])
def getsharerecord():
    return_dict = {'code': '200', 'msg': '获取成功','shareres':None}
    get_data = request.get_json()
    recordnum = get_data['recordnum']
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(dbinfo)
    cursor = conn.cursor()
    sqlsen = f'select * from userrecord WHERE shared = %s order by id desc'
    print(sqlsen)
    try:
        cursor.execute(sqlsen, (1))
        result = cursor.fetchall()
        return_dict['shareres'] = result
    except Exception as e:
        print(e)
    finally:
        conn.close()

    return crossDomainResponse(json.dumps(return_dict, ensure_ascii=False))


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


# HTTP 方法，可以根据需要设置
if __name__ == '__main__':
    HOST = environ.get('0.0.0.0')
    try:
        PORT = int(environ.get('0.0.0.0', '5988'))  # 指定端口
    except ValueError:
        PORT = 5988
    app.run(HOST, PORT, debug=True)
    # server = pywsgi.WSGIServer(('0.0.0.0',5988),app)
    # server.serve_forever()
