import app from './index';

export const authenticate = (email, password) => app.authenticate({
    strategy: 'local',
    email,
    password
}, {
    query: {
        '$populate': 'zone'
    }
});

export const logout = app.logout;
