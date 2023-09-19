const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
const makeQuery = require("../utils/makeQuery.utils");
require('dotenv').config();

const objectLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "OBJECT SCRAPPER"
    );

module.exports = {
    async createObjectDetails (id) {
        try {
            const object = await this._getObjectData(id);

            return object;
        } catch (error) {
            objectLogger.error(error);
        }
    },

    async _getObject (id) {
        try {
            const data = await makeQuery.makeQuery(
                "getCatalogObject",
                "Catalog",
                { id }
            );

            return data;
        } catch (error) {
            objectLogger.error(error);
        }
    },
}