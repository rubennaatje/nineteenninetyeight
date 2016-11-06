
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
