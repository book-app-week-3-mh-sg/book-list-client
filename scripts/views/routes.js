'use strict';

page('/', app.bookView.initListView);
page('/books/new', app.bookView.initFormView);
page('/books/:book_id', ctx => app.Book.fetchOne(ctx));
// page('*', app.bookView.initListView);

page();