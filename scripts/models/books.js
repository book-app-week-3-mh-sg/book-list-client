'use strict';

var app = app || {};

const ENV = {};

ENV.isProduction = window.location.protocol === 'https:';
ENV.productionApiUrl = 'https://mh-sg-booklist.herokuapp.com';
ENV.developmentApiUrl = 'http://localhost:3000';
ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

(function(module) {

  function Book (rawDataObj) {
    this.book_id = rawDataObj.book_id;
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

  Book.prototype.showDetails = function() {
    let template = Handlebars.compile($('#book-detail-template').text());
    return template(this);
  }

  Book.prototype.insertBook = function(callback) {
    $.post(`${ENV.apiUrl}/api/v1/books`, {
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      image_url: this.image_url,
      description: this.description})
      .then(callback);
    console.log('Sent to server');
  }

  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => {return a.title > b.title;})
      .map(instance => new Book(instance));
  }

  Book.fetchAll = callback => {
    $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(data => {
        Book.loadAll(data);
        if(callback) callback();
      },
      err => {app.errorView.errorCallback(err);}
      )
  }

  Book.fetchOne = (ctx, next) => {
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
      .then(() => {
        next();
      },
      err => {
        app.errorView.errorCallback(err);
      })
  }

  Book.create = (event) => {
    event.preventDefault();
    var book = new Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image-url').val(),
      description: $('#book-description').val()
    })
    book.insertBook();
    Book.fetchAll(app.bookView.initListView);
    window.location = '/';
  }

  Book.destroy = event => {
    event.preventDefault();
    let id = parseInt(window.location.pathname.match(/\/\d+$/)[0].replace(/\//g, ''));
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/books/${id}`,
      method: 'DELETE'
    })
      .then(
        Book.fetchAll(app.bookView.initListView),
        window.location = '/'
      );
  };

  Book.update = event => {
    event.preventDefault();
    let id = parseInt(window.location.pathname.match(/\/\d+\//)[0].replace(/\//g, ''));
    $.ajax({
      url: `${ENV.apiUrl}/api/v1/books/${id}`,
      method: 'PUT',
      data: {
        title: $('#update-book-title').val(),
        author: $('#update-book-author').val(),
        isbn: $('#update-book-isbn').val(),
        image_url: $('#update-book-image-url').val(),
        description: $('#update-book-description').val()
      }
    })
      .then(data => {
        console.log(data);
        Book.fetchAll(app.bookView.initListView),
        window.location = '/'
      })
  }

  module.Book = Book;

})(app);