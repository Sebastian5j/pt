import pymysql
#conecta a la base de datos
class dbConnection():
	def __init__(self, dbHost, username,password,dbName):
		self.dataBaseHost = dbHost
		self.username = username
		self.password = password
		self.dataBaseName = dbName
	def connect(self):
		try:
			self.connection = pymysql.connect(self.dataBaseHost, self.username, self.password, self.dataBaseName)
		except:
			print("error al conectar a base de datos")
	def disconnect(self):
		try:
			self.connection.close()
		except:
			print("error al desconectar a la base de datos")
	def execute(self,instruction): 
		cursor = self.connection.cursor()
		result = ''
		try:
			cursor.execute(instruction)
			self.connection.commit()
			result = cursor.fetchall()
		except:
			print("error al enviar instruction")
			self.connection.rollback()
		return result

	def executeOneResult(self,instruction): 
		cursor = self.connection.cursor()
		result = ''
		try:
			cursor.execute(instruction)
			self.connection.commit()
			result = cursor.fetchone()
		except:
			print("error al enviar instruction")
			self.connection.rollback()
		return result
"""
dbHost = 'localhost'
username = 'root'
password = 'password'
dataBaseName = 'dbPT'
connection = dbConnection(dbHost, username,password,dataBaseName)
connection.connect()
a = "select * from users"
c = "otraAlejandra"
d = "algo"
#b = sql = "INSERT INTO users(idusers, nombre, password) VALUES (5,'{0}','{1}')".format(c,d)
b = "select * from users"
#print(format(connection.execute(b) )   )
resultado = connection.execute(b)
#print(resultado[1])

connection.disconnect()
"""
