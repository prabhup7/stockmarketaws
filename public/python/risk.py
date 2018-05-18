import numpy as np
import pandas as pd
import sys
#reading csv files of train and test
data = pd.read_csv('/Users/prabhutej/stock-market/A1-2017.csv')

abbrevation = sys.argv[1] 
A=data.loc[data['Abbrevation'] == abbrevation]

from pandas import Series, DataFrame
from pandas_datareader import DataReader

import matplotlib.pyplot as plt
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

#working till here
#start_price = 45.56

start_price=A['Opening Price'].iloc[0]


# Set a large numebr of runs
runs = 10000

# Create an empty matrix to hold the end price data
simulations = np.zeros(runs)

for run in range(runs):    
    # Set the simulation data point as the last stock price for that run
    simulations[run] = stock_monte_carlo(start_price,days,mu,sigma)[days-1]
q = np.percentile(simulations,1)

#comment from here


# Now let's plot the distribution of the end prices

plt.hist(simulations, bins=200)

# Using plt.figtext to fill in some additional information onto the plot

# starting price
plt.figtext(0.6,0.8, s='Start Price: $%.2f' % start_price)

# mean ending price
plt.figtext(0.6,0.7, s='Mean Final Price: $%.2f' % simulations.mean())

# Variance of the price (within 99% confidence interval)
plt.figtext(0.6,0.6, s='VaR(0.99): $%.2f' % (start_price - q))
print(start_price)
print (start_price - q)

# To display 1% quantile
plt.figtext(0.15, 0.6, s="q(0.99): $%.2f" % q)

# Plot a line at the 1% quantile result
plt.axvline(x=q, linewidth=4, color='r')

# For plot title
plt.title(s="Final price distribution for "+abbrevation+" after %s days" % days, weight='bold', color='Y')
plt.savefig('/Users/prabhutej/Downloads/stock-market/public/images/Risk.png')
   