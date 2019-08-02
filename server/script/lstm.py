import numpy as np
import pandas as pd
from math import sqrt
from numpy import concatenate
import sys
import math
from pandas import DataFrame
from pandas import concat
from keras.models import Sequential
from keras.layers import Dense
from sklearn.metrics import mean_squared_error
from keras import optimizers
from keras.layers import LSTM
from keras import callbacks
from keras.callbacks import EarlyStopping
from sklearn.preprocessing import MinMaxScaler, StandardScaler
from pandas import Series

def series_to_supervised(data, n_in=1, n_out=1, dropnan=True):
    n_vars = 1 if type(data) is list else data.shape[1]
    df = DataFrame(data)
    cols, names = list(), list()
    # input sequence (t-n, ... t-1)
    for i in range(n_in, 0, -1):
        cols.append(df.shift(i))
        names += [('var%d(t-%d)' % (j+1, i)) for j in range(n_vars)]
    # forecast sequence (t, t+1, ... t+n)
    for i in range(0, n_out):
        cols.append(df.shift(-i))
        if i == 0:
            names += [('var%d(t)' % (j+1)) for j in range(n_vars)]
        else:
            names += [('var%d(t+%d)' % (j+1, i)) for j in range(n_vars)]
    # put it all together
    agg = concat(cols, axis=1)
    agg.columns = names
    # drop rows with NaN values
    if dropnan:
        agg.dropna(inplace=True)
    return agg
	
def pearson(vector1, vector2):
    n = len(vector1)
    #simple sums
    sum1 = sum(float(vector1[i]) for i in range(n))
    sum2 = sum(float(vector2[i]) for i in range(n))
    #sum up the squares
    sum1_pow = sum([pow(v, 2.0) for v in vector1])
    sum2_pow = sum([pow(v, 2.0) for v in vector2])
    #sum up the products
    p_sum = sum([vector1[i]*vector2[i] for i in range(n)])
    #分子num，分母den
    num = p_sum - (sum1*sum2/n)
    den = math.sqrt((sum1_pow-pow(sum1, 2)/n)*(sum2_pow-pow(sum2, 2)/n))
    if den == 0:
        return 0.0
    return num/den

def getOptimizer():
	opt = None
	optName = optimizer
	learningRate = learningrate
	
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

def buildModel(inputShape, outputShape):
	
	model = Sequential()
	num=len(Layers)
	count=0
	if num == 1:
		 layer=Layers[0]
		 neurons = int(layer[0])
		 activationFunc = layer[1]
		 model.add(LSTM(neurons, input_shape=inputShape, activation=activationFunc))
	else:
		 for layer in Layers:
			  count=count+1
			  neurons = int(layer[0])
			  activationFunc = layer[1]
			  
			  if count == 1:
					  model.add(LSTM(neurons,return_sequences=True, input_shape=inputShape, activation=activationFunc, ))
			  elif count ==num:
					  model.add(LSTM(neurons, activation=activationFunc))
			  else:
					  model.add(LSTM(neurons, return_sequences=True, activation=activationFunc))

			


	model.add(Dense(outputShape))
	model.compile(optimizer=getOptimizer(), loss=lossfunction)
	return model
	


lossfunction=(sys.argv[1])
optimizer=(sys.argv[2])
learningrate=float(sys.argv[3])
epochsnum=int(sys.argv[4])
batchsize=int(sys.argv[5])
testsize=float(sys.argv[6])/100
network=(sys.argv[7])


layers=network.split('  ')
layers=layers[0:-1]
Layers=[]
for layer in layers:
        a=layer.split(' ')
        Layers.append(a)

seed = 2
np.random.seed(seed)   
df = pd.read_csv('/root/server/script/suncor_full.csv')
values=df.values[:,1:]


n_days = 1
n_features = values.shape[1]
values = values.astype('float32')
reframed = series_to_supervised(values, n_days, 1)

data = reframed.values
values=data[:, n_features-1:-1]
target=data[:, -1]

sc = StandardScaler()
sc2 =StandardScaler()
values=sc.fit_transform(values)
target = np.reshape(target, (target.shape[0], 1))
target=sc2.fit_transform(target)



n_train_days = int(data.shape[0]*0.6)
X_train = values[:n_train_days, :]
X_test= values[n_train_days:, :]
y_train=target[:n_train_days,]
y_test =target[n_train_days:,]



# reshape input to be 3D [samples, timesteps, features]
X_train = X_train.reshape((X_train.shape[0], n_days, n_features))
X_test = X_test.reshape((X_test.shape[0], n_days, n_features))




inputShape = (X_train.shape[1],X_train.shape[2])
outputShape= y_train.shape[1]

model = Sequential()
model=buildModel(inputShape,outputShape)
es=EarlyStopping(monitor='val_loss',mode='auto',patience=10)
model.fit(X_train, y_train, batch_size=batchsize,callbacks=[es],epochs=epochsnum, verbose=0, validation_data=(X_test, y_test))

y_pred = model.predict(X_test)
y_pred = sc2.inverse_transform(y_pred)
y_test = sc2.inverse_transform(y_test)
y_test = np.reshape(y_test, (y_test.shape[0]))
y_pred = np.reshape(y_pred, (y_pred.shape[0]))

date=df.iloc[n_days:, 0].values
date=date[n_train_days:]

r=np.vstack((date,y_test,y_pred))
print(r)
print('r%.3f' % sqrt(mean_squared_error(y_test, y_pred)))
print('p%.3f'% pearson(y_test,y_pred))

