import db from '../db/db';

export const studentService = {
  list: () => db.students.toArray(),
  listByGrade: (gradeId) => db.students.where({ gradeId }).toArray(),
  get: (id) => db.students.get(id),
  add: (student) => db.students.add({ ...student, syncStatus: 'pending' }),
  update: (id, data) => db.students.update(id, { ...data, syncStatus: 'pending' }),
  delete: (id) => db.students.delete(id),
};
