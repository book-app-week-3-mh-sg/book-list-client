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

  Book.loadAll = rows => {
    Book.all = rows.sort().map(instance => new Book(instance));
  }

  Book.fetchAll = callback => {
    // $.get('/api/v1/books')
    //   .then(
    //     function(data) {
    //       Book.loadAll(data);
    //       if(callback) callback();
    //     },
    //     function(err) {
    //       console.log(err);
    //     }
    //   )
    $.get('/data/books.json')
      .then(
        function(data) {
          Book.loadAll(data);
          if(callback) callback();
        },
        function(err) {
          app.errorView.errorCallback(err);
        }
      )
  }

  module.Book = Book;

})(app);