const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/write', (req, res) => {
  fs.readFile(path.join(__dirname, 'a.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read file' });
    }

    const jsonArray = JSON.parse(data);
    jsonArray.push(req.body);

    fs.writeFile(path.join(__dirname, 'a.json'), JSON.stringify(jsonArray), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to write file' });
      res.statusCode = 200
      res.json({ message: 'File written successfully' });
    });
  });
});

app.get('/read', (req, res) => {
  fs.readFile(path.join(__dirname, 'a.json'), 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    res.json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// setInterval(() => {
//   let date = new Date()
//   let hours = date.getHours()
//   let minutes = date.getMinutes()
//   let time = `${hours}:${minutes}`

// }, 60000);