import db from '../db/db';

export const bookService = {
  list: () => db.books.toArray(),
  get: (id) => db.books.get(id),
  add: (book) => db.books.add({ ...book, syncStatus: 'pending' }),
  update: (id, data) => db.books.update(id, { ...data, syncStatus: 'pending' }),
  delete: (id) => db.books.delete(id),
};
