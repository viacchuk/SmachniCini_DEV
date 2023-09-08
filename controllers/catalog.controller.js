const { makeListOptions } = require("../buttons/list.buttons");
const makeQuery = require("../utils/makeQuery.utils");
const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");

const catalogLogger = logger("silly", loggerInstance, "CATALOG");

module.exports = {
    async CatalogController(msg, bot) {

        const responceObject = async (id) => {
            const object = `Інформація про товар з ID ${id}`
            return object;
        }

        const createCatalogData = async (page) => {
            const data = [];
            for(let i = 1; i <= 10; i++) {
                data.push({
                    name: `Товар ${50-(10*(page-1)+i-1)}`,
                    id: 50-(10*(page-1)+i-1)
                });
            }

            return data;
        }

        const createCatalogList = async (data, page) => {
            const list = makeListOptions(
                data,
                5,
                page,
                "catalog"
            );

            return list;
        }

        const catalogOptions = await createCatalogList(await createCatalogData(1), 1);

        catalogLogger.debug(msg);
        catalogLogger.info(`User ${msg.chat.first_name} ${msg.chat.last_name} (${msg.chat.id}) response catalog`);
        await bot.sendMessage(msg.chat.id, `Асортимент товару`, catalogOptions)

        bot.on('callback_query', callback => {
            if (callback.data.split("_")[2] === "catalog") {
                const catalogWorker = async () => {
                    if (callback.data.split("_")[1] === "p") {
                        const catalogData = await createCatalogData(callback.data.split("_")[0]);
                        const catalogList = await createCatalogList(catalogData, parseInt(callback.data.split("_")[0]));
                        catalogLogger.debug(catalogList);
                        return bot.sendMessage(msg.chat.id, `Асортимент товару`, catalogList)
                    }
                    if (callback.data.split("_")[1] === "l") {
                        const catalogObject = await responceObject(parseInt(callback.data.split("_")[0]));
                        catalogLogger.debug(catalogObject);
                        return bot.sendMessage(msg.chat.id, `${catalogObject}`)
                    }
                }

                catalogWorker();
            }
        })
    }
}