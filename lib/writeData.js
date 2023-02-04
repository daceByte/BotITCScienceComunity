module.exports = async function writeData(file, data) {
  const fs = require("fs");
  let temp = JSON.stringify(data);
  fs.writeFileSync(file, temp);
  return "Base de datos actualizada, archivo " + file + ".";
};
