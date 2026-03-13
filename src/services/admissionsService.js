import db from '../db/db';

export const admissionsService = {
  add: (record) => db.admissions.add(record),
  listByStudentId: (studentId) => db.admissions.where({ studentId }).toArray(),
  deleteByStudentId: (studentId) => db.admissions.where({ studentId }).delete(),
};
