//Initialize database
var db = null;

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'my.db',
    location: 'default',
  });
});

//Generic database Insert
  db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS MBdietplan (Activity, Meal, Calories, DateTime, Notes)');
      tx.executeSql('INSERT INTO MBdietplan VALUES (?,?,?,?,?)', ['Morning breakfast', 'Breakfast', 250, 1704180758, 'bagel and coffee']);
      tx.executeSql('INSERT INTO MBdietplan VALUES (?,?,?,?,?)', ['Lunch with Jack', 'Lunch', 410, 1704181236, 'smoked salmon with ratatouille veg']);
  }, function(error) {
    console.log('Transaction ERROR: ' + error.message);
  }, function() {
    console.log('Populated database OK');
  });

//Add items to the database (call addItem)
function addItem(Activity, Meal, Calories, DateTime, Notes) {

    db.transaction(function (tx) {

        var query = "INSERT INTO MBdietplan (Activity, Meal, Calories, DateTime, Notes) VALUES (?,?,?)";

        tx.executeSql(query, [Activity, Meal, Calories, DateTime, Notes], function(tx, res) {
            console.log("insertId: " + res.insertId + " -- probably 1");
            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
        },
        function(tx, error) {
            console.log('INSERT error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });
}

//gets the data from the database getData
/*
function getData(last) {

    db.transaction(function (tx) {

        var query = "SELECT * FROM MBdietplan;

        tx.executeSql(query, [*], function (tx, resultSet) {

            for(var x = 0; x < resultSet.rows.length; x++) {
                console.log("First name: " + resultSet.rows.item(x).firstname +
                    ", Acct: " + resultSet.rows.item(x).acctNo);
            }
        },
        function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
}
*/


function updateItem(first, id) {
    // UPDATE Cars SET Name='Skoda Octavia' WHERE Id=3;
    db.transaction(function (tx) {

        var query = "UPDATE MBdietplan WHERE acctNo = ?";

        tx.executeSql(query, [first, id], function(tx, res) {
            console.log("insertId: " + res.insertId);
            console.log("rowsAffected: " + res.rowsAffected);
        },
        function(tx, error) {
            console.log('UPDATE error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });
}


function closeDB() {
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}