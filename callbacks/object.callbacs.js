const { makeBuyOptions } = require("../buttons/object.buttons");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
const makeQuery = require("../utils/makeQuery.utils");
require('dotenv').config();

const objectLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "OBJECT CALLBACK"
);

module.exports = {
    async CallbackObject (callback, bot) {
        try {
            objectLogger.silly(callback);

            if (callback.data.split("_")[1] === "c") {
                const text = `
Оформлення замовлення

Оберіть бажаний варіант оплати
                `

                const buttons = await makeBuyOptions(callback.data.split("_")[0]);
                return bot.sendMessage(callback.message.chat.id, text, buttons);
            }

            if (callback.data.split("_")[1] === "f") {
                const data = await makeQuery.makeQuery(
                    "getCatalogObject",
                    "Catalog",
                    { id: callback.data.split("_")[0] }
                );

                const text = `
Для замовлення товару "\`${data.name}\`" виконайте транзакію на рахунок \`4035 2000 4226 0791\` (Погорільский Микола) у розмірі ${data.price} грн. (якщо плануєте замовляти декілька товарів, то можна усумувати ціни)

Після успішної оплати відправте @bimkas2 назву бажаного товару, скріншот-підтвердження та таку інформацію: 

*ПІБ, телефон, місто, місце доставки* (поштомат нової почти / відділення укрпошти / тощо).
`

                return bot.sendMessage(callback.message.chat.id, text, { parse_mode: 'Markdown' });
            }

            if (callback.data.split("_")[1] === "a") {
                const data = await makeQuery.makeQuery(
                    "getCatalogObject",
                    "Catalog",
                    { id: callback.data.split("_")[0] }
                );

                const text = `
Для замовлення товару "\`${data.name}\`" виконайте транзакію на рахунок \`4035 2000 4226 0791\` (Погорільский Микола) у розмірі 50 грн. 

Після чого відправте @bimkas2 скріншот-підтвердження оплати та інформацію у вигляді:

*ПІБ, телефон, місто, місце доставки* (поштомат нової почти / відділення укрпошти / тощо), *назву бажаного товару* (або товарів) та повідомте про *післяоплату*.

_Важлива інформація, що у разі наложеного платежу, Ви платите додатково службі, котра виконувала доставку, відповідно до їх тарифу. Наприклад, якщо товар коштує 300 грн, доставка 50 грн, а тариф наложеного платежу 100 грн, то сумарно буде оплачено 450 грн_
`
                return bot.sendMessage(callback.message.chat.id, text, { parse_mode: 'Markdown' });
            }

        } catch (error) {
            objectLogger.error(error);
        }
    }
}