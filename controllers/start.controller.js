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
        startLogger.debug(startMessage);

        return bot.sendMessage(msg.chat.id, startMessage.startInfo, startMessage.startForm);
    }
}