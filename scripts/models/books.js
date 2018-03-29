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
      mage_url: this.image_url,
      description: this.description})
      .then(callback);
    console.log('Sent to server??');
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

  Book.fetchOne = ctx => {
    $.get(`${ENV.apiUrl}/api/v1/books/${ctx.params.book_id}`)
      .then(data => {
        let selected = data[0].book_id;
        app.bookView.initDetailView(selected);
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
  }

  module.Book = Book;

})(app);