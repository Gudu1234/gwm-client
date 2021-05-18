import feathers from '@feathersjs/feathers';
import auth from '@feathersjs/authentication-client';
import { CookieStorage } from 'cookie-storage';
import rest from '@feathersjs/rest-client';
import Axios from 'axios';

export const cookieStorage = new CookieStorage();

const restClient = rest('http://localhost:3030');

const serverClient = rest('https://gwm-backend.herokuapp.com');

const app = feathers();

// app.configure(restClient.axios(Axios));

app.configure(serverClient.axios(Axios));

app.configure(auth({
    path: '/authentication',
    cookie: 'feathers-jwt',
    storageKey: 'feathers-jwt',
    storage: cookieStorage
}));

export default app;
