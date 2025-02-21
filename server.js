// Imports --------------------------------------------
import app from './app.js';
import { log } from '@dips/api-log';

//Config app --------------------------------------------
const port = process.env.PORT || 3000;
const host = process.env.HOST;

//Listen app --------------------------------------------
app.listen(port, () => {
  log(`Server live on ${host}:${port}. 🚀🚀🚀`, 'info');
  console.log(`Server live on ${host}:${port}. 🚀🚀🚀`);
});
