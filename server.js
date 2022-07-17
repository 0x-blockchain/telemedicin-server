const app = require('./src/app');
const logger = require('./src/utils/logging').logger;
const connectDB = require('./src/utils/db').connect;
const dotenv = require("dotenv");

dotenv.config();

const httpPort = process.env.SERVERPORT || 5000;
connectDB(() => {
    app.listen(httpPort, () => {
        logger.info(`telemedicine server with mongoose ${httpPort} ...`);
    });
});