const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send("Error registering new user.");
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { username: req.body.username } });
        if (!user) {
            return res.status(404).send('User not found');
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ message: "Login successful", token: token });
            await user.update({
                lastLogin: new Date() // Set lastLogin to the current date and time
            });
        } else {
            res.status(401).send("Password is incorrect");
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send("Error logging in user.");
    }
};