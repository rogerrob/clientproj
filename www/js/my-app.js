// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

//creating initial database
var db;
var databaseName = 'MBdiet';
var databaseVersion = 1;
var openRequest = window.indexedDB.open(databaseName, databaseVersion);
openRequest.onerror = function (event) {
    console.log(openRequest.errorCode);
};
openRequest.onsuccess = function (event) {
    // Database is open and initialized - we're good to proceed.
    db = openRequest.result;
};
openRequest.onupgradeneeded = function (event) {
    // This is either a newly created database, or a new version number
    // has been submitted to the open() call.
    var db = event.target.result;
    db.onerror = function () {
        console.log(db.errorCode);
    };

    // Create an object store and indexes. A key is a data value used to organize
    // and retrieve values in the object store. The keyPath option identifies where
    // the key is stored. If a key path is specified, the store can only contain
    // JavaScript objects, and each object stored must have a property with the
    // same name as the key path (unless the autoIncrement option is true).
    var store = db.createObjectStore('dietplan', { keyPath: 'timedate' });

    // Define the indexes we want to use. Objects we add to the store don't need
    // to contain these properties, but they will only appear in the specified
    // index of they do.
    //
    // syntax: store.createIndex(indexName, keyPath[, parameters]);
    //
    // All these values could have duplicates, so set unique to false
    store.createIndex('activity', 'activity', { unique: false });
    store.createIndex('calories', 'calories', { unique: false });
    store.createIndex('meal', 'meal', { unique: false });
    store.createIndex('notes', 'notes', { unique: false });
    store.createIndex('timedate', 'timedate', {unique: true});

    // Once the store is created, populate it
    store.transaction.oncomplete = function(event) {
      // Store values in the newly created objectStore.
      var ObjectStore = db.transaction("dietplan", "readwrite").objectStore("dietplan");
      store.forEach(function(dietplans) {
        ObjectStore.add(dietplans);
      });
    };
};

function defaultData(){
  store.put({activity: "1231", meal: "lunch", calories: "100", timedate: "2018-04-22T11:11", notes: "123"});
  store.put({activity: "breakfasct with jamal", meal: "Breakfast", calories: "200", timedate: "2018-04-22T12:10", notes: "321"});
}

function displayData() {
var search = document.getElementById("search").value;

var transaction = db.transaction(["dietplan"]);
var objectStore = transaction.objectStore("dietplan");
var request = objectStore.get(search);

request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Do something with the request.result!
  alert("added all entries for meal");
};
};

function addData() {
  var activity = $$('#activity').val();
  var meal = $$('#meal').val();
  var calories = $$('#calories').val();
  var notes = $$('#notes').val();
  var timedate = $$('#timedate').val();


  if(activity == "")
  {
      alert("Please enter a activity name!");
      return;
  }
  if(calories == "")
  {
      alert("Please fill in calories, cannot be blank");
      return;
  }
  if(timedate == "")
  {
      alert("Please select a time & date");
      return;
  }

  // open a read/write db transaction, ready for adding the data
  var transaction = db.transaction(["dietplan"], "readwrite");

  // create an object store on the transaction
  var objectStore = transaction.objectStore("dietplan");

  // Create a new object ready for being inserted into the IDB
  var newItem = {
    activity: activity,
    meal: meal, //doesnt record data
    calories: calories,
    timedate: timedate,
    notes: notes //doesnt record data
  }

  // add our newItem object to the object store
  var objectStoreRequest = objectStore.add(newItem);

  objectStoreRequest.onsuccess = function(event) {
    // report the success of the request (this does not mean the item
    // has been stored successfully in the DB - for that you need transaction.onsuccess)
    console.log("Request successful");
    window.location.href="index.html";

  // report on the success of opening the transaction
  transaction.oncomplete = function(event) {
    console.log("Transaction completed: database modification finished");
  };

  transaction.onerror = function(event) {
    alert("Transaction not opened due to error. Duplicate items not allowed");
    console.log("error", e.target.error.name);
  };
  };
};

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
//https://www.eduonix.com/dashboard/Learn-HTML5-IndexedDB-App
