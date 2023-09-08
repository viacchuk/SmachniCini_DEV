const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");

const listLogger = logger("silly", loggerInstance, "LIST");

module.exports = {
    makeListOptions(
        titleList,
        pagesNumber,
        currentPage,
        type
    ) {
        if (
            titleList.length < 1 ||
            !Number.isInteger(pagesNumber) ||
            !Number.isInteger(currentPage) 
        ) {
            listLogger.error("Incorrect data");
            return Error;
        }

        const buttons = [];

        if (titleList != -1 && titleList.length > 0) {
            for (let i = 0; i < titleList.length; i++) {
                buttons.push([{
                    text: `${titleList[i].name}`,
                    callback_data: `${titleList[i].id}_l_${type}`
                }]);
            }
        }

        buttons.push([]);
        if (pagesNumber != -1) {
            for (let i = 1; i <= pagesNumber; i++) {
                if (i != currentPage) {
                    buttons[buttons.length-1].push({
                        text: `${i}`,
                        callback_data: `${i}_p_${type}`
                    });
                } else {
                    buttons[buttons.length-1].push({
                        text: `[${i}]`,
                        callback_data: `${i}_p_${type}`
                    });
                }
            }
        }

        buttons.push([]);
        if (currentPage > 1) {
            buttons[buttons.length-1].push({
                text: `Назад   `,
                callback_data: `${currentPage-1}_p_${type}`
            });
        }
        if (currentPage < pagesNumber) {
            buttons[buttons.length-1].push({
                text: `   Далі`,
                callback_data: `${currentPage+1}_p_${type}`
            });
        }

        const options = {
            reply_markup: JSON.stringify({
                inline_keyboard: buttons
            })
        }

        return options;
    }
}