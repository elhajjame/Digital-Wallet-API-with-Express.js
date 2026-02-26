import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("data/users.json");

// Helper function → read users
export const readUsers = async () => {
    const data = await fs.readFile(filePath, "utf-8");
    if (!data || data.trim() == ''){
        return []
    }
        return JSON.parse(data);
};

// Helper function → write users
const writeUsers = async (users) => {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
};

// CREATE USER
const createUser = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;

        const users = await readUsers();

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name,
            email,
            phone,
        };

        users.push(newUser);

        await writeUsers(users);

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// GET ALL USERS
const getUsers = async (req, res, next) => {
    try {
        const users = await readUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// GET USER BY ID
const getUsersById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const users = await readUsers();
        const user = users.find(u => u.id == req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

export { createUser, getUsers, getUsersById };