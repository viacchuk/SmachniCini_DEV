const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
const fetcher = require("./fetcher.utils");
require('dotenv').config();

const queryLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "QUERY"
    );

module.exports = {
    async makeQuery(method, table, params = {}) {
        try {
            if (method === "getPages") return this._getPages(table, params);
            if (method === "getPageList") return this._getPageList(table, params);
            if (method === "getCatalogObject") return this._getCatalogObject(table, params);
        } catch (error) {
            queryLogger.error(error);
        }
    },

    async _getPages(table, params) {
        try {
            const data = await fetcher("catalog/pages", params);
            
            return data;
        } catch (error) {
            queryLogger.error(error);
        }
    },

    async _getPageList(table, params) {
        try {
            const data = await fetcher("catalog", params);
            
            return data
        } catch (error) {
            queryLogger.error(error);
        }
    },

    async _getCatalogObject(table, params) {
        try {
            const data = await fetcher("object", params);

            return data;
        } catch (error) {
            queryLogger.error(error);
        }
    }
}