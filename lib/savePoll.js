/**
 * Guarda el mensaje de la encuesta junto con su id
 *
 * @param {string} [idSerialized]
 * @param {Message} [msg]
 */
module.exports = function savePoll(idSerialized, msg) {
  const writeData = require("./writeData");
  const readData = require("./readData");

  let data = readData("./data/poll.json");
  data.push({
    idName: Object.keys(data).length + 1,
    msgId: idSerialized,
    content: msg,
  });
  writeData("./data/poll.json", data);
};
