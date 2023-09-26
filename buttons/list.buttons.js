const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const listLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "LIST BUTTON"
);

module.exports = {
    async makeListOptions (
        list,
        pages,
        page,
        type
    ) {
        try {
            const buttons = [];

            const objectsList = await this._createObjectsList (
                list,
                type
            );
            const pagesList = await this._createPagesList (
                page, 
                pages, 
                type
            );
            const navigationList = await this._createNavigationList (
                page,
                pages,
                type
            )
    
            for(let i = 0; i < objectsList.length; i++) {
                buttons.push(objectsList[i]);
            };
            buttons.push(pagesList);
            buttons.push(navigationList);

            const options = await this._createOptionsJSON(buttons)

            return options;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _createObjectsList (list, type) {
        try {
            const buttons = [];

            for (let i = 0; i < list.length; i++) {
                buttons.push([{
                    text: `${list[i].name}`,
                    callback_data: `${list[i].id}_l_${type}`
                }]);
            }

            return buttons;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _createPagesList (
        page, 
        pages, 
        type
    ) {
        try {
            const buttons = [];

            let start = 1;
            let end = 7;

            if (page > 5) {
                start = page - 3;
                end = page + 3;
            }

            if (page > pages - 6) {
                start = pages - 6;
                end = pages;
            }

            for (let i = start; i <= end; i++) {
                if (i != page) {
                    buttons.push({
                        text: `${i}`,
                        callback_data: `${i}_p_${type}`
                    });
                } else {
                    buttons.push({
                        text: `[${i}]`,
                        callback_data: `${i}_p_${type}`
                    });
                }
            }

            if (page > 5) {
                buttons[0] = {
                    text: `1...`,
                    callback_data: `$1_p_${type}`
                }
            }

            if (page != pages) {
                buttons[6] = {
                    text: `...${pages}`,
                    callback_data: `${pages}_p_${type}`
                }
            }

            return buttons;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _createNavigationList (
        page,
        pages,
        type
    ) {
        try {
            const buttons = [];

            if (page > 1) {
                buttons.push({
                    text: `◀️ Назад   `,
                    callback_data: `${page-1}_p_${type}`
                });
            }
            if (page < pages) {
                buttons.push({
                    text: `   Далі ▶️`,
                    callback_data: `${page+1}_p_${type}`
                });
            }

            return buttons;
        } catch (error) {
            listLogger.error(error);
        }
    },

    async _createOptionsJSON (buttonsObject) {
        try {
            const buttonsJSON = {
                reply_markup: JSON.stringify({
                    inline_keyboard: buttonsObject
                })
            }

            return buttonsJSON;
        } catch (error) {
            listLogger.error(error);
        }
    }
}