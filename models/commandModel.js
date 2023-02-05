async function all(msg) {
  const chat = await msg.getChat();
  let number = "";
  chat.participants.forEach((element) => {
    number += `@${element.id.user} `;
  });
  chat.sendMessage(number, {
    mentions: chat.participants,
  });
}

async function joke(msg) {
  const readData = require("../lib/readData.js");
  let joke = readData("./data/joke.json");
  const getRandomInt = require("../lib/random.js");
  msg.reply(joke[getRandomInt(Object.keys(joke).length)]);
}

async function debugComunity(client, msg) {
  const readData = require("../lib/readData.js"),
    chats = await client.getChats();
  let data = [],
    group = "";
  for (let i = 0; i < chats.length; i++) {
    if (chats[i].id._serialized == "120363025112889144@g.us") {
      data = chats[i].participants;
      group = chats[i];
      break;
    }
  }
  let chatids = readData("./data/chat.json");
  for (let j = 0; j < data.length; j++) {
    var exist = false;
    for (let i = 0; i < Object.keys(chatids).length; i++) {
      let tempData = [];
      for (let w = 0; w < chats.length; w++) {
        if (chats[w].id._serialized == chatids[i]) {
          tempData = chats[w].participants;
          break;
        }
      }
      for (let p = 0; p < tempData.length; p++) {
        if (data[j].id._serialized == tempData[p].id._serialized) {
          exist = true;
          break;
        }
      }
      if (exist) {
        break;
      }
    }

    if (!exist) {
      await group.removeParticipants([data[j].id._serialized]);
    }
  }

  msg.reply(
    "Tarea terminada, la depuracion en todos los grupos ha sido completada."
  );
}

async function debugGroups(client, msg) {
  const readData = require("../lib/readData.js");

  const chats = await client.getChats();
  let data = [],
    group = "";
  for (let i = 0; i < chats.length; i++) {
    if (chats[i].id._serialized == "120363025112889144@g.us") {
      data = chats[i].participants;
      group = chats[i];
      break;
    }
  }

  let chatids = readData("./data/chat.json");
  for (let c = 0; c < Object.keys(chatids).length; c++) {
    const elementSup = chatids[c];
    if (elementSup != "56997438535-1629325703@g.us") {
      let tempData = [];

      for (let w = 0; w < chats.length; w++) {
        if (chats[w].id._serialized == elementSup) {
          tempData = chats[w].participants;
          break;
        }
      }

      tempData.forEach(async (element) => {
        let borrar = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].id.user == element.id.user) {
            borrar = true;
          }
        }
        if (!borrar) {
          await group.removeParticipants([element.id._serialized]);
        }
      });
    }
  }
  msg.reply("Tarea terminada, la depuracion ha sido completada.");
}

async function ban(msg) {
  const isWheel = require("../lib/wheel");
  if (msg.body.includes("@")) {
    let ban = true;
    if (isWheel(msg.author)) {
      ban = false;
    }

    if (ban && msg.body.split("@")[1] != "573028353043") {
      const chat = await msg.getChat();
      await chat.removeParticipants([msg.body.split("@")[1] + "@c.us"]);
    } else {
      msg.react("❌");
    }
  }
}

async function poll(wppClient, msg) {
  const groupId = require("../lib/groupId");
  let data = msg.body.split("#poll ")[1];
  data = data.split("/");
  if (data.length >= 4) {
    let options = [];
    for (let i = 2; i < data.length; i++) {
      options.push(data[i]);
    }
    wppClient.sendPollMessage(groupId(data[0]), data[1], options);
  }
}

async function getVotes(client, wppClient, msg) {
  const readData = require("../lib/readData.js"),
    poll = readData("./data/poll.json"),
    { Message } = require("whatsapp-web.js/src/structures");
  let pollId = "",
    msgNew = msg;
  for (let i = 0; i < Object.keys(poll).length; i++) {
    if (poll[i].idName == msg.body.split("#vote ")[1]) {
      pollId = poll[i].msgId;
      msgNew = new Message(client, poll[i].content);
      break;
    }
  }

  if (pollId != "" && msgNew != null) {
    let votes = await wppClient.getVotes(pollId),
      dataInfo = await msgNew.getInfo();
    let countRead = Object.keys(dataInfo.read).length,
      countVotes = Object.keys(votes.votes).length;
    msg.reply(
      "📊 ENCUESTA ID #" +
        msg.body.split("#vote ")[1] +
        "\nEsta encuesta a sido vista por " +
        countRead +
        " personas y ha obtenido " +
        countVotes +
        " votos en total. Si desea purgar los usuarios usar #purge ID"
    );
  } else {
    msg.reply(
      "El ID que envio no existe en la base de datos, por favor verifique el ID."
    );
  }
}

async function purgeVotes(client, wppClient, msg) {
  const readData = require("../lib/readData.js"),
    poll = readData("./data/poll.json"),
    { Message } = require("whatsapp-web.js/src/structures");
  let pollId = "",
    msgNew = msg;
  for (let i = 0; i < Object.keys(poll).length; i++) {
    if (poll[i].idName == msg.body.split("#purge ")[1]) {
      pollId = poll[i].msgId;
      msgNew = new Message(client, poll[i].content);
      break;
    }
  }

  if (pollId != "" && msgNew != null) {
    let votes = await wppClient.getVotes(pollId),
      dataInfo = await msgNew.getInfo(),
      countUser = 0;

    for (let i = 0; i < Object.keys(dataInfo.read).length; i++) {
      let ban = true;
      for (let o = 0; o < Object.keys(votes.votes).length; o++) {
        if (
          dataInfo.read[i].id._serialized == votes.votes[i].sender._serialized
        ) {
          ban = false;
          break;
        }
      }

      if (ban == true) {
        const chat = await msgNew.getChat();
        await chat.removeParticipants([dataInfo[i].id._serialized]);
        countUser++;
      }
    }
    msg.reply(
      "📊 ENCUESTA ID #" +
        msg.body.split("#purge ")[1] +
        " Fueron baneadas " +
        countUser +
        " personas."
    );
  } else {
    msg.reply(
      "El ID que envio no existe en la base de datos, por favor verifique el ID."
    );
  }
}

module.exports = {
  all,
  joke,
  debugGroups,
  debugComunity,
  ban,
  poll,
  getVotes,
  purgeVotes,
};
