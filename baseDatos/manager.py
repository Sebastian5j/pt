from conectarBD import *
from conectarRed import *
import re
class manager:
	def createConnections(self,devices,user):
		connections = []
		for device in devices:
			newConnection = deviceConnection(device[1],device[2],user[1],user[2])
			connections.append(newConnection)
		return connections
	def createDevice(self, deviceName, IP):
		#Se le da un ID imaginario
		device = ['1', deviceName, IP]
		devices = []
		devices.append(device)
		return devices
	def getInterfaces(self, connections):
		responses = []
		for connection in connections:
			connection.connect()
			response = connection.sendInstruction('sh ip int br')
			responses.append(response)
			connection.disconnect()
		return responses
	
	def getNeighbors(self, connections):
		responses = []
		for connection in connections:
			connection.connect()
			response = connection.sendInstruction('sh cdp neighbors')
			responses.append(response)
			connection.disconnect()
		return responses
	def parseInterfaces(self,devices):	
		interfaceNames= []
		allIntName = []
		ips = []
		allIP = []
		statusProtocols = []
		allStatusP = []
		for device in devices:
			print("new Device")
			lines = device.split("\r\n")
			for line in lines:
				if(re.findall("[1-9]*\.[1-9]*\.[1-9]*\.[1-9]*|unassigned",line)): #finds ip
					ip = re.findall("[1-9]*\.[1-9]*\.[1-9]*\.[1-9]*|unassigned",line) 
					ips.append(ip)
				if(re.findall("^.*[0-9]/[0-9]",line)):	#finds names
					interfaceName = re.findall("^.*[0-9]/[0-9]",line)
					interfaceNames.append(interfaceName) 
				if(re.findall("administratively.*down.*down|up.*up|down.*down|up.*down",line)): #finds status&protocols
					statusProtocol = re.findall("administratively.*down.*down|up.*up|down.*down|up.*down",line)
					statusProtocols.append(statusProtocol)

			allIntName.append(interfaceNames)
			allIP.append(ips)
			allStatusP.append(statusProtocols)
			interfaceNames = []
			ips = []
			statusProtocols = []
		return allIntName, allIP, allStatusP
	def parseNeighbors(self, devices):
		neighborNames = []
		allNeighborNames = []
		for device in devices:
			print("new device")
			lines = device.split("\r\n")
			for line in lines:
				if(re.findall("^.*\.",line)):
					casi = re.findall("^.*\.",line)
					name = casi[0].split(".",1)
					neighborNames.append(name[0])
			allNeighborNames.append(neighborNames)
			neighborNames = []
		return allNeighborNames

				
"""
dbHost = 'localhost'
username = 'root'
password = 'password'
dataBaseName = 'mydb'
connection = dbConnection(dbHost, username,password,dataBaseName)
connection.connect()
query = "select * from users"
resultado = connection.execute(b)
connection.disconnect()
manager = manager()
print(resultado)
"""
"""
users = ['1','sebas','1197sebas']
device1 = ['1','192.168.1.1','R1']
device2 = ['2','192.168.1.2','R2']
devices = []
devices.append(device1)
devices.append(device2)
connections = manager().createConnections(devices,users)
neighbors = manager().getNeighbors(connections)
#print(neighbors)
print("-------------")
int = manager().parseNeighbors(neighbors)
print(int)
"""
