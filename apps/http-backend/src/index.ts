import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { connectDb, db } from "@repo/db/client";
import { SigninSchema, CreateUserSchema, CreateRoomSchema } from "@repo/common/types";
import { userMiddleware } from "./middleware";

const saltRounds = 10;
const app = express();
app.use(express.json());

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("jwtSecret is not configured");
}

app.post("/api/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            error: parsedData.error.issues
        })
    }

    const { email, password, name } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await db.orm.public.User.where({email}).first();
    if (existingUser) {
        return res.json({
            msg: "email already exists"
        })
    }

    try {
        await db.orm.public.User.create({email, password: hashedPassword, name})
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
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            error: parsedData.error.issues
        })
    };

    const { email, password } = parsedData.data;

    try {
        const existingUser = await db.orm.public.User.where({email}).first();
        const hashToCheck = existingUser?.password;
        const isValid = bcrypt.compare(password, hashToCheck as string);
    
        if (!existingUser || !isValid) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: existingUser.id }, jwtSecret, { expiresIn: "7d" }
        );
        return res.json({ token });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ msg: "Something went wrong" });
    }
})

app.post("/create-room", userMiddleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({
            error: parsedData.error.issues
        })
    };
    const userId = req.userId;

    try {
        const room = await db.orm.public.Room.create({
            slug: parsedData.data?.name, adminId: userId
        });
        return res.status(200).json({
            msg: "Room created"
        })
    } catch (err) {
        return res.json({ err });
    }
    
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