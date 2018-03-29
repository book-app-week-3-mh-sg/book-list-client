'use strict';

var app = app || {};

(function(module){

  const bookView = {};

  bookView.initListView = () => {
    $('.container').hide();
    $('#view-title').text('my books');
    $('.list-view').show();
    $('nav').hide();
    $('#book-list').empty();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
  }

  bookView.initFormView = () => {
    $('.container').hide();
    $('#view-title').text('add a new book');
    $('#new-form').show();
    $('nav').hide();
    $('#new-form').on('submit', app.Book.create);
  }

  bookView.initDetailView = id => {
    $('.container').hide();
    $('#view-title').hide();
    let selectedBook = app.Book.all.filter(book => book.book_id === id);
    console.log(selectedBook);
    $('#detail').empty();
    $('#detail').append(selectedBook[0].showDetails());
    $('#detail').show();
  }

  bookView.toggleNav = () => {
    $('nav').toggle();
  }

  $('.fa-bars').on('click', bookView.toggleNav);

  module.bookView = bookView;

})(app);