const crypto = require("crypto");

let user = [{
    name: 'root',
    email: 'root@toor',
    password: 'toor',
    id: '1'
}];

exports.addUser = function (name, email, password) {

    if (user.find(o => o.email === email) ||
        user.find(o => o.name === name)) {
        return 'Email or Name is exits'
    }
    const id = crypto.randomBytes(16).toString("hex");

    user.push({
        name: name,
        email: email,
        password: password,
        id: id
    });
    return undefined
};

exports.getUsers = function () {
    return user
};