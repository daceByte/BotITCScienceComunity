module.exports = async function stringNormalize(str) {
  let temp = "";
  for (let i = 0; i < str.length; i++) {
    if (
      (str.charCodeAt(i) > 64 && str.charCodeAt(i) < 91) ||
      (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123)
    ) {
      temp += str[i];
    }
  }
  return temp;
};
