import { WebSocketServer, WebSocket } from "ws";
import { db } from "@repo/db/client";
import "dotenv/config"
import { checkAuth, extractToken } from "./middleware";

const wss = new WebSocketServer({port: 8080});
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("jwtSecret is not configured");
}

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
            joinRoom(data.roomId, socket, userId);
        }

        if (data.type === "chat") {
            chatRoom(data.roomId, socket, data.msg);
        }

    });
    
    socket.on('close', () => {
        removeClient(socket);
    })

});

async function joinRoom (roomId: string, ws: WebSocket, userId: string) {
    let room = rooms.find((room) => room.roomId === roomId);
    if (!room) {
        const dbRoom = await db.Room.find({slug: roomId});
        if (!dbRoom) {
            ws.close(1008, "Room not found");
            return;
        };
        room = {roomId, clients: []};
        rooms.push(room);
    };

    room.clients.push(ws);

    try {
        const dbRoom = await db.Room.find({ slug: roomId});
        if (!dbRoom) {
            ws.close(1008, "Room not found");
            return;
        };
        await db.roomMember.upsert({
            update: {},
            create: { roomId: dbRoom.id, userId }
        });
        return;
    } catch (e) {
        console.error("Failed to persist room membership:", e);
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