var div = document.querySelector('#content');



var mysql = require('mysql');
      var connection = mysql.createConnection({
          host     : 'localhost',
          user     : 'root',
          password : '',
          database : 'steam'
      });

      connection.connect();

      connection.query('SELECT * FROM customers', function(err, rows, fields) {
               if (!err)
              div.innerHTML = rows.toString();
          else
              console.log('Error while performing Query.');
          console.log(err);
      });

