const { UserModel } = require('../model/userModel');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.getUserById(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role, username, age } = req.body;
        const user = await UserModel.updateUser(id, name, email, password, role, username, age);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.deleteUser(id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await UserModel.getAllAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser, getAllAdmins };