'use strict';

var app = app || {};

(function(module) {

  const adminView = {};

  let clearView = () => {
    $('.container').hide();
    $('nav').hide();
    $('#book-list').empty();
    $('#detail').empty();
  }

  adminView.initAdminPage = (ctx, next) => {
    clearView();
    $('#view-title').text('verify your passphrase');
    $('#admin-view').show();
    $('#admin-form').on('submit', function(event){
      event.preventDefault();
      let token = event.target.passphrase.value;
      console.log(`${ENV.apiUrl}/api/v1/admin`);
      $.get(`${ENV.apiUrl}/api/v1/admin`, {token})
        .then(res => {
          localStorage.token = true;
          page('/');
        })
        // .catch(() => );
    })
    next();
  }

  adminView.verify = (ctx) => {
    if(localStorage.token) {
      $('#admin-only').show();
      $('#admin-view form').hide();
    }
  }

  module.adminView = adminView;
})(app);


// adminView.verify = function(ctx, next) {
//   if(!localStorage.token) $('.admin').addClass('admin-only');
//   else $('.admin').show();
//   next();
// }