const profileRouter = require('./routes/profileRouter');
const userRouter = require('./routes/userRouter');
const user = require('./models/user');

exports.user = userRouter;
exports.profile = profileRouter;
exports.getUser = function () {
    return user.getUsers()
};