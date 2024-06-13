const config = require('./src/config');
const { server } = require('./app');

const PORT = config.port;

server.listen(PORT, () => {
    console.log(`API ejecutándose en http://localhost:${PORT}`);
});
