'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initListView));
page('/books/new', ctx => app.bookView.initFormView());
page('/books/:book_id', ctx => app.Book.fetchOne(ctx));
// page('/*', app.bookView.initListView);

page();