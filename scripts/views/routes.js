'use strict';

page('/', app.bookView.initListView);
// page('/books/:book_id', app.bookView.initDetailView);
page('/books/new', app.bookView.initFormView);

page();