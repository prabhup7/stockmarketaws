import numpy as np
import pandas as pd
#reading csv files of train and test
data = pd.read_csv('/Users/prabhutej/stock-market/A1-2017.csv')

A=data.loc[data['Abbrevation'] == 'AA']

from pandas import Series, DataFrame
from pandas_datareader import DataReader
tech_list = ['A']

import matplotlib.pyplot as plt
%matplotlib inline
x=A['Closing Price']
y=A['Date']
A.plot(x='Date', y='Closing Price')
A.plot(x='Date', y='Volume')
MA_day = [10,20,50,100]

for ma in MA_day:
    column_name = 'MA for %s days' %(str(ma))
    A[column_name] = pd.rolling_mean(A['Closing Price'],ma)
A.set_index(pd.DatetimeIndex(A['Date']), inplace=True)
#A[['Closing Price','MA for 10 days','MA for 20 days','MA for 50 days','MA for 100 days']].plot(subplots=False,figsize=(10,4))
A[['Closing Price','MA for 10 days','MA for 20 days','MA for 50 days','MA for 100 days']].plot(subplots=False,figsize=(10,4))





data=data.dropna()
df = data.pivot(index='Date', columns='Abbrevation',values='Closing Price')
tech_returns = df.pct_change()
rets = tech_returns
rets["A"].quantile(0.05)
rets["AA"].quantile(0.05)
days = 365

# Now our delta
dt = 1/days

# Now let's grab our mu (drift) from the expected return data we got for GOOGL
mu = rets.mean()['A']

# Now let's grab the volatility of the stock from the std() of the average return for GOOGL
sigma = rets.std()['A']
def stock_monte_carlo(start_price,days,mu,sigma):
    ''' This function takes in starting stock price, days of simulation,mu,sigma, and returns simulated price array'''
    
    # Define a price array
    price = np.zeros(days)
    price[0] = start_price
    
    # Schok and Drift
    shock = np.zeros(days)
    drift = np.zeros(days)
    
    # Run price array for number of days
    for x in range(1,days):
        
        # Calculate Schock
        shock[x] = np.random.normal(loc=mu * dt, scale=sigma * np.sqrt(dt))
        # Calculate Drift
        drift[x] = mu * dt
        # Calculate Price
        price[x] = price[x-1] + (price[x-1] * (drift[x] + shock[x]))
        
    return price
start_price = 45.56

for run in range(100):
    plt.plot(stock_monte_carlo(start_price, days, mu, sigma))
    
plt.xlabel("Days")
plt.ylabel("Price")  
plt.title('Monte Carlo Analysis for A')
start_price = 45.56

# Set a large numebr of runs
runs = 10000

# Create an empty matrix to hold the end price data
simulations = np.zeros(runs)

for run in range(runs):    
    # Set the simulation data point as the last stock price for that run
    simulations[run] = stock_monte_carlo(start_price,days,mu,sigma)[days-1]
q = np.percentile(simulations,1)

# Now let's plot the distribution of the end prices
plt.hist(simulations, bins=200)

# Using plt.figtext to fill in some additional information onto the plot

# starting price
plt.figtext(0.6,0.8, s='Start Price: $%.2f' % start_price)

# mean ending price
plt.figtext(0.6,0.7, s='Mean Final Price: $%.2f' % simulations.mean())

# Variance of the price (within 99% confidence interval)
plt.figtext(0.6,0.6, s='VaR(0.99): $%.2f' % (start_price - q))

# To display 1% quantile
plt.figtext(0.15, 0.6, s="q(0.99): $%.2f" % q)

# Plot a line at the 1% quantile result
plt.axvline(x=q, linewidth=4, color='r')

# For plot title
plt.title(s="Final price distribution for Agilent Stock(A) after %s days" % days, weight='bold', color='Y')   