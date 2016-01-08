var gap = {
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    gap.receivedEvent('deviceready');
  },
  receivedEvent: function(id) {
    console.log('Received Event: ' + id);
  }
};

var app = new Framework7({
  modalTitle: 'Membership System',
  swipePanel: 'left',
});
var $$ = Dom7;
var mainView = app.addView('.view-main', {
  dynamicNavbar: true,
});
var directDownlineTemplate = $$('#directDownlineCard').html();
var compiledDirectDownlineTemplate = Template7.compile(directDownlineTemplate);

var productTemplate = $$('#productList').html();
var compiledProductTemplate = Template7.compile(productTemplate);

var serverUrl = 'http://www.urewardz.com/script/';
