// Initialize your app
var myApp = new Framework7();

//time scroll wheel
var today = new Date();
var pickerInline = myApp.picker({
  containerEl: '#demo-picker-date-container',
  inputEl: '#time-picker',
  toolbar: false,
  rotateEffect: true,
  value: [
    today.getMonth(),
    today.getDate(),
    today.getFullYear(),
    today.getHours(),
    today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes()
  ],
  formatValue: function (values, displayValues) {
    return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
  },
  cols: [
    // Months
    {
      values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
      displayValues: ('January February March April May June July August September October November December').split(' '),
      textAlign: 'left'
    },
    // Days
    {
      values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    },
    // Years
    {
      values: (function () {
        var arr = [];
        for (var i = 1950; i <= 2030; i++) { arr.push(i); }
          return arr;
      })(),
    },
    // Space divider
    {
      divider: true,
      content: '  '
    },
    // Hours
    {
      values: (function () {
        var arr = [];
        for (var i = 0; i <= 23; i++) { arr.push(i); }
          return arr;
      })(),
    },
    // Divider
    {
      divider: true,
      content: ':'
    },
    // Minutes
    {
      values: (function () {
        var arr = [];
        for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
          return arr;
      })(),
    }
  ],
  on: {
    change: function (picker, values, displayValues) {
      var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
      if (values[1] > daysInMonth) {
        picker.cols[1].setValue(daysInMonth);
      }
    },
  }
});

// Export selectors engine
var $$ = Dom7;

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
