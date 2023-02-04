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
      console.log("CARGA DE PANTALLA WPPconnect ", percent, message);
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
    console.log("SESIÓN AUTENTICADA");
  });

  client.on("auth_failure", (msg) => {
    console.error("FALLO DE AUTENTIFICACION", msg);
  });

  client.on("ready", () => {
    console.log("BOT EN EJECUCION COMPLETA");
  });

  client.on("call", async (call) => {
    await call.reject();
  });

  client.on("disconnected", (reason) => {
    console.log("EL CLIENTE FUE DESCONECTADO: ", reason);
  });

  client.on("message", async (msg) => {
    commandBot(client, msg, wppClient);
  });
}
