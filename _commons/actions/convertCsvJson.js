const csvToJson = require('convert-csv-to-json');

module.exports = (url) => {
    const json = csvToJson.fieldDelimiter(',').getJsonFromCsv(url);
    return json
}
