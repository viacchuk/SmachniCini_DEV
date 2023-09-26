const TelegramApi = require('node-telegram-bot-api');
const { Router } = require('./router');
const logger = require("./utils/logger.utils");
const loggerInstance = require("./utils/loggerInstance.utils");
const { CallbackCatalog } = require('./callbacks/catalog.callbacks');
const { CallbackObject } = require('./callbacks/object.callbacs');
require('dotenv').config();

const mainLogger = logger(process.env.LOGGER_LEVEL, loggerInstance, "MAIN");

const bot = new TelegramApi(
    process.env.BOT_TOKEN, 
    {
        polling: true
    });

const start = async () => {
    try {
        mainLogger.info(`Bot started...`);

        bot.setMyCommands([
            {command: 'catalog', description: 'Каталог товару'}
        ]);
        
        bot.on('message', async msg => {
            mainLogger.debug(msg);
            Router(msg, bot);
        })

        bot.on('callback_query', callback => {
            if (callback.data.split("_")[2] === "catalog") return CallbackCatalog(callback, bot);
            if (callback.data.split("_")[2] === "object") return CallbackObject(callback, bot);
        })
    } catch (error) {
        mainLogger.error(error);
    }
}

start();