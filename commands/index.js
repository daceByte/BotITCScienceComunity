const command = {}

/*
    Funcion donde inicializa evento, 
    y verifica si es un comando registrado o no.
*/
command.start = async (client) => {
    client.onMessage(async (msg) => { //Evento que escucha los mensajes recibidos por whatsapp.
        try {
            if (msg.isGroupMsg) { //Verifica si es un mensaje de un grupo.
                switch (msg.body) { //Variable que contiene el cuerpo o texto del mensaje.
                    case "!verify1":
                    case "!ver1":
                        await command.verify(client, msg);
                        break;
                    case "!ver2":
                    case "!verify2":
                        await command.debug(client, msg);
                        break;
                    case "!ver3":
                    case "!verify3":
                        await command.freeDebug(client, msg);
                        break;
                    case "!ver4":
                    case "!verify4":
                        await command.encuestasDebug(client, msg);
                        break;
                    case "!ver":
                    case "!verify":
                        await command.encuestasDebug(client, msg);
                        await command.freeDebug(client, msg);
                        await command.debug(client, msg);
                        await command.verify(client, msg);
                        break;
                    case "!bantotal":
                        await command.banTotal(client, msg);
                        break;
                }
            }
        } catch (e) {
            command.addLogError(e);
        }
    });
}

command.encuestasDebug = async (client, msg) => {
    const encuestas = mixArrays(await client.getGroupMembersIds('120363046164979695@g.us'), []);

    const linux = mixArrays(await client.getGroupMembersIds('120363044898890124@g.us'), []);
    const ciencias = mixArrays(await client.getGroupMembersIds('573204777967-1634736386@g.us'), []);
    const programadores = mixArrays(await client.getGroupMembersIds('573204777967-1633823575@g.us'), []);

    const total = mixArrays(linux, mixArrays(programadores, ciencias));

    let deleteMembers = [];
    encuestas.forEach(e => {
        if (!total.includes(e)) {
            deleteMembers.push(e);
        }
    });

    if (deleteMembers.length != 0) {
        await client.removeParticipant('120363046164979695@g.us', arrayContent(deleteMembers, encuestas));
    }
}

command.freeDebug = async (client, msg) => {
    const freeducks = mixArrays(await client.getGroupMembersIds('120363044025465891@g.us'), []);

    const linux = mixArrays(await client.getGroupMembersIds('120363044898890124@g.us'), []);
    const ciencias = mixArrays(await client.getGroupMembersIds('573204777967-1634736386@g.us'), []);
    const programadores = mixArrays(await client.getGroupMembersIds('573204777967-1633823575@g.us'), []);

    const total = mixArrays(linux, mixArrays(programadores, ciencias));

    let deleteMembers = [];
    freeducks.forEach(e => {
        if (!total.includes(e)) {
            deleteMembers.push(e);
        }
    });

    if (deleteMembers.length != 0) {
        await client.removeParticipant('120363044025465891@g.us', arrayContent(deleteMembers, freeducks));
    }
};

/*
    Funcion para guardar en un archivo log error.dace 
    los errores capturados.
*/
command.addLogError = (str) => {
    const fs = require("fs");
    fs.appendFile("./error.dace", str + "\n", (error) => {
        if (error) {
            console.log("Ocurrió un error al escribir en el archivo:", error);
        }
    });
};

command.verify = async (client, msg) => {
    const difusion = mixArrays(await client.getGroupMembersIds('120363025112889144@g.us'), []);

    const linux = mixArrays(await client.getGroupMembersIds('120363044898890124@g.us'), []);
    const encuestas = mixArrays(await client.getGroupMembersIds('120363046164979695@g.us'), []);
    const ciencias = mixArrays(await client.getGroupMembersIds('573204777967-1634736386@g.us'), []);
    const freeducks = mixArrays(await client.getGroupMembersIds('120363044025465891@g.us'), []);
    const programadores = mixArrays(await client.getGroupMembersIds('573204777967-1633823575@g.us'), []);
    const recursos = mixArrays(await client.getGroupMembersIds('56997438535-1629325703@g.us'), []);

    const total = mixArrays(linux, mixArrays(encuestas, mixArrays(ciencias, mixArrays(freeducks, mixArrays(programadores, recursos)))));

    let deleteMembers = [];
    difusion.forEach(e => {
        if (!total.includes(e)) {
            deleteMembers.push(e);
        }
    });

    if (deleteMembers.length != 0) {
        await client.removeParticipant('120363025112889144@g.us', arrayContent(deleteMembers, difusion));
    }
}

