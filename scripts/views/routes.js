'use strict';

page('/books/new', ctx => app.bookView.initFormView());
page('/books/:book_id/update', app.Book.fetchOne, app.bookView.initUpdateFormPage);
page('/books/:book_id', app.Book.fetchOne, app.bookView.initDetailView);
page('/admin', app.adminView.initAdminPage, app.adminView.verify);
page('/', ctx => app.Book.fetchAll(app.bookView.initListView));

page();