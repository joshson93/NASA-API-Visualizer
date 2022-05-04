const express = require('express');
const { sendToDB, fetchFromDB, deleteFromDB } = require('./controllers');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/favorite', (req, res) => {
  fetchFromDB()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.error(err));
});

app.post('/favorite', (req, res) => {
  sendToDB(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.delete('/favorite/:id', (req, res) => {
  deleteFromDB(req.params.id).then(() => {
    fetchFromDB().then((data) => res.send(data));
  });
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log('server set up');
});
