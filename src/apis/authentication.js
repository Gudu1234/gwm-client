import app from './index';

export const authenticate = (username, password) => app.authenticate({
    strategy: 'username',
    username,
    password
});

export const logout = app.logout;
