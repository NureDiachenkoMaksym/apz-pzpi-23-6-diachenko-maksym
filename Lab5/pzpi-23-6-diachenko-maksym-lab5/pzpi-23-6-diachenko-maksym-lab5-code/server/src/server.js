const { buildApp } = require('./app');

const port = Number(process.env.PORT || 3000);
const app = buildApp();

app.listen(port, () => {
  console.log(`EcoResource Analytics API running on http://localhost:${port}`);
});
