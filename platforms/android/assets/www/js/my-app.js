// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

//Initialize database
var db = null;

document.addEventListener('deviceready', function() {
  db = window.sqlitePlugin.openDatabase({
    name: 'my.db',
    location: 'default',

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

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}
