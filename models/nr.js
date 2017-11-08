
/*var pg = require('pg');2

 // create a config to configure both pooling behavior
 // and client options
 // note: all config is optional and the environment variables
 // will be read if the config is not present
 var config = {
 URL: process.env.DATABASE_URL,
 host:process.env.host,
 user: process.env.user, //env var: PGUSER
 database: process.env.database, //env var: PGDATABASE
 password: process.env.password, //env var: PGPASSWORD
 port: 5432, //env var: PGPORT
 max: 10, // max number of clients in the pool
 idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
 };


 //this initializes a connection pool
 //it will keep idle connections open for a 30 seconds
 //and set a limit of maximum 10 idle clients
 var pool = new pg.Pool(config);*/
var pg = require('pg');

// instantiate a new client
// the client will read connection information from
// the same environment variables used by postgres cli tools
var client = new pg.Client(process.env.DATABASE_URL);
client.connect(function (err, client, done) {
    if (err) {
        console.log('error fetching client from pool', err);

    }
    else {
        client.query('CREATE TABLE IF NOT EXISTS Glitch(id SERIAL PRIMARY KEY,idImage INT, text VARCHAR(40) not null)',
            function (err, result) {
                //call `done()` to release the client back to the pool

                if (err) {
                    return console.error('error running query', err);
                }
                client.query('CREATE TABLE IF NOT EXISTS Image(id SERIAL PRIMARY KEY,fileName VARCHAR(140), text VARCHAR(40) not null,times int,completed boolean)',
                    function (err, result) {
                        //call `done()` to release the client back to the pool


                        if (err) {
                            return console.error('error running query', err);
                        }
                        console.log('success');
                        //output: 1
                    });
                //output: 1
            });
    }
});
// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
var connection = function (callback) {
    /*client.connect(function (err, client, done) {
     if (err) {
     console.log('error fetching client from pool', err);
     return callback(err, null);
     }
     else{*/
    return callback(null, client);
    /*}
     client.query('CREATE TABLE itemw(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function (err, result) {
     //call `done()` to release the client back to the pool
     done();

     if (err) {
     return console.error('error running query', err);
     }
     console.log('success');
     //output: 1
     });
     });*/
};
client.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
});

module.exports = connection;