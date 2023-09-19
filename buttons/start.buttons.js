const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const startLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "START BUTTON"
    );

module.exports = {
    async makeStartOptions () {
        try {
            const buttons = [
                [{text: "Каталог"}],
            ];

            const options = await this._createOptionsJSON(buttons)

            return options;
        } catch (error) {
            startLogger.error(error);
        }
    },

    async _createOptionsJSON (buttonsObject) {
        try {
            const buttonsJSON = {
                reply_markup: {
                    keyboard: buttonsObject
                }
            }

            return buttonsJSON;
        } catch (error) {
            startLogger.error(error);
        }
    }
}