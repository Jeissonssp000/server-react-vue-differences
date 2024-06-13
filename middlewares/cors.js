const cors = require('cors');
const config = require('../src/config');

console.log("cors: ", config.corsOptions.origin)
const corsOptions = config.corsOptions;

module.exports = cors(corsOptions);
