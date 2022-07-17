const ticketModel = require('../models/ticketModel');
const ticketData = require('./testdata.json').ticketData;


module.exports.beforeEach = async function () {
    await ticketModel.insertMany(ticketData)
};

module.exports.afterEach = async function () {
    await ticketModel.deleteMany();
}

module.exports.beforeAll = async function (server, dbname, mongoose) {
    return new Promise((resolve) => {
        const dbOptions = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        };
        server.getUri(dbname).then((mongoUri) => {
            mongoose.connect(mongoUri, dbOptions);
            var db = mongoose.connection;
            db.once('open', function () {
                resolve();
            });
        });
    });
};

module.exports.afterAll = async function (server, mongoose) {
    await mongoose.connection.close();
    await server.stop();
};