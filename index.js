import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const PORT = 3000;

// MongoDB setup
const mongoClient = new MongoClient('mongodb+srv://chebbi6m:55554471@pdm.r5bim2n.mongodb.net/', { useUnifiedTopology: true });
let db;

mongoClient.connect().then((client) => {
  db = client.db('playlist_db');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Endpoint to get playlists from the database
app.get('/getPlaylists', async (req, res) => {
  try {
    const playlistCollection = db.collection('playlists');
    const playlistsData = await playlistCollection.find({}, { projection: { _id: 0 } }).toArray();

    console.log("Received request for playlists.");
    res.json({ playlists: playlistsData });
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
