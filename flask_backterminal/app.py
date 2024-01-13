# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
from flask import Flask, request # 导入flask模块
from flask_cors import CORS
app = Flask(__name__) # 将当前模块注册为Flask实例
CORS(app=app, supports_credentials=True) # flask前后端跨域处理
app.debug = True

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        print(request)
    else:
        print(request)
    
    return "nihao"

#HTTP 方法，可以根据需要设置
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8888)
