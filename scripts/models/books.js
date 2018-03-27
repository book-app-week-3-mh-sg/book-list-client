'use strict';

var app = app || {};
const API_URL = 'http://localhost:3000';

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
    $.get(`${API_URL}/api/v1/books`)
      .then(
        function(data) {
          Book.loadAll(data);
          if(callback) callback();
        },
        function(err) {
          console.log(err);
        }
      )
  }

  module.Book = Book;

})(app);