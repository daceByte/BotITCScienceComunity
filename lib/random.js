/**
 * Obtiene un numero randon estableciendo un numero maximo.
 *
 * @param {int} [max]
 * @returns {int}
 */
module.exports = function random(max) {
  return Math.floor(Math.random() * max);
};
