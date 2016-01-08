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
    gap.initPaymentUI();
  },
  initPaymentUI: function() {
    var clientIDs = {
      "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
      "PayPalEnvironmentSandbox": "YOUR_SANDBOX_CLIENT_ID"
    };
    PayPalMobile.init(clientIDs, gap.onPayPalMobileInit);

  },
  onSuccesfulPayment: function(payment) {
    console.log("payment success: " + JSON.stringify(payment, null, 4));
  },
  onAuthorizationCallback: function(authorization) {
    console.log("authorization: " + JSON.stringify(authorization, null, 4));
  },
  createPayment: function() {
    // for simplicity use predefined amount
    // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
    var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
    var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
    return payment;
  },
  configuration: function() {
    // for more options see `paypal-mobile-js-helper.js`
    var config = new PayPalConfiguration({
      merchantName: "My test shop",
      merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
      merchantUserAgreementURL: "https://mytestshop.com/agreement"
    });
    return config;
  },
  onPrepareRender: function() {
    // buttons defined in index.html
    //  <button id="buyNowBtn"> Buy Now !</button>
    //  <button id="buyInFutureBtn"> Pay in Future !</button>
    //  <button id="profileSharingBtn"> ProfileSharing !</button>
    var buyNowBtn = document.getElementById("buyNowBtn");
    var buyInFutureBtn = document.getElementById("buyInFutureBtn");
    var profileSharingBtn = document.getElementById("profileSharingBtn");

    buyNowBtn.onclick = function(e) {
      // single payment
      PayPalMobile.renderSinglePaymentUI(gap.createPayment(), gap.onSuccesfulPayment, gap.onUserCanceled);
    };

    buyInFutureBtn.onclick = function(e) {
      // future payment
      PayPalMobile.renderFuturePaymentUI(gap.onAuthorizationCallback, gap.onUserCanceled);
    };

    profileSharingBtn.onclick = function(e) {
      // profile sharing
      PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], gap.onAuthorizationCallback, gap.onUserCanceled);
    };
  },
  onPayPalMobileInit: function() {
    // must be called
    // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
    PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", gap.configuration(), gap.onPrepareRender);
  },
  onUserCanceled: function(result) {
    console.log(result);
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
