const api = require('../../api');

module.exports = {
    getRegistration,
    postRegistration,

    getLogin,
    postLogin
};

function getRegistration(request, response, next) {
    response.sendPugFile(__dirname, 'registration',
        {
            title: request.getText('Registration'),
            myProfile: request.getText('My Profile'),
            newRecipes: request.getText('New Recipes'),
            myRecipes: request.getText('My Recipes'),
            username: request.getText('Username'),
            firstName: request.getText('First Name'),
            lastName: request.getText('Last Name'),
            email: request.getText('Email'),
            password: request.getText('Password'),
            singUp: request.getText('Sing Up'),
            orYouHaveAccount: request.getText('Or you have account')
        });
}

function getLogin(request, response, next) {
    response.sendPugFile(__dirname, 'login', {
        title: request.getText('Login'),
        myProfile: request.getText('My Profile'),
        newRecipes: request.getText('New Recipes'),
        myRecipes: request.getText('My Recipes'),
        email: request.getText('Email'),
        password: request.getText('Password'),
        signIn: request.getText('Sign In'),
        orYouNotHaveAccount: request.getText('Or you not have account'),
    });
}

function postRegistration(request, response, next) {
    const body = request.body;
    // const
}

function postLogin(request, response, next) {

}