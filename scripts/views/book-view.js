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

  bookView.initDetailView = (ctx) => {
    $('.container').hide();
    $('#view-title').hide();
    let selectedBook = app.Book.all.filter(book => book.book_id === parseInt(ctx.params.book_id));
    $('#detail').empty();
    $('#detail').append(selectedBook[0].showDetails());
    $('#detail').show();
    // $('#delete').on('click', selectedBook[0].deleteBook());
  }

  bookView.initUpdateFormPage = (ctx) => {
    $('.container').hide();
    $('#view-title').hide();
    $('#update-form').show();
    let selectedBook = app.Book.all.filter(book => book.book_id === parseInt(ctx.params.book_id));
    $('#update-book-author').val(selectedBook[0].author);
    $('#update-book-title').val(selectedBook[0].title);
    $('#update-book-isbn').val(selectedBook[0].isbn);
    $('#update-book-image-url').val(selectedBook[0].image_url);
    $('#update-book-description').val(selectedBook[0].description);
    $('#update-form').on('submit', app.Book.update);
  }

  bookView.toggleNav = () => {
    $('nav').toggle();
  }

  $('.fa-bars').on('click', bookView.toggleNav);

  module.bookView = bookView;

})(app);