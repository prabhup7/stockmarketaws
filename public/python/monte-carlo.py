import numpy as np
import pandas as pd
import sys
#reading csv files of train and test
data = pd.read_csv('/Users/prabhutej/stock-market/A1-2017.csv')

abbrevation = sys.argv[1]
A=data.loc[data['Abbrevation'] == abbrevation]
A.set_index(pd.DatetimeIndex(A['Date']), inplace=True)
start_price=A['Opening Price'].iloc[0]

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
#start_price = 45.56

#working till here



for run in range(100):
    plt.plot(stock_monte_carlo(start_price, days, mu, sigma))

plt.xlabel("Days")
plt.ylabel("Price")
plt.title('Monte Carlo Analysis for '+abbrevation)
plt.savefig('/home/bitnami/apps/stockmarketaws/public/images/MonteCarlo.png')
