import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

const jwt_password = "something";

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

app.listen(3001);