$$(document).on('pageInit', function(e) {
  app.showPreloader();
  var page = e.detail.page.name;
  console.log(page);
  switch (page) {
    case 'home':
      initEvent();
      break;
    case 'currency':
      retrieveCurrency();
      break;
    case 'profile_summary':
      activateCompleteProfile();
      break;
    case 'bank_info':
      retrieveBankInfo();
      break;
    case 'profile_security':
      profileSecurityButton();
      break;
    case 'my_geneology':
      retrieveGeneology();
      break;
    case 'direct_downlines':
      retrieveDirectDownlines();
      directDownlineSearch();
      break;
    case 'wallet_transfer':
      walletTransferAction();
      break;
    case 'wallet_history':
      walletHistoryAction();
      break;
    case 'history_transaction':
      historyTransactionAction();
      break;
    case 'history_bv':
      historyBvAction();
      break;
    case 'history_downline':
      historyDownlineAction();
      break;
    case 'withdrawal_request':
      withdrawalRequestAction();
      break;
    case 'withdrawal_history':
      withdrawalHistoryAction();
      break;
    case 'announcement':
      announcementAction();
      break;
    case 'notification':
      notificationAction();
      break;
      case 'product':
      retrieveProducts();
      break;
  }
  hidePreloader();
  app.closePanel();
});

$$('.panel-left .item-link').on('click', function() {
  if (!$$(this).parent().hasClass('accordion-item')) {
    $$('.panel-left .item-link').removeClass('selected-panel');
    $$(this).addClass('selected-panel');
  }
});

function displayUser() {
  initEvent();
  $$('.panel-profile-name').html(localStorage.full_name);
  $$('.panel-profile-id').html('ID: ' + localStorage.user_id);
  $$('.panel-profile-grade').css('background-image', 'url(../img/level' + localStorage.grade_id + '.png)');
  var grade_title = ["Silver", "Gold", "Platinum", "Diamond"];
  $$('.panel-profile-grade-text').html(grade_title[localStorage.grade_id]);
  app.closeModal('.login-screen');
}

function hidePreloader() {
  app.hidePreloader();
}

function promptError(errorMsg) {
  app.alert(errorMsg);
  //console.log(errorMsg);
}

function restoreTablePosition() {

  $$('table').on('click', function() {
    $$('table').scrollTo(0, 0, 0, null);
  });
}

///////////////////////HomePage---------
function initEvent() {
  var eventSwiper = app.swiper('.event-swiper', {
    pagination: '.event-swiper .swiper-pagination',
    autoplayDisableOnInteraction: false,
    paginationClickable: true,
    speed: 1100,
    autoplay: 2300,
    centeredSlides: true,
    spaceBetween: 0,
    paginationHide: false,
    loop: true,
  });

  eventSwiper.removeAllSlides();
  var eventInner = '';
  $$.ajax({
    type: "POST",
    url: serverUrl + "event_get.php",
    dataType: 'json',
    success: function(response) {
      if (response.length > 0) {
        $$.each(response, function(index, val) {
          value = val['event_id'];
          eventInner += '<div href="#" class="swiper-slide event-slide create-popup" value="' + value + '" style="background-image:url(' + serverUrl + 'resize_image.php?width=' + $$(window).width() + '&height=' + $$(window).height() + '&path=../public/img/event/' + value + '.jpg)"></div>';
        });
        eventSwiper.prependSlide(eventInner);
        $$('.event-slide').on('click', function() {
          getEventDetail($$(this).attr('value'));
        });
      } else {
        app.alert('Server is busy. Please try again.');
      }
      hidePreloader();
    }
  });
}
/*
{"event_id":1,"event_title":"dsfxxxx11111","event_desc":"sadsad","event_shop":"30 - Advanced 2","event_created_date":"2015-11-19","event_url":"","event_start_date":"2015-11-19","event_end_date":"2015-11-19","event_status":2,"event_location":"Setapak, Selangor, Malaysia&3.279052699999999&101.74099460000002"}
*/

