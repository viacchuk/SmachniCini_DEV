const { CatalogController } = require("./controllers/catalog.controller");
const { StartController } = require("./controllers/start.controller")

module.exports = {
    async Router(msg, bot) {
        if (msg.text === `/start`) await StartController(msg, bot);
        if (msg.text === `/catalog` || msg.text === `Каталог`) await CatalogController(msg, bot);
    }
}