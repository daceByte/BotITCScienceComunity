/**
 * Obtiene el ID del grupo segun su nombre.
 *
 * @param {string} [groupString]
 * @returns {string}
 */
module.exports = function getGroupId(groupString) {
  if (groupString == "freeDucks") {
    return "120363044025465891@g.us";
  } else if (groupString == "itLinux") {
    return "120363044898890124@g.us";
  } else if (groupString == "wheels") {
    return "120363037920760603@g.us";
  } else if (groupString == "programadores101") {
    return "120363022524929520@g.us";
  } else if (groupString == "encuestas") {
    return "120363046164979695@g.us";
  } else if (groupString == "programadores") {
    return "573204777967-1633823575@g.us";
  } else if (groupString == "cienciasComputacionales") {
    return "573204777967-1634736386@g.us";
  } else if (groupString == "pruebas") {
    return "120363030488085609@g.us";
  } else if (groupString == "control") {
    return "120363048216171776@g.us";
  } else if (groupString == "prueba2") {
    return "120363048823090839@g.us";
  }
  return "NN";
};
