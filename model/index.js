const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host : '127.0.0.1',
        port : 5008,
        user : 'docker',
        password : 'secret',
        database : 'wopr'
    }
});