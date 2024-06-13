const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const config = require('./src/config');
const corsMiddleware = require('./middlewares/cors');
const bodyParserMiddleware = require('./middlewares/bodyParser');
const webRoutes = require('./routes/webRoutes');
const unzipRoutes = require('./routes/unzipRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: config.corsOptions });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(corsMiddleware);
app.use(bodyParserMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use(webRoutes);
app.use(unzipRoutes);

app.use(errorHandler);

module.exports = { app, server, io };
