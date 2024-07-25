// utils/generateStudents.js

import faker from 'faker';

const GRADES = [
  'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JHS 1', 'JHS 2', 'JHS 3'
];

export const generateSampleStudents = (numStudents) => {
  const students = [];

  for (let i = 0; i < numStudents; i++) {
    const student = {
      id: i + 1,
      name: faker.name.findName(),
      dateOfBirth: faker.date.past(18, new Date('2005-01-01')).toISOString().split('T')[0],
      gender: faker.random.arrayElement(['Male', 'Female']),
      address: faker.address.streetAddress(),
      contactNumber: faker.phone.phoneNumber(),
      email: faker.internet.email(),
      guardianName: faker.name.findName(),
      guardianContact: faker.phone.phoneNumber(),
      grade: faker.random.arrayElement(GRADES),
      status: faker.random.arrayElement(['Active', 'Inactive'])
    };

    students.push(student);
  }

  return students;
};
