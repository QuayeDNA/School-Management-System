import db from './db';
import { generateSampleStudents } from '../components/utils/generateStudents';

async function seed() {
  console.log('Seeding database...');

  const existingGrades = await db.grades.count();
  if (existingGrades === 0) {
    const grades = [
      'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
      'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
      'JHS 1', 'JHS 2', 'JHS 3',
    ];

    await db.grades.bulkAdd(grades.map((name) => ({ name })));
    console.log('Seeded grades');
  }

  const existingStudents = await db.students.count();
  if (existingStudents === 0) {
    const students = generateSampleStudents();
    await db.students.bulkAdd(students.map((s) => ({ ...s, syncStatus: 'synced' })));
    console.log(`Seeded ${students.length} students`);
  }

  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
