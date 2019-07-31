#
#   Server in Python
#   Binds REP socket to tcp://*:3001
#   Expects input from client to reply with something
#

import time
import zmq
import numpy as np
import pandas as pd
import math
import os
import sys
import json
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Keras stuff
from keras.models import Sequential
from keras.layers import Dense
from keras import optimizers
from keras import callbacks
import keras.backend as K

# Sklearn stuff
from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler, StandardScaler


def processParams(params):
	allParams = params.split("&")
	
	loss = ''
	optimizer = ''
	learningRate = 0
	epochs = 0
	batchSize = 0
	testSize = 0
	layers = []
	
	for param in allParams:
		if "loss" in param:
			loss = param.split("=")[1]
		elif "optimizer" in param:
			optimizer = param.split("=")[1]
		elif "learningRate" in param:
			learningRate = param.split("=")[1]
		elif "epochs" in param:
			epochs = param.split("=")[1]
		elif "batchSize" in param:
			batchSize = param.split("=")[1]
		elif "testSize" in param:
			testSize = param.split("=")[1]
		elif "layers" in param:
			tmp = param[param.index('=')+1:]
			tmp = tmp.replace('[', '')
			tmp = tmp.replace(']', '')

			tmpLayers = tmp.split(';')

			for tmpLayer in tmpLayers:
				tmpValues = tmpLayer.split(',')
				
				toAdd = []
				for tmpValue in tmpValues:
					toAdd.append(tmpValue.split("=")[1])

				layers.append(toAdd)
	
	return {'loss':loss, 'optimizer':optimizer, 'learningRate':learningRate, 'epochs':epochs, 'batchSize':batchSize, 'testSize':testSize, 'layers':layers}

def buildModel(params, inputShape, outputShape):
	# Adjusting format of inputShape
	inputShape = (inputShape,)
	model = Sequential()
	
	for layer in params['layers']:
		neurons = int(layer[1])
		activationFunc = layer[2]
		
		if layer[0] == 1:
			model.add(Dense(neurons, input_shape=inputShape, activation=activationFunc, kernel_initializer='lecun_uniform'))
		else:
			model.add(Dense(neurons, activation=activationFunc, kernel_initializer='lecun_uniform'))
	
	model.add(Dense(outputShape, kernel_initializer='lecun_uniform'))
	model.compile(optimizer=getOptimizer(params), loss=params['loss'])

	return model

def getOptimizer(params):
	opt = None
	optName = params['optimizer'].lower()
	learningRate = float(params['learningRate'])
	
	if optName == 'sgd':
		opt = optimizers.SGD(lr=learningRate)
	elif optName == 'rmsprop':
		opt = optimizers.RMSprop(lr=learningRate)
	elif optName == 'adagrad':
		opt = optimizers.Adagrad(lr=learningRate)
	elif optName == 'adadelta':
		opt = optimizers.Adadelta(lr=learningRate)
	elif optName == 'adam':
		opt = optimizers.Adam(lr=learningRate)
	elif optName == 'adamax':
		opt = optimizers.Adamax(lr=learningRate)
	elif optName == 'nadam':
		opt = optimizers.Nadam(lr=learningRate)
		
	return opt

def organizeData(testSize, sc, sc2):
	
	# Get the dataset and prepare it for analysis and model
	df = pd.read_csv('suncor_full.csv')
	dataset=df.values[:,:]
	features=dataset.shape[1]
	# Create training and testing data
	X = df.iloc[:, 1:features-1].values
	y = df.iloc[:, features-1].values

	split=int(X.shape[0]*(1-testSize))
	print(split)

	X_train=X[:split,:]
	X_test=X[split:,:]
	y_train=y[:split]
	y_test=y[split:]

	#X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=testSize, random_state=0)

	# Normalize the dataset with sc and sc2 (MinMaxScalers)

	X_train = sc.fit_transform(X_train)
	X_test = sc.transform(X_test)

	y_train = np.reshape(y_train, (y_train.shape[0], 1))
	y_test = np.reshape(y_test, (y_test.shape[0], 1))

	y_train = sc2.fit_transform(y_train)
	y_test = sc2.transform(y_test)

	#print('Train size: (%d x %d)'%(X_train.shape[0], X_train.shape[1]))
	#print('Test size: (%d x %d)'%(X_test.shape[0], X_test.shape[1]))
	
	return X_train, X_test, y_train, y_test

def trainModel(params):
	# Organize data
	testSize = float(params['testSize'])
	
	# Normalize the dataset
	sc = MinMaxScaler()
	sc2 = MinMaxScaler()
	#sc2 = StandardScaler()
	
	X_train, X_test, y_train, y_test = organizeData(testSize, sc, sc2)
	
	"""
	# Using clear_session() may result unexpected behaviors.
	# For instance, after building and training the 6th model the program would just crash without throwing an exception.
	K.clear_session()
	"""
	
	# Build model
	model = buildModel(params, X_train.shape[1], y_train.shape[1])
	
	# Train model
	# Fitting the ANN to the training set
	batchSize = int(params['batchSize'])
	epochsNum = int(params['epochs'])
	
	model.fit(X_train, y_train, batch_size=batchSize, epochs=epochsNum, verbose=0)
	
	"""
	#keras.callbacks.LambdaCallback(on_epoch_begin=None, on_epoch_end=None, on_batch_begin=None, on_batch_end=None, on_train_begin=None, on_train_end=None)
	#https://keras.io/callbacks/
	class Callback(callbacks.Callback):
		def on_epoch_end(self, batch, logs={}):
			print('There you go!')
			#self.stopped_epoch = epoch
			#self.model.stop_training = True

	# Defining a callback
	callbackTest = Callback()
	model.fit(X_train, y_train, batch_size=batchSize, epochs=epochsNum, verbose=1, callbacks=[callbackTest])
	"""
	
	# Test model
	y_pred = model.predict(X_test)

	y_pred = sc2.inverse_transform(y_pred)
	y_test = sc2.inverse_transform(y_test)

	# Scalar test loss
	#score = model.evaluate(X_test, y_test, verbose=1)
	#print(score)

	#https://en.wikipedia.org/wiki/Coefficient_of_determination
	rSquared = r2_score(y_test, y_pred)
	rmse = math.sqrt(mean_squared_error(y_test, y_pred))
	print('R-Squared: %f' % rSquared)
	print('RMSE: %f' % rmse)
	
	# Converting from numpy arrays to list to allow json creation
	return {'values':y_test.tolist(), 'predicted':y_pred.tolist(), 'r-squared':rSquared, 'rmse':rmse}
	
context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:3001")

print("Server awaiting for requests on port 3001.")

while True:
	try:
		#  Wait for next request from client
		message = socket.recv()
		
		print('> Received request. <')
		
		procParams = processParams(message.decode('utf-8'))
		results = trainModel(procParams)
		
		# Converting dictionary to json
		jsonResults = json.dumps(results)
		
		# Send reply back to client
		socket.send_string(jsonResults)
		#socket.send(b"Done")
		print('> Response sent! <')
	except Exception as e:
		#e = sys.exc_info()[0]
		print(e)
		socket.send_string('Error!')
		
"""
multiprocessing

from multiprocessing import Process, Queue

def run_in_separate_process(method, args):
    def queue_wrapper(q, params):
        r = method(*params)
        q.put(r)

    q = Queue()
    p = Process(target=queue_wrapper, args=(q, args))
    p.start()
    return_val = q.get()
    p.join()
    return return_val

"""
