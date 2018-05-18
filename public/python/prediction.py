import numpy as np
import pandas as pd
import sys
#reading csv files of train and test
data = pd.read_csv('/Users/prabhutej/stock-market/A1-2017.csv')
abbrevation = sys.argv[1] 
A=data.loc[data['Abbrevation'] == abbrevation]

from pandas import Series, DataFrame
from pandas_datareader import DataReader
tech_list = ['A']

import matplotlib.pyplot as plt

x=A['Closing Price']
y=A['Date']
A.plot(x='Date', y='Closing Price')
plt.savefig('/Users/prabhutej/Downloads/stock-market/public/images/ClosingPrice.png')
A.plot(x='Date', y='Volume')
plt.savefig('/Users/prabhutej/Downloads/stock-market/public/images/Volume.png')
MA_day = [10,20,50,100]

for ma in MA_day:
    column_name = 'MA for %s days' %(str(ma))
    A[column_name] = pd.rolling_mean(A['Closing Price'],ma)
A.set_index(pd.DatetimeIndex(A['Date']), inplace=True)
#A[['Closing Price','MA for 10 days','MA for 20 days','MA for 50 days','MA for 100 days']].plot(subplots=False,figsize=(10,4))
A[['Closing Price','MA for 10 days','MA for 20 days','MA for 50 days','MA for 100 days']].plot(subplots=False,figsize=(10,4))
plt.savefig('/Users/prabhutej/Downloads/stock-market/public/images/Moving-Average.png')
   