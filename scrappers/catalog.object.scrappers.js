const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
const makeQuery = require("../utils/makeQuery.utils");
require('dotenv').config();

const objectLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "OBJECT SCRAPPER"
);

module.exports = {
    async createObjectDetails (id) {
        try {
            const data = await this._getObject(id);
            const object = await this._composeObject(data);

            return object;
        } catch (error) {
            objectLogger.error(error);
        }
    },

    async _getObject (id) {
        try {
            const data = await makeQuery.makeQuery(
                "getCatalogObject",
                "Catalog",
                { id }
            );

            return data;
        } catch (error) {
            objectLogger.error(error);
        }
    },

    async _composeObject (data) {
        try {
            let status = "Нема в наявності";
            if (data.status) status = "Є в наявності";

            const object = {};
            object.media = [];

            const photo = data.photo.split("_");
            for (let i = 0; i < photo.length; i++) {
                object.media.push({
                    type: 'photo',
                    media: photo[i],
                  })
            }
    
            object.text = `
${data.name}
    
${data.info}
    
Статус: ${status}
💵Ціна - ${data.price} грн

Замовляти можна від 1 шт, як і весь товар на каналі, 1 шт теж можна.
(ціна, статус та інша інформація про товар актуальна станом на ${(new Date()).getHours()-3}:00)
            `
    
            return object;
        } catch (error) {
            objectLogger.error(error);
        }
    }
}