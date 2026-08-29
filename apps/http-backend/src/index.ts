import express, { response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { SigninSchema } from "@repo/common/types";
import { connectDb, db } from "@repo/db/client";

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

app.post("/api/signup", async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.json({
            msg: "email, name and password required"
        });
    }

    const existing_user = await db.orm.public.User.where({email: email}).first();
    if (existing_user) {
        return res.json({
            msg: "email already exists"
        })
    }

    try {
        await db.orm.public.User.create({email, password, name})
        return res.json({
            msg: "user created"
        })
    } catch (error) {
       return res.json({
        error
       }) 
    }
});

app.post("/api/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) {
        return res.json({
            "msg": "email and password are required"
        });
    };

    const existing_user = await db.orm.public.User.where({email, password}).first();
    
    if(existing_user) {
        const token = jwt.sign({
            id: existing_user.id
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

async function main() {
  await connectDb();

  app.listen(3001);
}

main();