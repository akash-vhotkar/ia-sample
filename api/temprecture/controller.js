const axios = require('axios');

const { handler } = require("../../utils/handler");
const { extractWeatherData } = require('../../utils');

class Controller {
    async getAll(req, res) {
        try {
            const { data } = await axios.get('https://api.data.gov.sg/v1/environment/air-temperature');
            return handler(res, { code: 200, type: 'SUCCESS', data: extractWeatherData(data) });
        }
        catch (error) {
            handler(res, { code: 500 }, error);
        }
    }
}

module.exports = new Controller();
