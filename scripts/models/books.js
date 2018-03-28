'use strict';

var app = app || {};

(function(module) {

  function Book (rawDataObj) {
    this.title = rawDataObj.title;
    this.author = rawDataObj.author;
    this.isbn = rawDataObj.isbn;
    this.image_url = rawDataObj.image_url;
    this.description = rawDataObj.description;
  }

  Book.all = [];

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#book-list-template').text());
    return template(this);
  }

  Book.prototype.insertBook = function(callback) {
    $.post('/api/v1/books', {title: this.title, author: this.author, isbn: this.isbn, image_url: this.image_url, description: this.description})
      .then(callback);
  }

  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => {return a.title > b.title;})
      .map(instance => new Book(instance));
  }

  Book.fetchAll = callback => {
    $.get('https://mh-sg-booklist.herokuapp.com/api/v1/books')
      .then(data => {
        Book.loadAll(data);
        callback();
      },
      err => {
        app.errorView.errorCallback(err);
      }
      )
  }

  Book.fetchOne = callback => {
    $.get('https://mh-sg-booklist.herokuapp.com/api/v1/books/:id')
      .then(data => {
        Book.loadAll(data);
        if(callback) callback();
      },
      err => {
        app.errorView.errorCallback(err);
      })
  }

  Book.create = () => {
    var book = new Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image-url').val(),
      description: $('#book-description').val()
    })
    book.insertBook();
  }

  module.Book = Book;

})(app);