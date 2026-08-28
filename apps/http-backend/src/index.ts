import express, { response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { SigninSchema } from "@repo/common/types";

const app = express();
app.use(express.json());

const jwt_password = process.env.JWT_PASSWORD;
if (!jwt_password) {
    throw new Error("JWT_PASSWORD is not configured");
}

type User = {
    username: string,
    password: string
};

let users: User[] = [];

app.post("/api/signup", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({
            msg: "username and password required"
        });
    }
    for(const user of users) {
        if(user === username) {
            return res.json({
                msg: "Username already taken"
            })
        }
    }
    users.push({username, password});
    return res.json({
        msg: "user created"
    });
});

app.post("/api/signin", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password ) {
        return res.json({
            "msg": "username and password are required"
        });
    };

    const existing_user = users.find((user) => user.username === username && user.password === password);
    
    if(existing_user) {
        const token = jwt.sign({
            name: existing_user.username
        }, jwt_password);

        res.json({
            token
        });

    } else {
        res.json({
            "msg": "credentials are not valid"
        });
    };
})

app.post("/create-room", async (req, res) => {
    const type = req.body.type;
    const roomId = req.body.roomId;

    await fetch("http://localhost:8080/create-room", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type, roomId
        })
    })
    
})

app.post("/share-message", async (req, res) => {
    const { type, roomId, msg } = req.body;

    await fetch("http://localhost:8080/share-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            type, roomId, msg
        })
    })
    
})

app.listen(3001);