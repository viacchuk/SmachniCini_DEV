
const CatalogController = require("../controllers/catalog.controller");
const ObjectScrappers = require("../scrappers/catalog.object.scrappers");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const catalogLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "CATALOG CALLBACK"
);

module.exports = {
    async CallbackCatalog (callback, bot) {
        try {
            catalogLogger.silly(callback);

            if (callback.data.split("_")[1] === "p") {
                const page = parseInt(callback.data.split("_")[0])

                const catalogOptions = await CatalogController.getCatalogPage(page, bot);
                catalogLogger.debug(catalogOptions);

                return bot.sendMessage(callback.message.chat.id, `Асортимент товару`, catalogOptions);
            }

            if (callback.data.split("_")[1] === "l") {
                const objectID = parseInt(callback.data.split("_")[0]);
                const object = await ObjectScrappers.createObjectDetails(objectID);

                return bot.sendMessage(callback.message.chat.id, object.info);
            }

        } catch (error) {
            catalogLogger.error(error);
        }
    }
}