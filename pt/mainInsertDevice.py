#!/usr/bin/python2.7
import requests
import sys
#sys.path.append("/home/sebastian/.local/lib/python2.7/site-packages")
import cgitb; cgitb.enable()
from manager import *
from sys import argv

scriptName,   deviceName, IP  = argv
user = ['1','sebas','1197sebas']
manager = manager()
device = ['1', IP, deviceName]
devices = []
devices.append(device)
connections = manager.createConnections(devices,user)
dbHost = 'localhost'
username = 'root'
password = 'password'
dataBaseName = 'mydb'

dataBase = dbConnection(dbHost, username, password, dataBaseName)
dataBase.connect()
query = "insert into dispositivo(nombre, tipo, users_idusers) values('"+deviceName+"','router',1);"
dataBase.execute(query)
dataBase.disconnect()
print("aqui ya debe haber insertado")