command.debug = async (client, msg) => {
    const difusion = mixArrays(await client.getGroupMembersIds('120363025112889144@g.us'), []); //120363025112889144@g.us // 120363044060747688

    //miembros de los grupos, mixArrays junta dos arrays, en este caso solo se usa el metodo para convertir los id en id _serialized
    const linux = mixArrays(await client.getGroupMembersIds('120363044898890124@g.us'), []);
    const encuestas = mixArrays(await client.getGroupMembersIds('120363046164979695@g.us'), []);
    const ciencias = mixArrays(await client.getGroupMembersIds('573204777967-1634736386@g.us'), []);
    const freeducks = mixArrays(await client.getGroupMembersIds('120363044025465891@g.us'), []);
    const tareas = mixArrays(await client.getGroupMembersIds('120363166998143690@g.us'), []);
    const programadores = mixArrays(await client.getGroupMembersIds('573204777967-1633823575@g.us'), []);

    const total = mixArrays(linux, mixArrays(encuestas, mixArrays(ciencias, mixArrays(freeducks, mixArrays(programadores, tareas))))); //miembros en total de la comunidad de los grupos anteriores.

    let deleteMembers = [];
    total.forEach(e => {
        if (!difusion.includes(e)) {
            deleteMembers.push(e);
        }
    });

    //Eliminar los numeros de deleteMembers de cada grupo, arrayContent: verifica si el numero esta en el grupo o no, si esta lo puede banear si no lo agrega al baneo porque no esta en el grupo para ser baneado.
    if (deleteMembers.length != 0) {
        await client.removeParticipant('120363044898890124@g.us', arrayContent(deleteMembers, linux));
        await client.removeParticipant('120363046164979695@g.us', arrayContent(deleteMembers, encuestas));
        await client.removeParticipant('573204777967-1634736386@g.us', arrayContent(deleteMembers, ciencias));
        await client.removeParticipant('120363044025465891@g.us', arrayContent(deleteMembers, freeducks));
        await client.removeParticipant('573204777967-1633823575@g.us', arrayContent(deleteMembers, programadores));
    }
}

command.banTotal = async (client, msg) => {
    try {
        const ids = await client.getGroupMembersIds(msg.chatId); //Obtiene todos los integrantes del grupo donde fue escrito el comando.
        let idsBan = [];
        ids.forEach(async e => {
            if (e._serialized != "573028353043@c.us") { //Verifica que no sea el numero del bot. NOTA cambiar si usa otro numero.
                idsBan.push(e._serialized); //se agrega el numero en formato _serialized a los id para banear.
            }
        });
        await client.removeParticipant(msg.chatId, idsBan); //banea los id del grupo donde se escribio el comando y banea a todos los numeros con formato _serialized de la variable idsBan
    } catch (e) {
        command.addLogError(e);
    }
}

function mixArrays(arr1, arr2) {
    const serializedSet = new Set();

    // Agregar _serialized de arr1 al conjunto
    arr1.forEach(obj => {
        if (obj._serialized) {
            serializedSet.add(obj._serialized);
        } else {
            serializedSet.add(obj);
        }
    });

    // Agregar _serialized de arr2 al conjunto
    arr2.forEach(obj => {
        if (obj._serialized) {
            serializedSet.add(obj._serialized);
        } else {
            serializedSet.add(obj);
        }
    });

    // Convertir el conjunto nuevamente a un array
    const result = Array.from(serializedSet);

    return result;
}

function arrayContent(arr1, arr2) {
    let temp = [];
    arr1.forEach(e => {
        if (arr2.includes(e)) { //verificar si esta.
            temp.push(e);
        }
    });
    return temp;
}

module.exports = command;