function getEventDetail(id) {
  app.showPreloader();
  $$.ajax({
    type: "POST",
    url: serverUrl + "event_member_get_detail.php",
    data: {
      event_id: id,
    },
    dataType: 'json',
    success: function(response) {
      if (response) {
        var ads_owner;
        if (response['event_shop'].toLowerCase().indexOf('all') < 0) {
          var temp = response['event_shop'].split('-');
          ads_owner = '<medium>By <a href="#" value="' + response['event_url'] + '" class="open-url">' + temp[1].toString().trim() + '</a></medium><br/>';
        } else {
          ads_owner = '';
        }
        var popupTemplate =
          '<div class="popup">' +
          '<div class="view navbar-fixed">' +
          '<div class="navbar">' +
          '<div class="navbar-inner">' +
          '<div class="center">' + response['event_title'] + '</div>' +
          '<div class="right">' +
          '<a href="#" class="close-popup link">' +
          '<i class="icon icon-back"></i>' +
          '<span style="color:#fff">Close</span>' +
          '</a>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '<div class="pages">' +
          '<div class="page feeds-page" data-page="popup-{{index}}">' +
          '<div class="page-content">' +
          '<div class="content-block content-background">' +
          '<div style="background-image:url(' + serverUrl + 'resize_image.php?width=' + $$(window).width() + '&height=' + $$(window).height() + '&path=../public/img/event/' + response['event_id'] + '.jpg)" class="popup-image" valign="bottom"></div>' +
          '<h3>' + response['event_title'] + '</h3>' +
          ads_owner +
          '<small>' + response['event_created_date'] + '</small><br/>' +
          '<div class="content-block-inner">' + response['event_desc'] + ' ..<br/>' +
          '<a href="#" value="' + response['event_url'] + '" class="open-url">read more</a><br>' +
          '<br/><p>Event period<br/>' + response['event_start_date'] + ' to ' + response['event_end_date'] + '</p>' +
          '</div></div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';

        hidePreloader();
        app.popup(popupTemplate);
      } else {
        hidePreloader();
        app.alert('Server is busy. Please try again.');
      }
    }
  });
}

///////////////////Currency

function retrieveCurrency() {
  hidePreloader();
}

//////////////ProfileSummary
function activateCompleteProfile() {
  showCompleteProfile(true);
}

function showCompleteProfile(isShow) {
  if (isShow) {
    $$('.btn-cancel-update-profile').remove();
    $$('.complete-profile .content-block-title').show();
    $$('.complete-profile .profile-birth-date').show();
    $$('.complete-profile .profile-gender').show();
    $$('.complete-profile input[type="checkbox"]').on('change', function() {
      $$('input[type="checkbox"]').prop('checked', false);
      $$(this).prop('checked', true);
      if ($$(this).prop('checked')) {
        console.log($$(this).val());
      }
    });
  } else {
    $$('.btn-cancel-update-profile').show();
    $$('.btn-submit-update-profile').html('Save changes');
    $$('.complete-profile .content-block-title').hide();
    $$('.complete-profile .profile-birth-date').hide();
    $$('.complete-profile .profile-gender').hide();
  }
  setTimeout(function() {
    hidePreloader();
  }, 1500);
  $$('.btn-cancel-update-profile').on('click', function() {
    mainView.router.refreshPage();
  });
}


/////////////////EditBankInfo
function retrieveBankInfo() {
  hidePreloader();
}


////////////////ProfileSecurity
function profileSecurityButton() {
  hidePreloader();
}



//////////////////Geneology
function retrieveGeneology() {
  hidePreloader();
}



/////////////////DirectDownlines
var directDownlineLastIndex;

function retrieveDirectDownlines() {
  hidePreloader();

  var context = {
    directDownline: [{
      id: 'USR000001',
      name: 'Chong Liang Hwang',
      sponsorId: 'USR0000000',
      firstBv: '1111111',
      secondBv: '2222222222',
      thirdBv: '333333',
      status: 'Active',
      level: '99',
      package: 'Precious Diamond'
    }, {
      id: 'USR000002',
      name: 'Au Yang Hwang Tiang',
      sponsorId: 'USR0000000',
      firstBv: '1111111',
      secondBv: '2222222222',
      thirdBv: '333333',
      status: 'Active',
      level: '99',
      package: 'Precious Diamond'
    }, {
      id: 'USR000003',
      name: 'Elizabeth Kelly Kuan',
      sponsorId: 'USR0000000',
      firstBv: '1111111',
      secondBv: '2222222222',
      thirdBv: '333333',
      status: 'Active',
      level: '99',
      package: 'Precious Diamond'
    }, {
      id: 'USR000004',
      name: 'Khai Khang Kean',
      sponsorId: 'USR0000000',
      firstBv: '1111111',
      secondBv: '2222222222',
      thirdBv: '333333',
      status: 'Active',
      level: '99',
      package: 'Precious Diamond'
    }],
  };
  var html = compiledDirectDownlineTemplate(context);
  $$('.direct-downline-list').html(html);
  directDownlineLastIndex = $$('.direct-downline-list').children().length;
}

function viewDownline(object) {
  var id = object.id;
  app.alert(id);
}

