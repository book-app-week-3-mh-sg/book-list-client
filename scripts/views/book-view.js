'use strict';

var app = app || {};

(function(module){

  const bookView = {};

  bookView.initListView = () => {
    $('.container').hide();
    $('#view-title').text('my books');
    $('.list-view').show();
    $('nav').hide();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initFormView = () => {
    $('.container').hide();
    $('#view-title').text('add a new book');
    $('#new-form').show();
    $('nav').hide();
    $('#new-form').on('submit', app.Book.create);
  }

  bookView.toggleNav = () => {
    $('nav').toggle();
  }

  $('.fa-bars').on('click', bookView.toggleNav);

  module.bookView = bookView;

})(app);