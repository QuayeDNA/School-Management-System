import Dexie from 'dexie';

const db = new Dexie('AuthDatabase');
db.version(1).stores({
  users: '++id,username,email,password',
  grades: '++id,name',
  students: '++id,name,dateOfBirth,gender,address,contactNumber,email,guardianName,guardianContact,gradeId,status',
  admissions: '++id,studentId,admissionDate'
});

export default db;