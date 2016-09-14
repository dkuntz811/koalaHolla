var express = require( 'express' );
var app = express();
var path = require( 'path' );
var bodyParser= require( 'body-parser' );
var urlencodedParser = bodyParser.urlencoded( {extended: false } );
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/KoalaHolla';
var port = process.env.PORT || 8080;
// static folder
app.use( express.static( 'public' ) );

// spin up server
app.listen( port, function(req,res){
  console.log( 'server up on', port );
});//end app. listen


// base url
app.get( '/', function( req, res ){
  console.log( 'base url hit' );
  res.sendFile( 'index.html' );
});

// get koalas
app.get( '/getKoalas', function( req, res ){
  console.log( 'getKoalas route hit' );
  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }
    else{
      console.log('Connected to DB!');
      //array to hold results
      var resultArray = [];
      //query call to database table
      var queryResults = client.query('SELECT * FROM koalas');
      queryResults.on('row', function(row){
        //runs for each row in the query result array
        resultArray.push(row);
        console.log(resultArray);
      });//end query results on row
      queryResults.on('end', function(){
        //where done
        done();
        return res.json(resultArray);
      });//end query results on end
    }//end if
  });// end pg connect
});//end app.get

// add koala
app.post( '/addKoala', urlencodedParser, function( req, res ){
  console.log( 'addKoala route hit' );
  pg.connect(connectionString, function(err,client,done){
    if (err) {
      console.log(err);
    }else {
      console.log('connect to DB for new koala ');
      client.query('INSERT INTO koalas (name,sex, age,ready_transfer,notes) '+ 'VALUES ($1, $2, $3, $4, $5)',
      [req.body.name, req.body.sex, req.body.age, req.body.readyForTransfer, req.body.notes],
        done());
    }//else
  });
});

  // //assemble object to send
  // var objectToSend={
  //   response: 'from addKoala route'
  // }; //end objectToSend
  // //send info back to client
  // res.send( objectToSend );


// add koala
app.put( '/editKoala', urlencodedParser, function( req, res ){
  console.log( 'editKoala route hit' );
//   //assemble object to send
//   pg.connect(connectionString, function(err,client,done){
//     if (err) {
//       console.log(err);
//     }else {
//       console.log('connect to DB for edited koala ');
//       client.query('UPDATE koalas SET name,sex, age,ready_transfer,notes ',
//       [req.body.name, req.body.sex, req.body.age, req.body.readyForTransfer, req.body.notes],
//         done());
//     }//else
//   });
// });
