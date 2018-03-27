'use strict';

var app = app || {};

(function(module){

  const errorView = {};

  errorView.initErrorPage = err => {
    $('.container').hide();
    $('.error-view').show();

    $('#error-message').empty();

    let template = Handlebars.compile($('#error-template').text());
    $('#error-message').append(template(err));
  }

  errorView.errorCallback = err => {
    console.log(err);
    errorView.initErrorPage(err);
  }

  module.errorView = errorView;

})(app);