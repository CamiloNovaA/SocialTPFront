const bcrypt = require('bcryptjs');

const encrypt = async (textplain) => {
    const hash = await bcrypt.hash(textplain, 10);
    return hash;
}

const compare = async (textplain, hashpasswrod) => {
    return await bcrypt.compare(textplain, hashpasswrod);
}

module.exports = { encrypt, compare }