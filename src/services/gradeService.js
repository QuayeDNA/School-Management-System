import db from '../db/db';

export const gradeService = {
  list: () => db.grades.toArray(),
  add: (name) => db.grades.add({ name }),
  delete: (id) => db.grades.delete(id),
  getByName: (name) => db.grades.where({ name }).first(),
};
