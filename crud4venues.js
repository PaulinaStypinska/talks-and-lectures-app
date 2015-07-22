var http = require('http');
var pg = require('pg');
var conString = "postgres://postgres:paulina@localhost/mydb";


exports.create = function (tableName, columnsAsArray) {
    var input = columnsAsArray.join(',');
    var q = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + input + ' )';
    var client = new pg.Client(conString);
    client.connect();

    client.query(q, function(err, result) {

      if(err) {
          console.log('error when creating the table');
          return;
      }
        console.log('table was created');
        client.end();
    });
};

exports.update = function (tableName, columnArray, valueArray){
    if (columnArray.length == valueArray.length) {
    var q = 'INSERT INTO' + tableName + '(' + columnArray.join(',') + ') VALUES (' + getVal(columnArray) + ')';
    var client = new pg.Client(conString);
    client.connect();

    client.query(q,valueArray, function(err, result) {

      if(err) {
          console.log('error when updating the table');
          return;
      }
        console.log('table was updated');
        client.end();
    });
    }
    else console.log ('There need to be as many columns as values to be input');

};

function getVal (arr){
    var res = [],
        inp = '';
for (var i = 1; i < arr.length;i++){
inp = '$' + i;
    res.push(inp);
}
    res.join(',');
    return res;
}



exports.retrieve = function (tableName){
    var client = new pg.Client(conString);
    client.connect();
    var q = 'SELECT * FROM ' + tableName;
    
    client.query(q, function (err, result){
    
        if (err){
        console.log('impossible to retrieve the ' + tableName);
        return;
        }
    console.log(JSON.stringify(result.rows, null, "    "));
        client.end();

    })
};

exports.drop = function (tableName) {
    var client = new pg.Client(conString);
    client.connect();
    var q = "DROP TABLE " + tableName;

    client.query(q, function(err, result) {

      if(err) {
          console.log('error when dropping the table');
          return;
      }
           console.log('table ' + tableName + ' was deleted.');
                 client.end();  
    });
};
