module.exports = function savePoll(idSerialized, msg) {
    const writeData = require("./writeData");
    const readData = require("./readData");
  
    let data = readData("./data/ad.json");
    data.push({
      idName: Object.keys(data).length + 1,
      msgId: idSerialized,
      content: msg,
    });
    writeData("./data/ad.json", data);
    return Object.keys(data).length;
  };
  