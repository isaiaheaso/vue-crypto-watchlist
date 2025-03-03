const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 10000;

// MongoDB connection string
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Middleware
app.use(express.json());
app.use(cors({
  origin: [
    'https://crypto.easo.io',
    'https://vue-crypto-watchlist-rho.vercel.app',
    'https://vue-crypto-watchlist-d3co0gy9u-isaiah-easos-projects.vercel.app',
    'http://localhost:8080'
  ],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDB();

const db = client.db('crypto-watchlist');
const watchlist = db.collection('watchlist');

// Routes
app.get('/watchlist', async (req, res) => {
  try {
    const coins = await watchlist.find({}).toArray();
    res.json(coins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/watchlist', async (req, res) => {
  try {
    const coin = {
      _id: req.body.id,
      name: req.body.name,
      symbol: req.body.symbol,
      image: req.body.image
    };
    await watchlist.insertOne(coin);
    res.status(201).json(coin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/watchlist/:id', async (req, res) => {
  try {
    await watchlist.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Coin removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});