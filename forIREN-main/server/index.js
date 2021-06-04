const app = require('./src/app');

const port = 8050;
app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
