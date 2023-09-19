const ListScrapper = require("../scrappers/catalog.list.scrappers");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const catalogLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "CATALOG"
);

module.exports = {
    async setCatalog (msg, bot) {
        catalogLogger.silly(msg);
        const catalogOptions = await ListScrapper.createCatalogOptions(1);
        catalogLogger.debug(catalogOptions);

        return bot.sendMessage(msg.chat.id, `Асортимент товару`, catalogOptions);
    },

    async getCatalogPage (page, bot) {
        const catalogOptions = await ListScrapper.createCatalogOptions(page);
        
        return catalogOptions;
    }
}