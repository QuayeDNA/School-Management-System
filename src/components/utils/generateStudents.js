// utils/generateStudents.js

const GRADES = [
  'Creche', 'Nursery 1', 'Nursery 2', 'KG 1', 'KG 2',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JHS 1', 'JHS 2', 'JHS 3'
];

const FIRST_NAMES = [
  'Kwame', 'Ama', 'Kofi', 'Akua', 'Yaw', 'Yaa', 'Kwesi', 'Esi', 'Kojo', 'Akosua',
  'Kwabena', 'Abena', 'Kwaku', 'Adwoa', 'Mensah', 'Gifty', 'Ato', 'Efua', 'Fiifi', 'Maame'
];

const LAST_NAMES = [
  'Asante', 'Owusu', 'Boateng', 'Mensah', 'Agyemang', 'Osei', 'Addo', 'Acheampong', 'Boadu', 'Darko',
  'Kumi', 'Nyame', 'Appiah', 'Agyei', 'Sarpong', 'Danso', 'Ankomah', 'Frimpong', 'Baah', 'Yeboah'
];

const generateName = () => {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
};

const generatePhoneNumber = () => {
  const prefixes = ['020', '024', '027', '028', '050', '054', '055', '059'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}${number}`;
};

const generateEmail = (name) => {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  const nameParts = name.toLowerCase().split(' ');
  const username = `${nameParts[0]}.${nameParts[1]}${Math.floor(Math.random() * 100)}`;
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
};

const generateDateOfBirth = (grade) => {
  const currentYear = new Date().getFullYear();
  let yearOfBirth;

  switch (grade) {
    case 'Creche':
    case 'Nursery 1':
    case 'Nursery 2':
      yearOfBirth = currentYear - Math.floor(Math.random() * 2) - 3;
      break;
    case 'KG 1':
    case 'KG 2':
      yearOfBirth = currentYear - Math.floor(Math.random() * 2) - 5;
      break;
    case 'Primary 1':
    case 'Primary 2':
    case 'Primary 3':
    case 'Primary 4':
    case 'Primary 5':
    case 'Primary 6':
      yearOfBirth = currentYear - Math.floor(Math.random() * 6) - 6;
      break;
    case 'JHS 1':
    case 'JHS 2':
    case 'JHS 3':
      yearOfBirth = currentYear - Math.floor(Math.random() * 3) - 12;
      break;
    default:
      yearOfBirth = currentYear - Math.floor(Math.random() * 15) - 3;
  }

  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Simplifying to avoid month-specific day counts
  return `${yearOfBirth}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

export const generateSampleStudents = () => {
  let students = [];
  let id = 1;

  GRADES.forEach(grade => {
    const numStudents = Math.floor(Math.random() * 10) + 20; // 20 to 29 students per grade
    for (let i = 0; i < numStudents; i++) {
      const name = generateName();
      const student = {
        id: id++,
        name: name,
        dateOfBirth: generateDateOfBirth(grade),
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        address: `${Math.floor(Math.random() * 100) + 1} ${LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]} Street, Accra`,
        contactNumber: generatePhoneNumber(),
        email: generateEmail(name),
        guardianName: generateName(),
        guardianContact: generatePhoneNumber(),
        grade: grade,
        status: Math.random() > 0.1 ? 'Active' : 'Inactive' // 90% chance of being active
      };
      students.push(student);
    }
  });

  return students;
};