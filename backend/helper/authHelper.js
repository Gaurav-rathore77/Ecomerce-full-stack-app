const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.log(error);
    }
};
const comparePassword = async (password, hashPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashPassword);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
};

module.exports = { hashPassword, comparePassword };