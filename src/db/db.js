import Dexie from 'dexie';

// IndexedDB schema for the SMS app. Increment the version when changing stores.
const db = new Dexie('SMS_EduSphere');

db.version(2).stores({
  users:        '++id, &username, email, role',
  grades:       '++id, name',
  students:     '++id, name, gradeId, status, gender, email, syncStatus',
  admissions:   '++id, studentId, admissionDate',
  staff:        '++id, firstName, lastName, email, role, department, syncStatus',
  payroll:      '++id, staffId, month, year, status, syncStatus',
  transactions: '++id, type, amount, date, category, syncStatus',
  books:        '++id, title, author, category, isbn, syncStatus',
  borrowings:   '++id, bookId, studentId, borrowDate, returnDate',
  inventory:    '++id, name, category, quantity, syncStatus',
  messages:     '++id, sentAt, status',
  syncQueue:    '++id, table, operation, createdAt, attempts',
});

export default db;