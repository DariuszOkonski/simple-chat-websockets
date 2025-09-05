const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.send('GET /');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
