import app from './index';

export const authenticate = (username, password) => app.authenticate({
    strategy: 'local',
    username,
    password
});

export const logout = app.logout;
