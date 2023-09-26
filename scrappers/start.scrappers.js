const StartButtons = require("../buttons/start.buttons");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const startLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "START SCRAPPER"
);

module.exports = {
    async createStartOptions (name) {
        try {
            const startForm = await this._createStartForm();
            const startInfo = await this._createStartInfo(name);

            return {
                startInfo,
                startForm
            };
        } catch (error) {
            startLogger.error(error);
        }
    },

    async _createStartForm () {
        try {
            const list = await StartButtons.makeStartOptions();

            return list;
        } catch (error) {
            startLogger.error(error);
        }
    },

    async _createStartInfo (name) {
        try {
            return (`
Вітаю, ${name}!

За допомогою цього боту, Ви зможете переглянути та замовити товар з каналу "Смачні ціни(дроп)". 

Щоб почати, натисни на велику кнопку снизу!
            `)
        } catch (error) {
            startLogger.error(error);
        }
    }
}