/*//Initialize database
var db = null;

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'my.db',
    location: 'default',

    //Generic database Insert
    function (add1,add2,add3,add4,add5){
      db.transaction(function(tx, res) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS MBdietplan (activity, meal, calories, , notes, datetime)');
            tx.executeSql('INSERT INTO MBdietplan VALUES (?,?,?,?,?)', ['Morning breakfast', 'Breakfast', 250, 'bagel and coffee', 1704180758]);
            tx.executeSql('INSERT INTO MBdietplan VALUES (?,?,?,?,?)', ['Lunch with Jack', 'Lunch', 410, 'smoked salmon with ratatouille veg', 1704181236]);
        }, function(error) {
          console.log('Transaction ERROR: ' + error.message);
        }, function() {
          console.log('Populated database OK');
        });
    }
  });
});

function add(){
    var add1 = document.getElementById("activity").value;
    var add2 = document.getElementById("meal").value;
    var add3 = document.getElementById("calories").value;
    var add4 = document.getElementById("notes").value;
    var add5 = document.getElementById("timedate").value;


    if(add1 == "")
    {
        alert("Please enter a activity name!");
        return;
    }

    if(add3 == "")
    {
        alert("Please fill in calories, cannot be blank");
        return;
    }

    if(add5 == "")
    {
        alert("Please select a time & date");
        return;
    }

    (function (add1,add2,add3,add4,add5){
    db.transaction(function(tx) {
        tx.executeSql("INSERT INTO MBdietplan (activity, meal, calories, notes, datetime) VALUES (?,?,?,?,?)", [add1, add2, add3, add4, add5], function(tx,res){
            alert("added successfully!");
        });
    }, function(err){
        alert("An error occured while saving");
    });
});
};

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'my.db',
    location: 'default',

    //Generic database Insert
    function (jb1,jb2,jb3,jb4,jb5) {
      db.sqlBatch([
            'CREATE TABLE MBdietplan (Activity, Meal, Calories, DateTime, Notes)'],
            ['INSERT INTO MBdietplan VALUES (?,?,?,?,?)', ['Morning breakfast', 'Breakfast', 250, 1704180758, 'bagel and coffee']],
            ['INSERT INTO MBdietplan VALUES (?,?,?,?,?)', ['Lunch with Jack', 'Lunch', 410, 1704181236, 'smoked salmon with ratatouille veg']],
        ], function() {
          console.log('Populated database OK');
        }, function(error) {
          console.log('SQL batch ERROR: ' + error.message);
        });
      });
    });

//Add items to the database (call addItem)
function addItem(Activity, Meal, Calories, DateTime, Notes) {

    db.transaction(function (tx) {

        var query = "INSERT INTO MBdietplan (Activity, Meal, Calories, DateTime, Notes) VALUES (?,?,?,?,?)";

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
//Close database connection
function closeDB() {
    db.close(function () {
        console.log("DB closed!");
    }, function (error) {
        console.log("Error closing DB:" + error.message);
    });
}
*/
