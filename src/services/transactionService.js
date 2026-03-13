import db from '../db/db';

export const transactionService = {
  list: () => db.transactions.toArray(),
  get: (id) => db.transactions.get(id),
  add: (transaction) => db.transactions.add({ ...transaction, syncStatus: 'pending' }),
  update: (id, data) => db.transactions.update(id, { ...data, syncStatus: 'pending' }),
  delete: (id) => db.transactions.delete(id),
};
