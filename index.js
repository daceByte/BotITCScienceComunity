const wppconnect = require("@wppconnect-team/wppconnect");
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const commandController = require("./controllers/commandController");
//const notifyController = require("./controllers/notifyController");

commandController.uiStart();

wppconnect
  .create({
    session: "ITCScience",
    useChrome: true,
    updatesLog: false,
    disableWelcome: true,
    onLoadingScreen: (percent, message) => {
      console.log(
        "info:     [ITCScience:client] CARGA DE PANTALLA WPPconnect ",
        percent,
        message
      );
    },
  })
  .then((wppClient) => start(wppClient))
  .catch((error) => {
    console.log(error);
  });

function start(wppClient) {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.initialize();

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", () => {
    console.log("info:     [ITCScience:client] SESIÓN AUTENTICADA");
  });

  client.on("auth_failure", (msg) => {
    console.error(
      "info:     [ITCScience:client] FALLO DE AUTENTIFICACION",
      msg
    );
  });

  client.on("ready", () => {
    console.log("info:     [ITCScience:client] BOT EN EJECUCION");
  });

  client.on("call", async (call) => {
    await call.reject();
  });

  client.on("disconnected", (reason) => {
    console.log(
      "info:     [ITCScience:client] EL CLIENTE FUE DESCONECTADO: ",
      reason
    );
  });

  client.on("message", async (msg) => {
    commandController.commandBot(client, msg, wppClient);
  });

  client.on("message_create", (msg) => {
    if (msg.fromMe) {
      if (msg.type == "poll_creation") {
        const savePoll = require("./lib/savePoll");
        savePoll(msg._data.id._serialized, msg);
      } else if (msg.body.includes("ANUNCIO")) {
        const saveAd = require("./lib/saveAd");
        saveAd(msg._data.id._serialized, msg);
      }
    }
  });
}
