/**
 * Imprime un anuncio de la comunidad con caracteres ascii.
 *
 */
function uiStart() {
  console.log(
    "\n        ██ ████████  ██████ ███████  ██████ ██ ███████ ███    ██  ██████ ███████ \n        ██    ██    ██      ██      ██      ██ ██      ████   ██ ██      ██      \n        ██    ██    ██      ███████ ██      ██ █████   ██ ██  ██ ██      █████   \n        ██    ██    ██           ██ ██      ██ ██      ██  ██ ██ ██      ██      \n        ██    ██     ██████ ███████  ██████ ██ ███████ ██   ████  ██████ ███████\n        "
  );
}

/**
 * Recibe el mensaje y comprueba que sea de un wheel para luego comprobar que es un comando,
 * que contenga el formato correcto, cuando se comprueba que es un comando llama al modelo,
 * y ejecuta la accion del comando.
 *
 * @param {client} [client]
 * @param {Message} [msg]
 * @param {wppClient} [wppClient]
 */
async function commandBot(client, msg, wppClient) { 
  const model = require("../models/commandModel");
  const isWheel = require("../lib/wheel");
  if (isWheel(msg.author)) {
    switch (msg.body) {
      case "#off":
        client.destroy();
        wppClient.close();
        break;
      case "#all":
        await model.all(msg);
        break;
      case "#joke":
        await model.joke(msg);
        break;
      case "#debugc":
        await model.debugComunity(client, msg);
        break;
      case "#debug":
        await model.debugGroups(client, msg);
        break;
      case "#menu":
        await model.menu(client, msg);
        break;
      case "#group":
        await model.group(client, msg);
        break;

      default:
        if (msg.body.startsWith("#ban ")) {
          await model.ban(client, msg);
        } else if (msg.body.startsWith("#poll ")) {
          await model.poll(wppClient, msg);
        } else if (msg.body.startsWith("#vote ")) {
          await model.getVotes(client, wppClient, msg);
        } else if (msg.body.startsWith("#purge ")) {
          await model.purgeVotes(client, wppClient, msg);
        } else if (msg.body.startsWith("#ad ")) {
          await model.ad(client, msg);
        }
        break;
    }
  }
}

module.exports = { uiStart, commandBot };
