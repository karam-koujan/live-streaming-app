const streamSchema = require("./stream-schema");
const streamValidator = require("../../utils/dataValidator")(streamSchema);
const buildMakeStream = require("./stream")
const makeStream = buildMakeStream(streamValidator)

module.exports = makeStream