'use strict';

require('./database').db;
const Hapi = require('hapi');
const configRoute = require('./route-config');
const handlers = require('./handlers');
const userinfo = require('./model').UserInfo;

const mHandlers = new handlers.default();
const server = new Hapi.Server();

server.connection({
    port: 3000,
    host: 'localhost'
});

server.start((err) => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        userinfo.find({}, function (err, user) {
            if (!err) {
                reply(user);
            } else {
                reply("error");
            }
        });
    }
});

server.route([{
    method: 'GET',
    path: '/api/userinfo/{name}',
    config: configRoute.reponseUserInfo,
    handler: mHandlers.getUserInfo
}, {
    method: 'POST',
    path: '/api/userinfo/{name}',
    config: configRoute.reponseUserInfo,
    handler: mHandlers.getUserInfo
}, {
    method: 'DELETE',
    path: '/api/userinfo/{name}',
    config: configRoute.reponseUserInfo,
    handler: mHandlers.getUserInfo
}, {
    method: 'PUT',
    path: '/api/userinfo/{name}',
    config: configRoute.reponseUserInfo,
    handler: mHandlers.getUserInfo
}]);