let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');

let watchlist = require('./db/watchlist.json');

const PORT = 8000;
let app = express();

app.use(bodyParser.json());

// Start server
app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});

app.use(express.static('assets'));

app.get('/', (req, resp) => {
    resp.json('watchlist');
})

app.get('/watchlist', (req, resp) => {
    resp.json(watchlist);
})

app.get('/watchlist/:id', (req, resp) => {
    if(isNaN(req.params.id) || req.params.id>watchlist.length) {
        resp.json('Invalid id!');
    }
    resp.json(watchlist[req.params.id]);
})

app.post('/watchlist', (req, resp) => {
    let tempList = watchlist.slice();
    const currentCoinIds = watchlist.map(coin => coin._id);
    if(!req.body._id || currentCoinIds.indexOf(req.body._id) > 0)
        return resp.status(400).json('Invalid request!');
    tempList.push(req.body);
    fs.writeFile('./db/watchlist.json', JSON.stringify(tempList), {space: 2}, (err, data) => {
        if (err) return resp.json(watchlist);
        watchlist.push(req.body);
        resp.json(watchlist);
    });
})

app.delete('/watchlist', (req, resp) => {
    let tempList = watchlist.slice();
    const currentCoinNames = watchlist.map(coin => coin.name);
    if(!req.query.name || currentCoinNames.indexOf(req.query.name) < 0)
        return resp.status(400).json('Invalid request!');
    tempList = tempList.filter(coin => coin.name !== req.query.name)
    fs.writeFile('./db/watchlist.json', JSON.stringify(tempList), {space: 2}, (err, data) => {
        if (err) return resp.json(watchlist);
        watchlist = tempList.slice();
        resp.json(watchlist);
    });
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});