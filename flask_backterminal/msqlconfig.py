# -*- coding:utf-8 -*-
import pymysql

# SQLALCHEMY_DATABASE_URI = "{}+{}://{}:{}@{}:{}/{}?charset=utf8".format(DIALECT,DRIVER,USERNAME,PASSWORD,HOST,PORT,DATABASE)
#
# SQLALCHEMY_TRACK_MODIFICATIONS = False

mysql_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    # 'passwd': 'GISChaser521_p@ssw0rd',
    'passwd':'1723663554',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

