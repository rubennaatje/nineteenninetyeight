/**
 * Created by ruben on 19/10/2016.
 */
var fs = require( 'fs' );
var path = require( 'path' );

var Glitch = function () {
};

/* nog fixen */
Glitch.saveImage = function (output,callback) {
    var input = output;
    var image = fs.readFileSync( path.resolve(process.cwd()+ '/public/images/', input ) );
    var currentdate = new Date();
    var datetime = currentdate.getDate()
        + (currentdate.getMonth()+1)
        + currentdate.getFullYear()
        + currentdate.getHours();
    fs.writeFileSync( path.resolve( process.cwd()+ '/public/images/done',datetime + '.jpg'  ), image );
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
                // console.log( 'Continuous!' );
                plaats = plaats++;
            } else {
                // console.log( 'Continuity broken' );
                plaats = Math.floor(Math.random() * (max - min + 1)) + min;
            }
        } else {
            plaats = Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

    var currentdate = new Date();
    var datetime =  currentdate.getHours() +':'+currentdate.getMinutes();
    fs.writeFileSync( path.resolve( process.cwd()+ '/public/images/', output ), image );
    console.log( 'Replaced ' + aantalbytes + ' byte(s) with trash and exported to ' + output + '. at' +datetime  );
    return callback(null,output);
};

module.exports = Glitch;