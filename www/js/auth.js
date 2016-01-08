function checkLoggedIn() {
  if (localStorage.login === "true") {
    displayUser();
  } else {
    app.loginScreen();
  }
}

$$('.btn-register').on('click', function() {
  app.popup('.register-screen');
});

$$('.btn-sign-in').on('click', function() {
  login();
});

$$('.btn-cancel-register').on('click', function() {
  app.closeModal('.register-screen');
});

$$('.btn-register-confirm').on('click', function() {
  submitRegistration();
});

$$('.btn-forget-pw').on('click', function(){
  app.prompt('Enter email registered', function (value) {
    app.prompt('Enter your NRIC no.', function(value2){
      app.alert('Kindly check your email. TQ');
    });
  });
});

$$('input[name="email"]').on('keypress', function(e) {
  enterToLogin(e);
});

$$('input[name="password"]').on('keypress', function(e) {
  enterToLogin(e);
});

$$('.link-log-out').on('click', function() {
  app.confirm('Log out now?', function() {
    logout();
  });
});

function enterToLogin(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    login();
  }
}

/*
if (!isEmpty(email) && !isEmpty(password)) {
  var dataObj = {
    email: email,
    password: password,
    platform: "1"
  };
  $$.ajax({
    type: "POST",
    url: serverUrl + '',
    data: dataObj,
    success: function(response) {
      if ($.trim(response)) {
        app.alert('login');
      } else {
        app.alert('Cannot connect to server. Please try again!');
      }
    },
    error: function(data, textStatus) {
      handleException(data.responseText);
    }
  });
} else {
  app.alert("Email and password cannot be empty");
}
*/

function login() {
  email = $$('input[name="email"]').val();
  password = $$('input[name="password"]').val();

  if (!isEmpty(email) || !isEmpty(password)) {
    $$('input[name="email"]').val('');
    $$('input[name="password"]').val('');
    localStorage.login = "true";
    localStorage.full_name = "Maplerichie";
    localStorage.user_id = "rich0001";
    localStorage.grade_id = "3";
    displayUser();
  } else {
    app.alert("Email or password cannot be empty");
  }
}

function logout() {
  localStorage.login = "false";
  localStorage = null;
  location.reload();
}

function submitRegistration() {
  var referral = $$('input[name="referral"]').val();
  var name = $$('input[name="name"]').val();
  var nric = $$('input[name="nric"]').val();
  var username = $$('input[name="username"]').val();
  var email = $$('input[name="regEmail"]').val();
  var password = $$('input[name="regPassword"]').val();
  var walletPassword = $$('input[name="walletPassword"]').val();

  if (isEmpty(referral)) {
    promptError('Invalid referral');
  } else if (isEmpty(name)) {
    promptError('Invalid name');
  } else if (isEmpty(nric)) {
    promptError('Invalid NRIC no.');
  } else if (isEmpty(username)) {
    promptError('Invalid username');
  } else if (isEmpty(email)) {
    promptError('Invalid email');
  } else if (isEmpty(password)) {
    promptError('Invalid password');
  } else if (isEmpty(walletPassword)) {
    promptError('Invalid wallet password');
  } else {
    var dataObj = {
      referral: referral,
      name: name,
      nric: nric,
      username: username,
      email: email,
      password: password,
      walletPassword: walletPassword
    };
    console.log(dataObj);

    $$('input[name="referral"]').val('');
    $$('input[name="name"]').val('');
    $$('input[name="nric"]').val('');
    $$('input[name="username"]').val('');
    $$('input[name="regEmail"]').val('');
    $$('input[name="regPassword"]').val('');
    $$('input[name="walletPassword"]').val('');

//test
    $$('input[name="password"]').val('sds');
    login();
      app.closeModal('.register-screen');
  }
}

function handleException(responseText, textStatus) {
  if (responseText && !responseText.match(/^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/)) {
    var json = JSON.parse(responseText);
    var errorCode = json['code'];
    var errorMsg = json['message'];
    if (!isNaN(errorCode)) {
      if (parseInt(errorCode) < 0) {
        app.alert(errorMsg, function() {
          if (errorMsg.indexOf('session was ended') > 0) {
            if (localStorage.login === 'true') {
              logout();
            }
          }
        });
      }
    }
  } else {
    app.alert('No internet connection');
  }
}

function isEmpty(str) {
  return !str.replace(/^\s+/g, '').length; // boolean (`true` if field is empty)
}

function isEmail(email) {
  return email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
}
/*
$$(document).on('DOMContentLoaded', function(){
  app.alert(this);
});

$$('form.ajax-submit').on('submitted', function (e) {
  var xhr = e.detail.xhr;

  var data = e.detail.data;
  app.alert(xhr + '\n' + data);
});
*/

checkLoggedIn();
