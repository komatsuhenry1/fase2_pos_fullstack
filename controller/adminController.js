const Admin = require('../model/admin');


exports.createPost = async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const user = new User({ name, email, age });
        await user.save();
        res.redirect('/users');
    } catch (err) {
        res.status(500).send(err);
    }
};