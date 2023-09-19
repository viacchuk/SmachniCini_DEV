const ListButtons = require("../buttons/list.buttons");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
const makeQuery = require("../utils/makeQuery.utils");
require('dotenv').config();

const listLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "LIST SCRAPPER"
    );

module.exports = {
    async createCatalogOptions (page) {
        try {
            const catalogPages = await this._getPagesNumber();
            const catalogData = await this._createCatalogData(page);
            const catalogList = await this._createCatalogList(catalogData, page, catalogPages);

            return catalogList;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _getPagesNumber () {
        try {
            const pages = await makeQuery.makeQuery(
                "getPages",
                 "Catalog"
                 );

            return pages;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _createCatalogData (page) {
        try {
            const data = await makeQuery.makeQuery(
                "getPageList",
                 "Catalog",
                 {page}
                 );

            return data;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _createCatalogList (data, page, pages) {
        try {
            const list = await ListButtons.makeListOptions(
                data,
                pages,
                page,
                "catalog"
            );

            return list;
        } catch (error) {
            listLogger.error(error);
        }
    }
}