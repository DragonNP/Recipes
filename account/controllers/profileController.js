const user = require('../../models/user');
const path = require('path');
const pug = require('pug');

exports.myProfile = function (request, response) {
    const current_user = user.getUsers().find(o => o.id === request.cookies.id);

    if (current_user === undefined)
        return response.render('error',{
            smg: 'You are not login',
            path1: 'login',
            path2: 'register'
        });

    pug.renderFile(
        path.join(__dirname, '..\\views\\', 'myProfile.pug'),
        {
            name: current_user.name,
            email: current_user.email,
            password: current_user.password
        },
        function (err, data) {
            if (err !== null) {
                response.sendStatus(500);
                return console.log(err);
            }
            return response.send(data)
        })
};