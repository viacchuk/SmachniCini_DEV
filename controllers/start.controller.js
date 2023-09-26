const { CallbackCatalog } = require("../callbacks/catalog.callbacks");
const StartScrapper = require("../scrappers/start.scrappers");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const startLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "START"
);

module.exports = {
    async setStart (msg, bot) {
        startLogger.silly(msg);
        startLogger.info(`User ${msg.chat.first_name} ${msg.chat.last_name} (${msg.chat.id}) started bot`);
        const startMessage = await StartScrapper.createStartOptions(msg.chat.first_name);

        if (!msg.text.split(" ")[1]) 
            return bot.sendMessage(msg.chat.id, startMessage.startInfo, startMessage.startForm);
        else {
            const callback = {
                data: `${msg.text.split(" ")[1]}_l_catalog`,
                message: {
                    chat: {
                        id: msg.chat.id
                    }
                }
            };

            return CallbackCatalog(callback, bot);
        }
    }
}