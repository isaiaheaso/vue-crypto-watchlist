const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/watchlist': {
                target: 'http://localhost:8000'
            }
        }
    }
};