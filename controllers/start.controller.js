const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");

const startLogger = logger("silly", loggerInstance, "START");

module.exports = {
    async StartController(msg, bot) {
        startLogger.debug(msg);
        startLogger.info(`User ${msg.chat.first_name} ${msg.chat.last_name} (${msg.chat.id}) started bot`);
        await bot.sendMessage(msg.chat.id, `Вітаю, ${msg.chat.first_name}!\n "Бла-бла-бла"`);

        bot.on('callback_query', msg => {
            startLogger.debug(msg);
            //bot.sendMessage(msg.message.chat.id, `Selected button ${msg.data}`);
        })
    }
}