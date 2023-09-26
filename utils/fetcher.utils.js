const logger = require("../utils/logger.utils");
const loggerInstance = require("../utils/loggerInstance.utils");
require('dotenv').config();

const fetcherLogger = logger(
    process.env.LOGGER_LEVEL, 
    loggerInstance, 
    "FETCHER"
    );

module.exports = async function fetcher(to, params = {}) {
    const fetch = (await import("node-fetch")).default;
    class HTTPError extends Error {
        constructor(message, status) {
            super(message);
            this.status = status;
        }
    }

    fetcherLogger.debug(
        `Request to: ${process.env.API_URL + to}\n`, 
        `headers: "Content-Type": "application/json"\n`,
        `body: ${JSON.stringify({
            key: process.env.API_DEV,
            ...params
        })}`
    );

    const res = await fetch(
        process.env.API_URL + to, 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                key: process.env.API_DEV,
                ...params
            })
        }
    );

    if (!res.ok) {
        let errorMessage;
        try {
            errorMessage = await res.text();
            try {
                errorMessage = JSON.parse(errorMessage);
            } catch (e) {
                //    ignore
            }
        } catch (e) {
            errorMessage = "Unknown";
        }
        throw new HTTPError(JSON.stringify(errorMessage), res.status || 500);
    }

    let parsed;

    if (params.responseType === "blob") {
        parsed = await res.blob();
    } else {
        parsed = await res.text();
        try {
            parsed = JSON.parse(parsed);
        } catch (e) {
            //    ignore
        }
    }
    return parsed;
};
