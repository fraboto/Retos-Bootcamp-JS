const http = require('http');
const API_KEY = 'access_key=db334d3d2bb9d4e29ac3e47cad9f7717';
const API_END = 'http://data.fixer.io/api/';
var query_params = '?';


module.exports = {
    cambio: function(value, currency_init, currency_final){
        query_params += API_KEY + '&from=' + currency_init + '&to=' + currency_final + '&amount=' + value;
        let request_url = API_END + 'convert' + query_params;
        http.get(request_url, res => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                                `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
            });
    },
    monedas: function(){
        query_params += API_KEY;
        let request_url = API_END + 'symbols' + query_params;
        http.get(request_url, res => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                                `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                } catch (e) {
                    console.error(e.message);
                }
            });
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
            });
    },
    tazas: function(currencies){
        query_params += API_KEY + '&symbols=' + currencies;
        let request_url = API_END + 'latest' + query_params;
        http.get(request_url, res => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];

            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                                `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData);
                } catch (e) {
                console.error(e.message);
                }
            });
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
            });
    }
}