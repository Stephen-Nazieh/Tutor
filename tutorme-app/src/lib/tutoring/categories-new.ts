/**
 * Comprehensive Categories Data Structure
 * Based on Categories.docx document
 */

export interface Country {
  code: string
  name: string
  flag?: string
  nationalExams: ExamCategory[]
  subjectCourses: SubjectCourse[]
}

export interface ExamCategory {
  id: string
  label: string
  exams: string[]
}

export interface SubjectCourse {
  gradeLevel: string
  subjects: string[]
}

export interface Region {
  id: string
  name: string
  countries: Country[]
}

// Global Exam Categories - Available for all countries
export const GLOBAL_EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'admission-exams',
    label: 'Admission Exams',
    exams: ['SAT', 'ACT'],
  },
  {
    id: 'english-proficiency',
    label: 'English Proficiency',
    exams: [
      'IELTS Academic',
      'IELTS General',
      'TOEFL iBT',
      'PTE Academic',
      'Duolingo English Test',
      'CPE',
      'CAE',
      'Cambridge B2',
      'International ESOL',
      'Oxford Test of English',
      'iTEP Academic',
      'TOEIC',
      'MET',
      'EIKEN',
    ],
  },
  {
    id: 'postgraduate-exams',
    label: 'Postgraduate Exams',
    exams: ['GRE', 'GMAT', 'LSAT', 'MCAT', 'UCAT'],
  },
  {
    id: 'ap-stem',
    label: 'AP - STEM',
    exams: [
      'AP Calculus AB',
      'AP Calculus BC',
      'AP Statistics',
      'AP Biology',
      'AP Chemistry',
      'AP Physics 1',
      'AP Physics 2',
      'AP Physics C: Mechanics',
      'AP Physics C: Electricity and Magnetism',
      'AP Environmental Science',
      'AP Computer Science A',
      'AP Computer Science Principles',
    ],
  },
  {
    id: 'ap-humanities',
    label: 'AP - Humanities',
    exams: [
      'AP English & Composition',
      'AP Literature & Composition',
      'AP Seminar',
      'AP Research',
      'AP World History: Modern',
      'AP United States History',
      'AP European History',
      'AP Human Geography',
      'AP Psychology',
      'AP Macroeconomics',
      'AP Microeconomics',
      'AP Comparative Government and Politics',
      'AP United States Government and Politics',
    ],
  },
  {
    id: 'ap-languages',
    label: 'AP - Languages',
    exams: [
      'AP Chinese Language and Culture',
      'AP French Language and Culture',
      'AP German Language and Culture',
      'AP Italian Language and Culture',
      'AP Japanese Language and Culture',
      'AP Latin',
      'AP Spanish Language and Culture',
      'AP Spanish Literature and Culture',
    ],
  },
  {
    id: 'ap-art',
    label: 'AP - Art',
    exams: [
      'AP Art History',
      'AP Music Theory',
      'AP Studio Art: 2-D Art and Design',
      'AP Studio Art: 3-D Art and Design',
      'AP Drawing',
    ],
  },
  {
    id: 'as-courses',
    label: 'AS Level Courses',
    exams: [
      'AS Level Mathematics',
      'AS Level Further Mathematics',
      'AS Level Physics',
      'AS Level Chemistry',
      'AS Level Biology',
      'AS Level Computer Science',
      'AS Level Information Technology',
      'AS Level Economics',
      'AS Level Business',
      'AS Level Accounting',
      'AS Level Psychology',
      'AS Level Sociology',
      'AS Level History',
      'AS Level Geography',
      'AS Level English Language',
      'AS Level English Literature',
      'AS Level Global Perspectives & Research',
      'AS Level Art and Design',
      'AS Level Media Studies',
    ],
  },
  {
    id: 'a-level-courses',
    label: 'A Level Courses',
    exams: [
      'A Level Mathematics',
      'A Level Further Mathematics',
      'A Level Physics',
      'A Level Chemistry',
      'A Level Biology',
      'A Level Computer Science',
      'A Level Information Technology',
      'A Level Economics',
      'A Level Business',
      'A Level Accounting',
      'A Level Psychology',
      'A Level Sociology',
      'A Level History',
      'A Level Geography',
      'A Level English Language',
      'A Level English Literature',
      'A Level Global Perspectives & Research',
      'A Level Art and Design',
      'A Level Media Studies',
    ],
  },
  {
    id: 'ib-courses',
    label: 'IB Courses',
    exams: [
      'IB Mathematics: Analysis and Approaches',
      'IB Mathematics: Applications and Interpretation',
      'IB Physics',
      'IB Chemistry',
      'IB Biology',
      'IB Computer Science',
      'IB Economics',
      'IB Business Management',
      'IB Psychology',
      'IB History',
      'IB Geography',
      'IB English A: Language and Literature',
      'IB English A: Literature',
      'IB Language B Courses',
      'IB Visual Arts',
      'IB Theory of Knowledge (TOK)',
      'IB Extended Essay (EE)',
    ],
  },
]

