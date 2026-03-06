export interface GlobalExamCategory {
  id: string
  label: string
  exams: string[]
}

export interface CountrySubjectsConfig {
  country: string
  subjectsAndExams: string[]
}

export const GLOBAL_EXAM_CATEGORIES: GlobalExamCategory[] = [
  {
    id: 'standardized-english',
    label: 'Standardized English Exams',
    exams: [
      'IELTS',
      'TOEFL iBT',
      'PTE Academic',
      'Duolingo English Test',
      'Cambridge KET',
      'Cambridge PET',
      'Cambridge FCE',
      'Cambridge CAE',
      'Cambridge CPE',
      'Oxford ELLT',
    ],
  },
  {
    id: 'undergrad-admissions',
    label: 'Undergraduate Admissions Exams',
    exams: [
      'SAT',
      'ACT',
      'SAT Subject Tests (Legacy)',
      'AP (Advanced Placement)',
      'International AS Levels',
      'IB (International Baccalaureate)',
      'AP Scholar Prep',
      'UCAT',
      'BMAT',
      'LNAT',
    ],
  },
  {
    id: 'ap',
    label: 'AP Advanced Placement',
    exams: [
      'AP Calculus AB',
      'AP Calculus BC',
      'AP Physics 1',
      'AP Physics 2',
      'AP Physics C',
      'AP Chemistry',
      'AP Biology',
      'AP Statistics',
      'AP English Language',
      'AP English Literature',
      'AP Computer Science A',
      'AP Economics',
      'AP World History',
      'AP US History',
    ],
  },
  {
    id: 'international-as',
    label: 'International AS Levels',
    exams: [
      'Cambridge AS Mathematics',
      'Cambridge AS Further Mathematics',
      'Cambridge AS Physics',
      'Cambridge AS Chemistry',
      'Cambridge AS Biology',
      'Cambridge AS English Language',
      'Cambridge AS Economics',
      'Cambridge AS Business',
      'Cambridge AS Computer Science',
    ],
  },
]

export const COUNTRY_SUBJECTS: CountrySubjectsConfig[] = [
  {
    country: 'United States',
    subjectsAndExams: [
      'Common Core Math',
      'NGSS Science',
      'US History',
      'AP Prep (All Subjects)',
      'SAT/ACT Strategy',
    ],
  },
  {
    country: 'United Kingdom',
    subjectsAndExams: [
      'GCSE Mathematics',
      'GCSE English Language',
      'GCSE English Literature',
      'GCSE Sciences',
      'A-Levels (All Subjects)',
    ],
  },
  {
    country: 'China',
    subjectsAndExams: [
      'Gaokao Mathematics',
      'Gaokao English',
      'Gaokao Physics',
      'Gaokao Chemistry',
      'Gaokao Biology',
    ],
  },
  {
    country: 'Singapore',
    subjectsAndExams: [
      'PSLE Mathematics',
      'PSLE English',
      'O-Level Mathematics',
      'O-Level Sciences',
      'IB Diploma (All Subjects)',
    ],
  },
  {
    country: 'India',
    subjectsAndExams: [
      'CBSE Mathematics',
      'CBSE Science',
      'ICSE English',
      'JEE Main',
      'NEET',
    ],
  },
  {
    country: 'Canada',
    subjectsAndExams: [
      'Ontario Grade 12 Math',
      'Ontario Grade 12 Physics',
      'Ontario Grade 12 Chemistry',
      'AP/IB Bridging',
    ],
  },
  {
    country: 'Australia',
    subjectsAndExams: [
      'HSC Mathematics',
      'VCE English',
      'ATAR Prep',
      'QCE Biology',
    ],
  },
]

export const COUNTRY_OPTIONS = COUNTRY_SUBJECTS.map((item) => item.country)

export function subjectsForCountry(country: string): string[] {
  const match = COUNTRY_SUBJECTS.find((item) => item.country === country)
  return match ? match.subjectsAndExams : []
}

export const AGGREGATED_CATEGORIES: string[] = Array.from(
  new Set([
    ...GLOBAL_EXAM_CATEGORIES.flatMap((category) => category.exams),
    ...COUNTRY_SUBJECTS.flatMap((entry) =>
      entry.subjectsAndExams.map((subject) => `${entry.country}: ${subject}`)
    ),
  ])
).sort()
