const app = require('./app');
const logger = require('./utils/logging').logger;
const connectDB = require('./utils/db').connect;
const dotenv = require("dotenv");

dotenv.config();

const httpPort = process.env.PORT || process.env.SERVERPORT;
connectDB(() => {
    app.listen(httpPort, () => {
        logger.info(`unit test with mongoose ${httpPort} ...`);
    });
});