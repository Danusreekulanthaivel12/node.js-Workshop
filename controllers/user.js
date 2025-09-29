
const userServices = require('../services/user');

const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await userServices.getUser(username);
        if (user) {
            return res.status(400).send({ message: 'User already exists' });
        }
        const newUser = await userServices.addUser({ email, username, password });
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.log('Error adding user:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: 'Username and password are required' });
        }
        const user = await userServices.getUser(username);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        const token = await userServices.loginUser(user, password);
        token ? res.status(200).send({ message: 'Login successful', token }) : res.status(401).send({ message: 'Invalid password' })
    } catch (error) {
        console.log('Error logging in user:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser }