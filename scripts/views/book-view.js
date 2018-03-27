'use strict';

var app = app || {};

(function(module){

  const bookView = {};

  bookView.initIndexPage = () => {
    $('.container').hide();
    $('.book-view').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  module.bookView = bookView;

})(app);