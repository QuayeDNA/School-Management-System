import db from '../db/db';

export const inventoryService = {
  list: () => db.inventory.toArray(),
  get: (id) => db.inventory.get(id),
  add: (item) => db.inventory.add({ ...item, syncStatus: 'pending' }),
  update: (id, data) => db.inventory.update(id, { ...data, syncStatus: 'pending' }),
  delete: (id) => db.inventory.delete(id),
};
