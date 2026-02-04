const { AuthModel } = require("../model/authModel");

const registerUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing' });
        }

        const { name, email, username, password, role, age } = req.body;
        const user = await AuthModel.registerUser(name, email, username, password, role, age);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Request body is missing' });
        }

        const { email, password } = req.body;
        const user = await AuthModel.loginUser(email, password);
        res.json(user);
    } catch (error) {
        if (error.message === "Cannot coerce the result to a single JSON object") {
            return res.status(404).json({ error: 'Incorrect password or inexistent user.' });
        }
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
}