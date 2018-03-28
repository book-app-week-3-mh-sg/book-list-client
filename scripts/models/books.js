'use strict';

var app = app || {};

// const ENV = {};

// ENV.isProduction = window.location.protocol === 'https:';
// ENV.productionApiUrl = 'https://mh-sg-booklist.herokuapp.com';
// ENV.developmentApiUrl = 'http://localhost:3000';
// ENV.apiUrl = ENV.isProduction ? ENV.productionApiUrl : ENV.developmentApiUrl;

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

  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => {return a.title > b.title;})
      .map(instance => new Book(instance));
  }

  Book.fetchAll = callback => {
    $.get('https://mh-sg-booklist.herokuapp.com/api/v1/books')
    // $.get(`${ENV.apiUrl}/api/v1/books`)
      .then(data => {
        Book.loadAll(data);
        callback();
      },
      err => {
        app.errorView.errorCallback(err);
      }
      )
  }

  module.Book = Book;

})(app);