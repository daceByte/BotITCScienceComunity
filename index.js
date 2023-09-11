const wppconnect = require("@wppconnect-team/wppconnect");
const winston = require("winston");
const command = require("./commands/index");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: {
    service: "user-service",
  },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

wppconnect
  .create({
    session: "itcscience",
    logger: logger,
    headless: true,
    logQR: true,
    disableWelcome: true,
    useChrome: false,
    browserArgs: ["--no-sandbox"],
    //puppeteerOptions:{
    //executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', // Ruta al ejecutable de Microsoft Edge en tu sistema
    //}
  })
  .then(async (client) => {
    await command.start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });
