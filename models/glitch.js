/**
 * Created by ruben on 19/10/2016.
 */
var fs = require( 'fs' );
var path = require( 'path' );
var db = require('../models/database.js');

var Glitch = function () {
};

/* nog fixen */
Glitch.saveImage = function (callback) {
    var image = fs.readFileSync( path.resolve(process.cwd()+ '/public/images/', 'xd.jpg' ) );
    var currentdate = new Date();
    var datetime = currentdate.getDate()
        + (currentdate.getMonth()+1)
        + currentdate.getFullYear()
        + currentdate.getHours()+currentdate.getMinutes();
    db(function (err, conn) {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        else {
            conn.query("INSERT INTO Glitch(id ,idimage, text) values(nextval('Glitch_id_seq'::regclass),1,'" + datetime + ".jpg');"
                , function (err, result) {

                    if (err) {
                        return callback(err, null);
                    }
                    else {
                        fs.writeFileSync(path.resolve(process.cwd() + '/public/images/done', datetime + '.jpg'), image);
                        return callback(null, true);
                    }
                });
        }
    });

};
Glitch.newGlitch = function (filename, callback) {
    var image = fs.readFileSync( path.resolve(process.cwd()+ '/public/images/new/', filename+".jpg" ) );
    db(function (err, conn) {
        if (err) {
            return callback(err,null);
        }
        else {
            conn.query("INSERT INTO Image(id ,fileName, text ,times,completed) values(nextval('Image_id_seq'::regclass),'"+filename+".jpg' ,'stolen from instagram',0,false);"
                , function (err, result) {

                    if (err) {
                        return callback(err,null);
                    }
                    else {
                        console.log('success2');


                        fs.writeFileSync( path.resolve( process.cwd()+ '/public/images/', 'xd.jpg' ), image );
                        Glitch.saveImage( function (err, callback2) { console.log('suc2cess');
                            if (err) {
                                return callback(err,null);
                            } else {
                                return callback(null, true);
                            }
                        });

                    }
                    //output: 1
                });
        }
    });
};
Glitch.destroyByte = function (opeenvolgend,aantalbytes,min,max,output, callback) {
    var input = output;

    var image = fs.readFileSync( path.resolve(process.cwd()+ '/public/images/', input ) );
    var iLength = image.length;
    min = Math.floor(iLength * min);
    max = Math.floor(iLength * max);

    var plaats = Math.floor(Math.random() * (max - min + 1)) + min;
    for(var i = 0; i < aantalbytes; i++){
        image[ plaats ] = Math.floor(Math.random() * (0 - 511 + 1) + 1);
        if ( opeenvolgend ) {
            if ( 0.8 > Math.random() && ( plaats + 1 <= max ) ) {
                plaats = plaats++;
            }
            else {
                plaats = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }
        else {
            plaats = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    var currentdate = new Date();
    var datetime =  currentdate.getHours() +':'+currentdate.getMinutes();
    fs.writeFileSync( path.resolve( process.cwd()+ '/public/images/', output ), image );
    console.log( 'Replaced ' + aantalbytes + ' byte(s) with trash and exported to ' + output + '. at' +datetime  );
    return callback(null,output);
};
Glitch.getAllGlitches = function (callback) {
    db(function (err, conn) {
        if (err) {
            return callback(err,null);
        }

        else {
            console.log('test2');
            conn.query("SELECT * from Glitch order by id DESC"
                , function (err, result) {

                    if (err) {
                        return callback(err,null);
                    }
                    console.log('success');
                    return callback(null, result);
                    //output: 1
                });
        }
    });
};

module.exports = Glitch;