// Helper function to create a country
function createCountry(
  code: string,
  name: string,
  nationalExams: ExamCategory[],
  subjectCourses: SubjectCourse[]
): Country {
  return { code, name, nationalExams, subjectCourses }
}

// Helper function to create national exam category
function createNationalExam(id: string, label: string, exams: string[]): ExamCategory {
  return { id, label, exams }
}

// Helper function to create subject courses
function createSubjectCourse(gradeLevel: string, subjects: string[]): SubjectCourse {
  return { gradeLevel, subjects }
}

// ASIA Region
export const ASIA_COUNTRIES: Country[] = [
  createCountry(
    'HK',
    'Hong Kong',
    [
      createNationalExam('hkdse-s5', 'HKDSE Preparation (S5)', [
        'S5 HKDSE Chinese Language Preparation',
        'S5 HKDSE English Language Preparation',
        'S5 HKDSE Mathematics Preparation',
        'S5 HKDSE Mathematics M1 Preparation',
        'S5 HKDSE Mathematics M2 Preparation',
        'S5 HKDSE Physics Preparation',
        'S5 HKDSE Chemistry Preparation',
        'S5 HKDSE Biology Preparation',
        'S5 HKDSE Combined Science Preparation',
      ]),
      createNationalExam('hkdse-s6', 'HKDSE Preparation (S6)', [
        'S6 HKDSE Chinese Language Preparation',
        'S6 HKDSE English Language Preparation',
        'S6 HKDSE Mathematics Preparation',
        'S6 HKDSE Mathematics M1 Preparation',
        'S6 HKDSE Mathematics M2 Preparation',
        'S6 HKDSE Physics Preparation',
        'S6 HKDSE Chemistry Preparation',
        'S6 HKDSE Biology Preparation',
        'S6 HKDSE Combined Science Preparation',
      ]),
    ],
    [
      createSubjectCourse('Secondary 4 (S4 / Grade 10)', [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Mathematics Extended Module 1 (M1)',
        'Mathematics Extended Module 2 (M2)',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ]),
      createSubjectCourse('Secondary 5 (S5 / Grade 11)', [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Mathematics Extended Module 1 (M1)',
        'Mathematics Extended Module 2 (M2)',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ]),
      createSubjectCourse('Secondary 6 (S6 / Grade 12)', [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Mathematics Extended Module 1 (M1)',
        'Mathematics Extended Module 2 (M2)',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ]),
    ]
  ),
  createCountry(
    'KR',
    'Korea',
    [
      createNationalExam('csat', 'CSAT Preparation', [
        'CSAT Korean Language Preparation',
        'CSAT English Preparation',
        'CSAT Mathematics Preparation',
        'CSAT Physics Preparation',
        'CSAT Chemistry Preparation',
        'CSAT Biology Preparation',
        'CSAT Earth Science Preparation',
      ]),
    ],
    [
      createSubjectCourse('High School Year 1', [
        'Korean Language',
        'English Language',
        'Mathematics',
        'Algebra',
        'Geometry',
        'Probability & Statistics',
        'Integrated Science',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ]),
      createSubjectCourse('High School Year 2', [
        'Korean Language',
        'English Language',
        'Mathematics',
        'Algebra',
        'Calculus Foundations',
        'Probability & Statistics',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ]),
      createSubjectCourse('High School Year 3', [
        'Korean Language',
        'English Language',
        'Mathematics',
        'Calculus',
        'Probability & Statistics',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ]),
    ]
  ),
  createCountry(
    'SG',
    'Singapore',
    [
      createNationalExam('gce-o-level', 'GCE O-Level Preparation', [
        'O-Level English Preparation',
        'O-Level Elementary Mathematics Preparation',
        'O-Level Additional Mathematics Preparation',
        'O-Level Physics Preparation',
        'O-Level Chemistry Preparation',
        'O-Level Biology Preparation',
        'O-Level Combined Science Preparation',
      ]),
      createNationalExam('gce-a-level', 'GCE A-Level Preparation', [
        'A-Level General Paper Preparation',
        'A-Level Mathematics Preparation',
        'A-Level Physics Preparation',
        'A-Level Chemistry Preparation',
        'A-Level Biology Preparation',
      ]),
    ],
    [
      createSubjectCourse('Secondary 4 (Sec 4 / Grade 10)', [
        'English Language',
        'Elementary Mathematics',
        'Additional Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ]),
      createSubjectCourse('Secondary 5 (Sec 5 / Grade 11)', [
        'English Language',
        'Elementary Mathematics',
        'Additional Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ]),
      createSubjectCourse('Junior College Year 1 (JC1 / Grade 11)', [
        'General Paper (English Academic Literacy)',
        'H1 Mathematics',
        'H2 Mathematics',
        'H1 Physics',
        'H2 Physics',
        'H1 Chemistry',
        'H2 Chemistry',
        'H1 Biology',
        'H2 Biology',
      ]),
      createSubjectCourse('Junior College Year 2 (JC2 / Grade 12)', [
        'General Paper (English Academic Literacy)',
        'H1 Mathematics',
        'H2 Mathematics',
        'H1 Physics',
        'H2 Physics',
        'H1 Chemistry',
        'H2 Chemistry',
        'H1 Biology',
        'H2 Biology',
      ]),
    ]
  ),
  createCountry(
    'JP',
    'Japan',
    [
      createNationalExam('university-entrance', 'University Entrance Examination Preparation', [
        'Japanese University Entrance Japanese Language',
        'Japanese University Entrance English',
        'Japanese University Entrance Mathematics',
        'Japanese University Entrance Physics',
        'Japanese University Entrance Chemistry',
        'Japanese University Entrance Biology',
        'Japanese University Entrance Earth Science',
      ]),
    ],
    [
      createSubjectCourse('High School Year 1 (G10 / 高校1年)', [
        'Japanese Language',
        'English Language',
        'Mathematics I',
        'Mathematics A',
        'Basic Physics',
        'Basic Chemistry',
        'Basic Biology',
        'Earth Science Basics',
      ]),
      createSubjectCourse('High School Year 2 (G11 / 高校2年)', [
        'Japanese Language',
        'English Language',
        'Mathematics II',
        'Mathematics B',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ]),
      createSubjectCourse('High School Year 3 (G12 / 高校3年)', [
        'Japanese Language',
        'English Language',
        'Mathematics III',
        'Advanced Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ]),
    ]
  ),
  createCountry(
    'TH',
    'Thailand',
    [
      createNationalExam('university-admission', 'University Admission Examination', [
        'Thai University Admission Thai Language',
        'Thai University Admission English',
        'Thai University Admission Mathematics',
        'Thai University Admission Physics',
        'Thai University Admission Chemistry',
        'Thai University Admission Biology',
        'Thai University Admission Earth & Space Science',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Thai Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Thai Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Thai Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'IN',
    'India',
    [
      createNationalExam('jee', 'Engineering Entrance', [
        'JEE Main Preparation — Mathematics',
        'JEE Main Preparation — Physics',
        'JEE Main Preparation — Chemistry',
        'JEE Advanced Preparation — Mathematics',
        'JEE Advanced Preparation — Physics',
        'JEE Advanced Preparation — Chemistry',
      ]),
      createNationalExam('neet', 'Medical Entrance', [
        'NEET Preparation — Physics',
        'NEET Preparation — Chemistry',
        'NEET Preparation — Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'VN',
    'Vietnam',
    [
      createNationalExam('national-exam', 'National Examination Preparation', [
        'Vietnam National Exam — Vietnamese Language',
        'Vietnam National Exam — English',
        'Vietnam National Exam — Mathematics',
        'Vietnam National Exam — Physics',
        'Vietnam National Exam — Chemistry',
        'Vietnam National Exam — Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Vietnamese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Vietnamese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Vietnamese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'TW',
    'Taiwan',
    [
      createNationalExam('university-entrance', 'University Entrance Examination', [
        'Taiwan University Entrance Chinese',
        'Taiwan University Entrance English',
        'Taiwan University Entrance Mathematics',
        'Taiwan University Entrance Physics',
        'Taiwan University Entrance Chemistry',
        'Taiwan University Entrance Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'MY',
    'Malaysia',
    [
      createNationalExam('spm', 'SPM Examination', [
        'SPM Malay',
        'SPM English',
        'SPM Mathematics',
        'SPM Physics',
        'SPM Chemistry',
        'SPM Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Malay Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Malay Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Malay Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'ID',
    'Indonesia',
    [
      createNationalExam('university-admission', 'University Admission', [
        'University Admission Indonesian',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Indonesian Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Indonesian Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Indonesian Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry('PH', 'Philippines', [], []),
  createCountry(
    'IL',
    'Israel',
    [
      createNationalExam('bagrut', 'Bagrut', [
        'Bagrut Hebrew',
        'Bagrut English',
        'Bagrut Mathematics',
        'Bagrut Physics',
        'Bagrut Chemistry',
        'Bagrut Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Hebrew Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Hebrew Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Hebrew Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
]

// Middle East Region
export const MIDDLE_EAST_COUNTRIES: Country[] = [
  createCountry(
    'SA',
    'Saudi Arabia',
    [
      createNationalExam('university-admission', 'University Admission', [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'QA',
    'Qatar',
    [
      createNationalExam('university-admission', 'University Admission', [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'KW',
    'Kuwait',
    [
      createNationalExam('university-admission', 'University Admission', [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
  createCountry(
    'OM',
    'Oman',
    [
      createNationalExam('university-admission', 'University Admission', [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 11', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
      createSubjectCourse('Grade 12', [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ]),
    ]
  ),
]

// Europe Region
export const EUROPE_COUNTRIES: Country[] = [
  createCountry(
    'GB',
    'United Kingdom',
    [
      createNationalExam('gcse', 'GCSE', [
        'GCSE English Language',
        'GCSE English Literature',
        'GCSE Mathematics',
        'GCSE Biology',
        'GCSE Chemistry',
        'GCSE Physics',
        'GCSE Combined Science',
      ]),
      createNationalExam('a-level-uk', 'A Level', [
        'A Level English',
        'A Level Mathematics',
        'A Level Biology',
        'A Level Chemistry',
        'A Level Physics',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'English Language',
        'English Literature',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
        'Combined Science',
      ]),
      createSubjectCourse('Grade 11', [
        'English Language',
        'English Literature',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 12 (Age 17-18)', [
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 13', [
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
    ]
  ),
  createCountry(
    'DE',
    'Germany',
    [
      createNationalExam('abitur', 'Abitur', [
        'Abitur German',
        'Abitur English',
        'Abitur Mathematics',
        'Abitur Biology',
        'Abitur Chemistry',
        'Abitur Physics',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'German Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 11', [
        'German Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 12', [
        'German Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
    ]
  ),
  createCountry(
    'FR',
    'France',
    [
      createNationalExam('baccalaureat', 'Baccalauréat', [
        'Baccalauréat French',
        'Baccalauréat English',
        'Baccalauréat Mathematics',
        'Baccalauréat Biology',
        'Baccalauréat Chemistry',
        'Baccalauréat Physics',
      ]),
    ],
    [
      createSubjectCourse('Grade 10 (Seconde - Age 16)', [
        'French Language',
        'English Language',
        'Mathematics',
        'Biology & Earth Sciences',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 11 (Première - Age 17)', [
        'French Language',
        'English Language',
        'Mathematics',
        'Biology & Earth Sciences',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 12 (Terminale - Age 18)', [
        'French Language',
        'English Language',
        'Mathematics',
        'Biology & Earth Sciences',
        'Chemistry',
        'Physics',
      ]),
    ]
  ),
  createCountry(
    'NL',
    'Netherlands',
    [
      createNationalExam('dutch-national', 'National Examination', [
        'Dutch National Exam — Dutch',
        'Dutch National Exam — English',
        'Dutch National Exam — Mathematics',
        'Dutch National Exam — Biology',
        'Dutch National Exam — Chemistry',
        'Dutch National Exam — Physics',
      ]),
    ],
    [
      createSubjectCourse('Grade 10', [
        'Dutch Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 11', [
        'Dutch Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
      createSubjectCourse('Grade 12', [
        'Dutch Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ]),
    ]
  ),
  createCountry('BE', 'Belgium', [], []),
  createCountry('CH', 'Switzerland', [], []),
  createCountry('IT', 'Italy', [], []),
  createCountry('ES', 'Spain', [], []),
  createCountry('IE', 'Ireland', [], []),
  createCountry('PT', 'Portugal', [], []),
  createCountry('AT', 'Austria', [], []),
  createCountry('PL', 'Poland', [], []),
  createCountry('CZ', 'Czech Republic', [], []),
  createCountry('HU', 'Hungary', [], []),
  createCountry('RO', 'Romania', [], []),
  createCountry('GR', 'Greece', [], []),
  createCountry('TR', 'Turkey', [], []),
]

// Oceania Region
export const OCEANIA_COUNTRIES: Country[] = [
  createCountry('AU', 'Australia', [], []),
  createCountry('NZ', 'New Zealand', [], []),
]

// North America Region
export const NORTH_AMERICA_COUNTRIES: Country[] = [
  createCountry('US', 'United States', [], []),
  createCountry('CA', 'Canada', [], []),
  createCountry('MX', 'Mexico', [], []),
  createCountry('CR', 'Costa Rica', [], []),
  createCountry('PA', 'Panama', [], []),
  createCountry('DO', 'Dominican Republic', [], []),
]

// South America Region
export const SOUTH_AMERICA_COUNTRIES: Country[] = [
  createCountry('BR', 'Brazil', [], []),
  createCountry('CL', 'Chile', [], []),
  createCountry('PE', 'Peru', [], []),
  createCountry('CO', 'Colombia', [], []),
  createCountry('AR', 'Argentina', [], []),
  createCountry('UY', 'Uruguay', [], []),
  createCountry('EC', 'Ecuador', [], []),
]

// Africa Region
export const AFRICA_COUNTRIES: Country[] = [
  createCountry('NG', 'Nigeria', [], []),
  createCountry('KE', 'Kenya', [], []),
  createCountry('GH', 'Ghana', [], []),
  createCountry('EG', 'Egypt', [], []),
  createCountry('MA', 'Morocco', [], []),
  createCountry('TN', 'Tunisia', [], []),
  createCountry('BW', 'Botswana', [], []),
  createCountry('NA', 'Namibia', [], []),
  createCountry('ZA', 'South Africa', [], []),
]

// All Regions
export const REGIONS: Region[] = [
  { id: 'asia', name: 'Asia', countries: ASIA_COUNTRIES },
  { id: 'middle-east', name: 'Middle East', countries: MIDDLE_EAST_COUNTRIES },
  { id: 'europe', name: 'Europe', countries: EUROPE_COUNTRIES },
  { id: 'oceania', name: 'Oceania', countries: OCEANIA_COUNTRIES },
  { id: 'north-america', name: 'North America', countries: NORTH_AMERICA_COUNTRIES },
  { id: 'south-america', name: 'South America', countries: SOUTH_AMERICA_COUNTRIES },
  { id: 'africa', name: 'Africa', countries: AFRICA_COUNTRIES },
]

// All Countries Flat List
export const ALL_COUNTRIES_LIST: Country[] = [
  ...ASIA_COUNTRIES,
  ...MIDDLE_EAST_COUNTRIES,
  ...EUROPE_COUNTRIES,
  ...OCEANIA_COUNTRIES,
  ...NORTH_AMERICA_COUNTRIES,
  ...SOUTH_AMERICA_COUNTRIES,
  ...AFRICA_COUNTRIES,
]

// Helper functions
export function getCountryByCode(code: string): Country | undefined {
  return ALL_COUNTRIES_LIST.find(c => c.code === code)
}

export function getCountryByName(name: string): Country | undefined {
  return ALL_COUNTRIES_LIST.find(c => c.name.toLowerCase() === name.toLowerCase())
}

export function getCountriesByRegion(regionId: string): Country[] {
  const region = REGIONS.find(r => r.id === regionId)
  return region?.countries || []
}

// Special "Other" option for countries not listed
export const OTHER_COUNTRY: Country = {
  code: 'OTHER',
  name: 'Not Listed',
  nationalExams: [],
  subjectCourses: [],
}

// Get all available categories for a country (Global + National)
export function getCategoriesForCountry(countryCode: string | null): {
  global: ExamCategory[]
  national: ExamCategory[]
} {
  if (!countryCode || countryCode === 'OTHER') {
    return { global: GLOBAL_EXAM_CATEGORIES, national: [] }
  }

  const country = getCountryByCode(countryCode)
  return {
    global: GLOBAL_EXAM_CATEGORIES,
    national: country?.nationalExams || [],
  }
}
