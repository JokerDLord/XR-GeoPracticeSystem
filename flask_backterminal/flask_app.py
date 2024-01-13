from flask import Flask, render_template, request, Response
from os import environ
import pymysql
import sqlite3 as sql
import json
import datetime
# from werkzeug.datastructures import LanguageAccept
# from werkzeug.middleware.proxy_fix import ProxyFix
from msqlconfig import mysql_config
app = Flask(__name__)
# app.wsgi_app = ProxyFix(app.wsgi_app, num_proxies=1)
# from flask_cors import CORS
# CORS(app, supports_credentials=True)

db1 = 'village_function'  # 数据库名
dict_valuecolortable = {}  # 记录不同分级变量值和颜色的表 导出得到的字典

# 装饰器 记录用户访问
def logging_accesstime(func):
    def wrapper(*args, **kwargs):
        ip = request.remote_addr
        starttime = datetime.datetime.now()
        print(f"ip:{ip} - time:{starttime}  访客访问了主页")
        res=func(*args, **kwargs)
        return res
    return wrapper

# 获取所有colortable表的数据做成一个字典
# 用于所有指标的数值和颜色的查询
def get_colortabledict():
    conn = pymysql.connect(**mysql_config)
    conn.autocommit(1)
    conn.select_db(db1)
    cursor = conn.cursor()

    sqlsen = "select * from colortable"
    cursor.execute(sqlsen)
    result = cursor.fetchall()
    conn.close()
    # print(result)
    for var in result:
        varkey = var['varid']
        var.pop('varid')
        dict_valuecolortable[varkey] = var

    return dict_valuecolortable

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

@app.route('/')
@logging_accesstime
def cover():
    return render_template('mainmap.html')  # 设置默认网页，当打开localhost是跳转到该网页

@app.route('/index')
def cover1():
    return render_template('mainmap.html')

@app.route('/learnmore')
def learnmore():
    return render_template('了解更多.html')


# 获取单一指标数据 
@app.route('/get_onefield/', methods=["POST", "GET"])
def get_onefield():
    return_dict = {'code': '200', 'msg': '处理成功', 'result': False} #默认返回对象
    result_dict = {} # 返回result里的具体数据
    # 获取传入的所需要显示的指标名
    get_data = request.get_json()
    field_name = get_data.get('field_name')
    print(field_name)
    dict_valuecolortable = get_colortabledict() #这地方可以改进 并非要总是获取图例表
    conn = pymysql.connect(**mysql_config)
    # conn.autocommit(1)
    conn.select_db(db1)
    cursor = conn.cursor()
    sqlsen = f'select province,city,county,town,village,commutype,lnglat,{field_name} from classdata'
    # 以下语句直接执行不用try catch也行，因为对单一指标的获取，只要数据库正常便不会出错
    # 只是为了写法正式才这样写
    try:
        cursor.execute(sqlsen)
        conn.commit()
        result = cursor.fetchall()
        result_dict['data'] = result
        result_dict['legend'] = dict_valuecolortable[field_name.upper()]
        # 注意data中各个村庄指标的值 012345 在legend字典中是通过field+012345 
        # 来进行具体值范围以及颜色的索引
    except:
        # 发生错误时回滚
        conn.rollback()
        return_dict['code'] = '503'
        return_dict['msg'] = 'database error!'
    
    conn.close()
    return_dict['result'] = result_dict
    
    return crossDomainResponse(json.dumps(return_dict,ensure_ascii=False))

# 获取选择区域的数据 
@app.route('/get_districtdata/', methods=["POST", "GET"])
def get_districtdata():
    return_dict = {'code': '200', 'msg': '处理成功', 'result': False} #默认返回对象
    result_dict = {} # 返回result里的具体数据
    result_dict['data'] = []
    if request.method == 'POST':
        post_data = request.get_json()
        pccs = post_data.get('pcc')
        print(pccs)
    dict_valuecolortable = get_colortabledict() 
    conn = pymysql.connect(**mysql_config)
    # conn.autocommit(1)
    conn.select_db(db1)
    cursor = conn.cursor()
    for pcc in pccs:
        [province,city,county] = pcc
        sqlsen = f'select * from classdata where province like"%{province}%" and  city like"%{city}%" and county like"%{county}%"'
        try:
            cursor.execute(sqlsen)
            conn.commit()
            result = cursor.fetchall()
            result_dict['data'].append(result)         
        except:
            # 发生错误时回滚
            conn.rollback()
            return_dict['code'] = '503'
            return_dict['msg'] = 'database error!'
    result_dict['legend'] = dict_valuecolortable
    conn.close()
    return_dict['result'] = result_dict
    
    return crossDomainResponse(json.dumps(return_dict,ensure_ascii=False))

# if __name__ == '__main__':
#     HOST = environ.get('SERVER_HOST', 'localhost')
#     try:
#         PORT = int(environ.get('SERVER_PORT', '5888'))  # 指定端口
#     except ValueError:
#         PORT = 5888
#     app.run(HOST, PORT, debug=True)
 