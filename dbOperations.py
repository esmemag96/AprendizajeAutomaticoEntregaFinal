from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import datetime
from pprint import pprint
import json

def checkIfConnection():
	print(str(client.server_info()) + "hello there")

def checkIfBusinessExists(name):
	collection = db.Empresas
	listOfBusinesses = []
	cursor = collection.find({"Nombre":name})
	for post in cursor:
		listOfBusinesses.append(post)
	if(listOfBusinesses == []):	return False
	else: return True
	
def checkIfSchoolExists(name):
	collection = db.Escuelas
	listOfSchools = []
	cursor = collection.find({"Nombre":name})
	for post in cursor:
		listOfSchools.append(post)
	if(listOfSchools == []):return False
	else: return True

def addTeacher(name, mongo):#Agrega empresa
	collection = mongo.db.Teachers
	print(mongo.db, collection)
	post_data = {
		'Nombre': name,
	}
	result = collection.insert_one(post_data)
	print('One post: {0}'.format(result.inserted_id))
	
	
def addSchools(name, address, delegation, comite, educador, team, receptionTime, endTime, transport, zone):#Agrega escuela
	collection = db.Escuelas
	post_data = {
		'Nombre': name,
		'Direccion': address,
		'Delegación/Municipio': delegation,
		'Comité Ecológico':comite,
		'Educador': educador,
		'Equipo': team,
		'HorarioDeRecepcion': receptionTime,
		'TerminoReRecepción': endTime,
		'Transporte': transport,
		'Zona': zone,
		'Recolecciones': []
	}
	result = collection.insert_one(post_data)
	print('One post: {0}'.format(result.inserted_id))
	
def addETAs(origin, destination, ETA, distance, weight):#Agrega Camino
	collection = db.Caminos
	post_data = {
		'EmpresaOrigen': origin,
		'EmpresaDestino': destination,
		'TiempoEnSegundos': ETA,
		'distanciaEnMetros':distance,
		'CargaEnViaje': weight
	}
	myquery = {"EmpresaOrigen": origin,"EmpresaDestino": destination}
	newvalues = { "$set": post_data}
	result = collection.update_one(myquery,newvalues, upsert = True)
	print('One post: {0}'.format(result.updated_id))
	
def addSchoolRecolection(date, school, responsible, pet, hdpe, ArchivoBlanco, ArchivoMixto, periodico, carton, aluminio, chatarra, observations = "N/D"):#Agrega Recoleccion
	total = float(pet) + float(hdpe) + float(ArchivoBlanco) + float(ArchivoMixto) + float(carton) + float(aluminio) + float(chatarra) + float(periodico)
	collection = db.Escuelas
	id = ObjectId()
	id = str(id)
	recolection = {
		'recolectionID': id,
		'Fecha': date,
		'Responsables': responsible,
		'Pet': pet,
		'HDPE': hdpe,
		'Archivo Blanco': ArchivoBlanco,
		'Archivo Mixto': ArchivoMixto,
		'Periódico': periodico,
		'Cartón': carton,
		'Aluminio': aluminio,
		'Chatarra': chatarra,
		'Observaciones': observations,
		'Total': total
	}
	res = json.dumps(recolection)
	myquery = { "Nombre": school}
	newvalues = { "$push": { "Recolecciones": recolection}}
	collection.update_one(myquery, newvalues)
	
def addRecolection(date, business, team, responsible, pet, hdpe, ArchivoBlanco, ArchivoMixto, periodico, carton, aluminio, chatarra, playo, observations = "N/D"):#Agrega Recoleccion
	total = pet + hdpe + ArchivoBlanco + ArchivoMixto + carton + aluminio + chatarra + playo + periodico
	collection = db.Empresas
	recolection = {
		'Fecha': date,
		'Equipo': team,
		'Responsables': responsible,
		'Pet': pet,
		'HDPE': hdpe,
		'Archivo Blanco': ArchivoBlanco,
		'Archivo Mixto': ArchivoMixto,
		'Periódico': periodico,
		'Cartón': carton,
		'Aluminio': aluminio,
		'Chatarra': chatarra,
		'Playo': playo,
		'Observaciones': observations,
		'Total': total
	}
	res = json.dumps(recolection)
	myquery = { "Nombre": business}
	newvalues = { "$push": { "Recolecciones": recolection}}
	collection.update_one(myquery, newvalues)
	

	
