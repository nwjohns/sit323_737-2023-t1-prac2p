const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let songs = [
  {
    id: 1,
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera'
  },
  {
    id: 2,
    title: 'Thriller',
    artist: 'Michael Jackson',
    album: 'Thriller'
  },
  {
    id: 3,
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    album: 'Led Zeppelin IV'
  }
];

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the song library');
});

// Read all  songs
app.get('/songs', (req, res) => {
  res.send(songs);
});

// Read a single song
app.get('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const song = songs.find(song => song.id === id);

  if (!song) {
    res.status(404).send('Song not found');
  } else {
    res.send(song);
  }
});

// create a new song
app.post('/songs', (req, res) => {
  const song = req.body;
  song.id = songs.length + 1;
  songs.push(song);
  res.send('Song added successfully');
});

// Update a song
app.put('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const songIndex = songs.findIndex(song => song.id === id);

  if (songIndex === -1) {
    res.status(404).send('Song not found');
  } else {
    const updatedSong = { id, ...req.body };
    songs[songIndex] = updatedSong;
    res.send('Song updated successfully');
  }
});

// delete a song
app.delete('/songs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  songs = songs.filter(song => song.id !== id);
  res.send('Song deleted successfully');
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
