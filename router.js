const CatalogController = require("./controllers/catalog.controller");
const StartController = require("./controllers/start.controller");

module.exports = {
    async Router(msg, bot) {
        if (msg.text.split(" ")[0] === `/start`) return StartController.setStart(msg, bot);
        if (msg.text.split(" ")[0] === `/catalog` || msg.text === `Каталог`) return CatalogController.setCatalog(msg, bot);
    }
}