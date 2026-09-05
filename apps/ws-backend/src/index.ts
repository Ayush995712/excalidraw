import { WebSocketServer, WebSocket } from "ws";
import { connectDb, db } from "@repo/db/client";
import "dotenv/config"
import { checkAuth, extractToken } from "./middleware";

const wss = new WebSocketServer({port: 8080});
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("jwtSecret is not configured");
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

    const token = extractToken(request.headers.authorization);
    if (!token) { 
        socket.close(1008, "Unauthorized");
        return;
    };

    const { valid, userId } = checkAuth(token, jwtSecret);
    if (!valid || !userId) {
        socket.close(1008, "Unauthorized");
        return;
    };

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

async function joinRoom (roomId: string, ws: WebSocket) {
    let room = rooms.find((room) => room.roomId === roomId);
    if (!room) {
        return;
    };

    try {
        room.clients.push(ws);
        
        return;
    } catch (e) {
        
    }
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