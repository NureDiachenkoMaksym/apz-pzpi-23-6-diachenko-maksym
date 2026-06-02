const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => res.json({ status: 'ok', instance: process.env.HOSTNAME }));
app.get('/api/resources', (req, res) => {
  res.json([
    { type: 'forest', territory: 'Kharkiv region', value: 73.4 },
    { type: 'water', territory: 'Kharkiv region', value: 62.1 },
    { type: 'land', territory: 'Kharkiv region', value: 81.8 }
  ]);
});

app.listen(PORT, () => console.log(`API server started on ${PORT}`));
