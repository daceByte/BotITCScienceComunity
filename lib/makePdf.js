async function makePdf(client, msg, data) {
  var pdf = require("html-pdf");
  var contenido =
    '<!DOCTYPE html><html><head><title>Reporte</title></head><style type="text/css">*{background-color: #95b8f6;}.title{color: #f9d99a;font-family: sans-serif;}.text{color: #000;font-family: sans-serif;}.center{text-align: center;}.content{text-align: justify;}</style><body><h1 class="title center">Reporte solicitado - Bot Small Duck - ITCScience</h1><br><br>' +
    data +
    "<br><br></body></html>";

  client.sendText(
    msg.author + "@c.us",
    "Usted ha solicitado un reporte de comunidad, este sera enviado por este medio, por favor sea paciente...En caso de ocurrir un error recibira un mensaje de fallo por este medio."
  );

  pdf.create(contenido).toFile("./temp.pdf", function (err, res) {
    if (err) {
      console.log(err);
      client.sendText(
        msg.author + "@c.us",
        "Ha ocurrido un error interno, espere un tiempo e intentelo de nuevo, en caso de volver a fallar comuniquelo a administracion."
      );
    } else {
      sendPdf(client, msg);
    }
  });
}

async function sendPdf(client, msg) {
  const pdf2base64 = require("pdf-to-base64");
  pdf2base64("./temp.pdf")
    .then((response) => {
      client.sendFileFromBase64(
        msg.author + "@c.us",
        response,
        "Reporte",
        "Entrega de reporte solicitado."
      );
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  makePdf,
};