def removeRecollection(date, name):
	collection = db.Empresas
	myquery = {"Nombre": name}
	date = str(date)
	recolection = {"Fecha": date}
	newvalues = { "$pull": { "Recolecciones": recolection}}
	collection.update_one(myquery, newvalues)

	
def findBusiness(name = ""):
	collection = db.Empresas
	listOfBusinesses = []
	if(name == ""):
		cursor = collection.find({})
	else:
		cursor = collection.find({"Nombre":name})
	for post in cursor:
		listOfBusinesses.append(post)
	return listOfBusinesses

def findBusses(name = ""):
	collection = db.Camiones
	listOfBusses = []
	if(name == ""):
		cursor = collection.find({})
	else:
		cursor = collection.find({"Chofer":name})
	for post in cursor:
		listOfBusses.append(post)
	return listOfBusses

def seeETAs(name = ""):
	collection = db.Caminos
	listOfBusinesses = []
	if(name == ""):
		cursor = collection.find({})
	else:
		cursor = collection.find({"Nombre":name})
	for post in cursor:
		listOfBusinesses.append(post)
	return listOfBusinesses

def addBus(name, capacity, base):
	collection = db.Camiones
	bus = {
		'Chofer': name,
		'Capacidad': capacity,
		'Base': base
	}
	result = collection.insert_one(bus)
	print('One post: {0}'.format(result.inserted_id))
	
	
def addSimulationInformation(name, weight, recolections, type, daysBetween, daysUntilNextAsignation, date):#Agrega Camino
	if(type == "School"):
		collection = db.Escuelas
	if(type == "Empresas"):
		collection = db.Empresas
	rank = 0
	if(weight <= 50):
		rank = 1
	if(weight > 50 and weight <= 100):
		rank = 2
	if(weight > 100 and weight <= 150):
		rank = 3
	if(weight > 150):
		rank = 4
	post_data = {
		'pesoEnSimulacion': weight,
		'recoleccionesPromedioAlMes': recolections,
		'diasEntreRecolecciones': daysBetween,
		'diasHastaSiguienteAsignacion': daysUntilNextAsignation,
		'fechaDeUltimaAsignacion': date
	}
	myquery = {"Nombre": name}
	newvalues = { "$set": post_data}
	result = collection.update_one(myquery,newvalues, upsert = True)
	
def addSchoolSimulationInformation(name, weight, recolections):
	collection = db.Escuelas
	rank = 0
	if(weight <= 50):
		rank = 1
	if(weight > 50 and weight <= 100):
		rank = 2
	if(weight > 100 and weight <= 150):
		rank = 3
	if(weight > 150):
		rank = 4
	post_data = {
		'Rango': rank,
		'pesoEnSimulacion': weight,
		'recoleccionesPromedioAlMes': recolections
	}
	myquery = {"Nombre": name}
	newvalues = { "$set": post_data}
	result = collection.update_one(myquery,newvalues, upsert = True)
	
def removeAllBusinesses():
	collection = db.Empresas
	result = collection.delete_many({})
	print(result)
	
	
def removeAllSchools():
	collection = db.Escuelas
	result = collection.delete_many({})
	print(result)
	

	
def findSchool(name = ""):
	collection = db.Escuelas
	listOfSchools = []
	if(name == ""):
		cursor = collection.find({})
	else:
		cursor = collection.find({"Nombre":name})
	for post in cursor:
		listOfSchools.append(post)
	return listOfSchools

def getItemFromAgenda(date = ""):
	collection = db.Agenda
	listOfFutureRecollections = []
	if(date == ""):
		cursor = collection.find({})
	else:
		cursor = collection.find({"Fecha":date})
	for post in cursor:
		listOfFutureRecollections.append(post)
	return listOfFutureRecollections

def insertItemToAgenda(array, id):
	collection = db.Agenda
	myquery = {"_id": id}
	newvalues = { "$set": { "Recolecciones": array}}
	collection.update_one(myquery, newvalues, upsert = True)

def updateStateToAgendaItem(state, id):
	collection = db.Agenda
	myquery = { "_id": id}
	newvalues = { "$set": { "Completado": True } }
	result = collection.update_one(myquery, newvalues)
	
def addTotalWeightToAgendaItem(weight, id):
	collection = db.Agenda
	myquery = { "_id": id}
	newvalues = { "$set": { "PesoEstimado": weight } }
	result = collection.update_one(myquery,newvalues, upsert = True)


	