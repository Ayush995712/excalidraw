import { WebSocketServer, WebSocket } from "ws";
import { connectDb, db } from "@repo/db/client";
import jwt from "jsonwebtoken";

const wss = new WebSocketServer({port: 8080});
const jwt_password = process.env.JWT_PASSWORD;
if (!jwt_password) {
    throw new Error("JWT_PASSWORD is not configured");
}

async function main() {
    await connectDb();
}

main();

type Room = {
    roomId: string;
    clients: WebSocket[];
}

const rooms: Room[] = [];

wss.on('connection', function connection(socket, request) {

    let header = request.headers.authorization;

    if (!header?.startsWith("Bearer")) {
        return "Unauthorized";
    };
    const token = header.split("")[1];
    if (!token) { return "Unauthorized" };
    let decoded = jwt.verify(header as string, token);

    socket.on('message', (message) => {
        const data = JSON.parse(message.toString());

        if (data.type === "join" ) {
            joinRoom(data.roomId, socket);
        }

        if (data.type === "chat") {
            chatRoom(data.roomId, socket, data.msg);
        }

    });
    
    socket.on('close', () => {
        removeClient(socket);
    })

});

function joinRoom (roomId: string, ws: WebSocket) {
    let room = rooms.find((room) => room.roomId === roomId);

    if (!room) {
        room = { roomId, clients: []};
        rooms.push(room);
    }
    room.clients.push(ws);
};

function chatRoom (roomId: string, ws: WebSocket, message: string) {
    let room = rooms.find((room) => room.roomId === roomId);

    if (!room) {
        return;
    };

    for (const client of room.clients) {
        if (client !== ws && client.readyState == WebSocket.OPEN) {
            client.send(message);
        };
    };

};

function removeClient (ws: WebSocket) {
    for (const room of rooms) {
        room.clients = room.clients.filter(
            (client) => client != ws 
        )
    };
};