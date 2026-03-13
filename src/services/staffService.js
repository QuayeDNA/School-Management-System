import db from '../db/db';

export const staffService = {
  list: () => db.staff.toArray(),
  get: (id) => db.staff.get(id),
  add: (staff) => db.staff.add({ ...staff, syncStatus: 'pending' }),
  update: (id, data) => db.staff.update(id, { ...data, syncStatus: 'pending' }),
  delete: (id) => db.staff.delete(id),
};