function directDownlineSearch() {
  $$('#directDownlineSearch').focus(function() {
    $$('.direct-downline-list').scrollTo(0, 0, 0, null);
  });
  $$('.search-direct-downline').on('keypress', function(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      keyword = $$('#directDownlineSearch').val();
      var isResult = false;
      $$.each($$('.direct-downline-list').children(), function(index, value) {
        if (keyword.toLowerCase().indexOf($$(value).attr('name').toLowerCase()) > -1 || keyword.toLowerCase().indexOf(value.id.toLowerCase()) > -1) {
          isResult = true;
          $$('#directDownlineSearch').val('');
          $$('.direct-downline-list').scrollTo(0, $$(value).offset().top, 1000, null);
        }
        if (index === directDownlineLastIndex - 1 && !isResult) {
          app.alert(keyword + ' not found');
        }
      });
    }
  });
}



//////////////WalletTransfer
function walletTransferAction() {

  $$('.transfer-target input[type="checkbox"]').on('change', function() {
    $$('input[type="checkbox"]').prop('checked', false);
    $$(this).prop('checked', true);
    if ($$(this).val() === 'to-own') {
      $$('.to-username-id').hide();
    } else {
      $$('.to-username-id').show();
    }
    if ($$(this).prop('checked')) {
      console.log($$(this).val());
    }
  });

  $$('.btn-transfer-confirm').on('click', function() {
    app.prompt('Wallet password?', function(value) {
      console.log(value);
    });
  });
}


///////////////WalletHistory
function walletHistoryAction() {
  var walletHistoryFrom = app.calendar({
    input: '#wallet-history-from',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  var walletHistoryTo = app.calendar({
    input: '#wallet-history-to',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  restoreTablePosition();
}

///////////////HistoryTransaction
function historyTransactionAction() {
  var transactionFrom = app.calendar({
    input: '#transaction-from',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  var transactionTo = app.calendar({
    input: '#transaction-to',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  restoreTablePosition();
}

///////////////HistoryBV
function historyBvAction() {
  var bvFrom = app.calendar({
    input: '#bv-from',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  var bvTo = app.calendar({
    input: '#bv-to',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  restoreTablePosition();
}

///////////////HistoryDownline
function historyDownlineAction() {
  var downlineFrom = app.calendar({
    input: '#downline-from',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  var downlineTo = app.calendar({
    input: '#downline-to',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  restoreTablePosition();
}

//////////////WithdrawalRequest
function withdrawalRequestAction() {

  $$('.btn-withdraw-confirm').on('click', function() {
    app.prompt('Wallet password?', function(value) {
      console.log(value);
    });
  });
}

////////////WithdrawalHistory
function withdrawalHistoryAction() {
  var withdrawFrom = app.calendar({
    input: '#withdraw-from',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  var withdrawTo = app.calendar({
    input: '#withdraw-to',
    dateFormat: 'DD, dd-mm-yyyy'
  });
  restoreTablePosition();
}


/////////////NewsAnnouncementAction
function announcementAction() {}

function viewNewsAnnouncement(id) {
  var html = '<div class="popup">' +
    '<div class="content-block">' +
    '<p>About</p>' +
    '<p><a href="#" class="close-popup">Close popup</a></p>' +
    '<p>Lorem ipsum dolor ...</p>' +
    '</div>' +
    '</div>';
  app.popup(html);
}


///////////////Notification
function notificationAction() {}

function viewNotification(id) {
  var html = '<div class="popup">' +
    '<div class="content-block">' +
    '<p>About</p>' +
    '<p><a href="#" class="close-popup">Close popup</a></p>' +
    '<p>Lorem ipsum dolor ...</p>' +
    '</div>' +
    '</div>';
  app.popup(html);
}


///////////////Product
function retrieveProducts() {
  hidePreloader();

  var context = {
    product: [{
      name: 'Silver',
      price: '250.00',
      benefit: '7',
      information: 'Maximum BV forward per day: 5000<br/>Maximum BV level: 5 level'
    }, {
        name: 'Gold',
        price: '800.00',
        benefit: '8',
        information: 'Maximum BV forward per day: 15000<br/>Maximum BV level: 6 level'
    }, {
        name: 'Platinum',
        price: '1500.00',
        benefit: '9',
        information: 'Maximum BV forward per day: 25000<br/>Maximum BV level: 7 level'
    }, {
        name: 'Precious Diamond',
        price: '2500.00',
        benefit: '10',
        information: 'Maximum BV forward per day: 35000<br/>Maximum BV level: 8 level'
    }],
  };
  var html = compiledProductTemplate(context);
  $$('.product-list').html(html);
}
