const wppconnect = require("@wppconnect-team/wppconnect"); // APi Dos, importante para el envio y obtencion de votos.
const qrcode = require("qrcode-terminal"); // Complemento de la APi Uno para proyectar el QR code de whatsapp web.
const { Client, LocalAuth } = require("whatsapp-web.js"); // Api Uno
const commandController = require("./controllers/commandController"); //Controlador de comandos.

commandController.uiStart(); // Comando que imprime Mensaje de ITCScience ("Decoracion")

wppconnect
  .create({
    session: "ITCScience", //Crea la carpeta de la session.
    useChrome: true, // Establece usar google chrome como cliente para la api.
    updatesLog: false, // Muestra un log de actualizaciones
    disableWelcome: true, // Desactiva el mensaje de bienvenida de la api dos.
    onLoadingScreen: (percent, message) => { // Imprime mensajes de carga
      console.log(
        "info:     [ITCScience:client] CARGA DE PANTALLA WPPconnect ",
        percent,
        message
      );
    },
  })
  .then((wppClient) => start(wppClient)) // Inicia la funcion start() para conectar la api uno con el cliente.
  .catch((error) => {
    console.log(error); 
  });

function start(wppClient) {
  console.log("info:     [ITCScience:client] WPPconnect Conectado."); //Imprime que se inicio correctamente la api dos.
  const client = new Client({ // Declara el cliente de la api uno.
    authStrategy: new LocalAuth(), // Establece que guarde sesion la api uno de forma local.
  });

  client.initialize(); // Inicializa el cliente de la api uno

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true }); // Proyecta el codigo QR de whatsapp web
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

  client.on("message", async (msg) => { // Lee los mensajes entrantes al bot atravez de la api uno y ejecuta el controlador del bot.
    commandController.commandBot(client, msg, wppClient); // Controlador del bot.
  });

  client.on("message_create", (msg) => { // Lee los mensajes creados recientemente
    if (msg.fromMe) { // Comprueba si el mensaje creado es del bot
      if (msg.type == "poll_creation") { //Comprueba que el mensaje es de tipo encuesta
        const savePoll = require("./lib/savePoll"); 
        savePoll(msg._data.id._serialized, msg);
      } else if (msg.body.includes("ANUNCIO")) { //Comprueba si el mensaje es un anuncio del bot.
        const saveAd = require("./lib/saveAd");
        saveAd(msg._data.id._serialized, msg);
      }
    }
  });
}
