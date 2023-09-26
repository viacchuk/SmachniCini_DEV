const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const objectLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "OBJECT BUTTON"
);

module.exports = {
    async makeCashOptions (id) {
        try {
            const options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [[{
                        text: `✔️ Замовити`,
                        callback_data: `${id}_c_object`
                    }]]
                })
            };

            return options;
        } catch (error) {
            objectLogger.error(error);
        }
    },

    async makeBuyOptions (id) {
        try {
            const options = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{
                            text: `💰 Повна оплата`,
                            callback_data: `${id}_f_object`
                        }],
                        [{
                            text: `⌛️ Післяоплата`,
                            callback_data: `${id}_a_object`
                        }]
                    ]
                })
            };

            return options;
        } catch (error) {
            objectLogger.error(error);
        }
    },
}