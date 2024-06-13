const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  corsOptions: {
    origin: process.env.DEV ? '*' : 'https://react-vue-differences.web.app',
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200
  }
};
