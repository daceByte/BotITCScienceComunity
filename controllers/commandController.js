function uiStart() {
  console.log(
    "\n        ██ ████████  ██████ ███████  ██████ ██ ███████ ███    ██  ██████ ███████ \n        ██    ██    ██      ██      ██      ██ ██      ████   ██ ██      ██      \n        ██    ██    ██      ███████ ██      ██ █████   ██ ██  ██ ██      █████   \n        ██    ██    ██           ██ ██      ██ ██      ██  ██ ██ ██      ██      \n        ██    ██     ██████ ███████  ██████ ██ ███████ ██   ████  ██████ ███████\n        "
  );
}

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

      default:
        if (msg.body.startsWith("#ban ")) {
          await model.ban(client, msg);
        } else if (msg.body.startsWith("#poll ")) {
          await model.poll(wppClient, msg);
        } else if (msg.body.startsWith("#vote ")) {
          await model.getVotes(client, wppClient, msg);
        } else if (msg.body.startsWith("#purge ")) {
          await model.purgeVotes(client, wppClient, msg);
        }
        break;
    }
  }
}

module.exports = { uiStart, commandBot };
