module.exports = function readData(file) {
  const fs = require("fs");
  const temp = fs.readFileSync(file, "utf8");
  return JSON.parse(temp);
}
