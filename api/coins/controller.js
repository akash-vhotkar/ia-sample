const axios = require('axios');
const { handler } = require('../../utils/handler');

class Controller {
    async getAllCoins(req, res) {
        try {
            const { data } = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
            let response = data.map(coin => ({
                symbol: coin.symbol,
                name: coin.symbol.replace(/BTC$/, ''),  // Extract base coin name
                lastPrice: coin.lastPrice,
                priceChange: coin.priceChange,
                priceChangePercent: coin.priceChangePercent,
                volume: coin.volume
            }));
            return handler(res, { code: 200, type: 'SUCCESS', data: response });
        }
        catch (error) {
            return handler(res, { code: 500 }, error);
        }
    }
    async getGraphData(req, res) {
        try {
            let { symbol } = req.query;

            const response = await axios.get(`https://api.binance.com/api/v3/klines`, {
                params: {
                    symbol: symbol,
                    interval: '1h',
                    limit: 50
                }
            });

            const data = response.data.map(entry => ({
                time: new Date(entry[0]).toISOString(),
                open: parseFloat(entry[1]),
                high: parseFloat(entry[2]),
                low: parseFloat(entry[3]),
                close: parseFloat(entry[4])
            }));

            return handler(res, { code: 200, type: "SUCCESS", data })
        }
        catch (error) {
            return handler(res, { code: 500 }, error);
        }
    }
}

module.exports = new Controller();
