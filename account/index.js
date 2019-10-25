const profileRouter = require('./routes/profileRouter');
const userRouter = require('./routes/userRouter');
const user = require('./models/user');

exports.profile = profileRouter;
exports.user = userRouter;
exports.getUser = function () {
    return user
};