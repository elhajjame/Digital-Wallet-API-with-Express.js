// import fs from "fs/promises";
import fs, { writeFile } from 'fs'

import path from "path";

const filePath = path.resolve("data/users.json");
// read users:
const users = JSON.parse(fs.readFileSync(`./data/users.json`, 'utf-8'));
console.log(users);
// CREATE USER
const createUser = (req, res) => {

    const { name, email, phone } = req.body;

    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        email,
        phone,
    };

    users.push(newUser);

    fs.writeFile('./data/users.json', JSON.stringify(users), err => {
        res.status(200).json({
            status: "success",
            data: {
                user: newUser
            }
        });
    });
};

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: "success",
        result: users.length,
        data: {
            users
        }
    })
}

const getUsersById = (req, res) => {
    const id = req.params.id;
    const user = users.find(u => u.id == id);

    if (!user) {
        return res.status(404).json({
            status: "fail",
            message: "cannot find user"
        });
    };

    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
};

export { createUser, getAllUsers, getUsersById };