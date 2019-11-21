const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const ApiStore = require('../services/apiStore');
const apiStore = ApiStore.getInstance();

passport.use(
    new localStrategy({usernameField: 'username', passwordField: 'password'},
    (username, password, done) => {
        //When using a database, we actually verify if the account does exist and the password is correct here
        let authResult = apiStore.authenticate(username, password);
        return done(null, authResult);        
    })
)
