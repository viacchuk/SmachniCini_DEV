const CatalogController = require("./controllers/catalog.controller");
const StartController = require("./controllers/start.controller");

module.exports = {
    async Router(msg, bot) {
        if (msg.text === `/start`) return StartController.setStart(msg, bot);
        if (msg.text === `/catalog` || msg.text === `Каталог`) return CatalogController.setCatalog(msg, bot);
    }
}