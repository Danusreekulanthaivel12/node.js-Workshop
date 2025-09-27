const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getUser = async (username) => {
    return await User.findOne({ username })
}

const addUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    const user = new User(userData);
    return await user.save();
}

const loginUser = async (user, password) => {
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        return null;
    }
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '30m'});
    return token;
}

module.exports = { getUser, addUser, loginUser };