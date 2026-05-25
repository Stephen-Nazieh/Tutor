/**
 * Specialty Categories — Universities, Languages, Professional
 * Used alongside exam categories in CategorySelector and /categories page
 */

export interface ExamCategory {
  id: string
  label: string
  exams: string[]
}

// ─── Languages ───────────────────────────────────────────────────────────────

export const LANGUAGE_CATEGORIES: ExamCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    exams: [
      'English',
      'Mandarin Chinese',
      'Spanish',
      'French',
      'German',
      'Japanese',
      'Korean',
      'Arabic',
      'Portuguese',
      'Russian',
    ],
  },
]

// ─── Professional (Certifications + Subjects) ────────────────────────────────

export const PROFESSIONAL_CATEGORIES: ExamCategory[] = [
  {
    id: 'professional',
    label: 'Professional',
    exams: [
      'CFA (Chartered Financial Analyst)',
      'CPA (Certified Public Accountant)',
      'ACCA',
      'CIMA',
      'FRM (Financial Risk Manager)',
      'PMP (Project Management Professional)',
      'Certified ScrumMaster (CSM)',
      'Six Sigma',
      'AWS Certified Solutions Architect',
      'Microsoft Azure Administrator',
      'Google Cloud Professional',
      'Cisco CCNA',
      'CISSP',
      'CISA',
      'CompTIA Security+',
      'ITIL Foundation',
      'Business & Management',
      'Marketing & Digital Strategy',
      'Financial Analysis & Investment',
      'Data Analytics & Data Science',
    ],
  },
]

// ─── Universities by Country (source of truth) ───────────────────────────────

// Asia
const ASIA_UNIVERSITIES: Record<string, string[]> = {
  CN: [
    'Tsinghua University',
    'Peking University',
    'Fudan University',
    'Shanghai Jiao Tong University',
    'Zhejiang University',
    'University of Science and Technology of China',
    'Nanjing University',
    'Wuhan University',
    'Harbin Institute of Technology',
    'Sun Yat-sen University',
    'Beijing Normal University',
    "Xi'an Jiaotong University",
    'Huazhong University of Science and Technology',
    'Tianjin University',
    'Nankai University',
    'Tongji University',
    'Southeast University',
    'Beijing Institute of Technology',
    'Xiamen University',
    'Sichuan University',
  ],
  JP: [
    'University of Tokyo',
    'Kyoto University',
    'Tokyo Institute of Technology',
    'Osaka University',
    'Tohoku University',
    'Nagoya University',
    'Kyushu University',
    'Hokkaido University',
    'Waseda University',
    'Keio University',
  ],
  KR: [
    'Seoul National University',
    'KAIST',
    'Yonsei University',
    'Korea University',
    'POSTECH',
    'Hanyang University',
    'Kyung Hee University',
  ],
  IN: [
    'Indian Institute of Technology Bombay',
    'Indian Institute of Technology Delhi',
    'Indian Institute of Technology Madras',
    'Indian Institute of Science',
    'University of Delhi',
    'Jawaharlal Nehru University',
    'University of Mumbai',
    'Anna University',
  ],
  SG: [
    'National University of Singapore',
    'Nanyang Technological University',
    'Singapore Management University',
  ],
  HK: [
    'University of Hong Kong',
    'Chinese University of Hong Kong',
    'Hong Kong University of Science and Technology',
    'City University of Hong Kong',
    'Hong Kong Polytechnic University',
  ],
  TW: [
    'National Taiwan University',
    'National Tsing Hua University',
    'National Cheng Kung University',
  ],
  TH: [
    'Chulalongkorn University',
    'Mahidol University',
    'Thammasat University',
  ],
  MY: [
    'University of Malaya',
    'Universiti Teknologi Malaysia',
    'Universiti Putra Malaysia',
  ],
  ID: [
    'University of Indonesia',
    'Gadjah Mada University',
    'Bandung Institute of Technology',
  ],
  PH: [
    'University of the Philippines',
    'Ateneo de Manila University',
    'De La Salle University',
  ],
  VN: [
    'Vietnam National University Hanoi',
    'Vietnam National University Ho Chi Minh City',
  ],
  BD: [
    'University of Dhaka',
    'Bangladesh University of Engineering and Technology',
  ],
  PK: [
    'Quaid-i-Azam University',
    'Lahore University of Management Sciences',
  ],
  LK: [
    'University of Colombo',
    'University of Peradeniya',
  ],
  NP: ['Tribhuvan University'],
  MM: ['University of Yangon'],
  KH: ['Royal University of Phnom Penh'],
  LA: ['National University of Laos'],
  MN: ['National University of Mongolia'],
  BN: ['Universiti Brunei Darussalam'],
}

// Europe
const EUROPE_UNIVERSITIES: Record<string, string[]> = {
  GB: [
    'University of Oxford',
    'University of Cambridge',
    'Imperial College London',
    'University College London',
    'London School of Economics',
    'University of Edinburgh',
    'University of Manchester',
    "King's College London",
    'University of Bristol',
    'University of Warwick',
    'University of Glasgow',
    'University of Birmingham',
    'University of Sheffield',
    'University of Leeds',
    'University of Nottingham',
    'University of Southampton',
    'Durham University',
    'University of St Andrews',
    'University of Exeter',
    'Lancaster University',
    'University of York',
    'Cardiff University',
    'University of Liverpool',
    'Newcastle University',
  ],
  DE: [
    'Technical University of Munich',
    'Ludwig Maximilian University of Munich',
    'Heidelberg University',
    'Humboldt University of Berlin',
    'Free University of Berlin',
    'RWTH Aachen University',
    'Karlsruhe Institute of Technology',
    'Technical University of Berlin',
    'University of Freiburg',
    'University of Tübingen',
  ],
  FR: [
    'Sorbonne University',
    'Paris-Saclay University',
    'École Polytechnique',
    'PSL University',
    'University of Paris',
    'École Normale Supérieure',
    'Grenoble Alpes University',
    'Aix-Marseille University',
  ],
  NL: [
    'University of Amsterdam',
    'Delft University of Technology',
    'Wageningen University',
    'Utrecht University',
    'Leiden University',
    'Eindhoven University of Technology',
  ],
  CH: [
    'ETH Zurich',
    'EPFL',
    'University of Zurich',
    'University of Geneva',
  ],
  IT: [
    'University of Bologna',
    'Sapienza University of Rome',
    'Politecnico di Milano',
    'University of Padua',
  ],
  ES: [
    'University of Barcelona',
    'Autonomous University of Barcelona',
    'Complutense University of Madrid',
  ],
  SE: [
    'Karolinska Institute',
    'Lund University',
    'KTH Royal Institute of Technology',
    'Uppsala University',
  ],
  DK: [
    'University of Copenhagen',
    'Technical University of Denmark',
    'Aarhus University',
  ],
  NO: [
    'University of Oslo',
    'Norwegian University of Science and Technology',
  ],
  FI: [
    'University of Helsinki',
    'Aalto University',
  ],
  BE: [
    'KU Leuven',
    'Ghent University',
    'Université catholique de Louvain',
  ],
  AT: [
    'University of Vienna',
    'Vienna University of Technology',
  ],
  IE: [
    'Trinity College Dublin',
    'University College Dublin',
  ],
  PT: [
    'University of Lisbon',
    'University of Porto',
  ],
  PL: [
    'University of Warsaw',
    'Jagiellonian University',
  ],
  CZ: [
    'Charles University',
    'Czech Technical University in Prague',
  ],
  HU: ['Eötvös Loránd University'],
  GR: [
    'National and Kapodistrian University of Athens',
    'Aristotle University of Thessaloniki',
  ],
  RU: [
    'Lomonosov Moscow State University',
    'Saint Petersburg State University',
  ],
  TR: [
    'Middle East Technical University',
    'Bilkent University',
    'Koç University',
  ],
  UA: [
    'Taras Shevchenko National University of Kyiv',
  ],
}

// North America
const NORTH_AMERICA_UNIVERSITIES: Record<string, string[]> = {
  US: [
    'Harvard University',
    'Stanford University',
    'Massachusetts Institute of Technology',
    'California Institute of Technology',
    'Princeton University',
    'Yale University',
    'Columbia University',
    'University of Chicago',
    'University of Pennsylvania',
    'Northwestern University',
    'Duke University',
    'Johns Hopkins University',
    'Dartmouth College',
    'Brown University',
    'Cornell University',
    'University of California Berkeley',
    'University of California Los Angeles',
    'University of Michigan',
    'Carnegie Mellon University',
    'New York University',
    'University of Southern California',
    'University of California San Diego',
    'University of Washington',
    'University of Wisconsin Madison',
    'University of Illinois Urbana-Champaign',
    'University of Texas at Austin',
    'Georgia Institute of Technology',
    'University of North Carolina Chapel Hill',
    'University of California Santa Barbara',
    'University of California Irvine',
    'University of Florida',
    'University of Minnesota',
    'Purdue University',
    'University of Maryland',
    'Boston University',
    'Pennsylvania State University',
    'Ohio State University',
    'Rice University',
    'Washington University in St. Louis',
    'University of Notre Dame',
    'Vanderbilt University',
    'Emory University',
    'Georgetown University',
    'Tufts University',
    'University of Rochester',
    'University of California Davis',
    'Texas A&M University',
    'University of Virginia',
    'University of Pittsburgh',
    'Michigan State University',
    'Indiana University Bloomington',
    'Arizona State University',
    'University of Colorado Boulder',
    'University of Arizona',
    'Northeastern University',
    'University of Miami',
    'Brigham Young University',
    'University of Utah',
    'North Carolina State University',
    'Virginia Tech',
    'University of Massachusetts Amherst',
  ],
  CA: [
    'University of Toronto',
    'University of British Columbia',
    'McGill University',
    'University of Waterloo',
    'University of Alberta',
    'McMaster University',
    'Western University',
    'University of Calgary',
    "Queen's University",
    'University of Ottawa',
    'University of Montreal',
    'Dalhousie University',
    'Simon Fraser University',
    'University of Victoria',
    'York University',
    'University of Saskatchewan',
  ],
  MX: [
    'National Autonomous University of Mexico',
    'Monterrey Institute of Technology',
    'Metropolitan Autonomous University',
  ],
  CR: ['University of Costa Rica'],
  PA: ['University of Panama'],
}

// Middle East
const MIDDLE_EAST_UNIVERSITIES: Record<string, string[]> = {
  AE: [
    'United Arab Emirates University',
    'Khalifa University',
    'American University of Sharjah',
    'University of Dubai',
    'Zayed University',
    'Abu Dhabi University',
  ],
  SA: [
    'King Saud University',
    'King Abdulaziz University',
    'King Fahd University of Petroleum and Minerals',
    'King Abdullah University of Science and Technology',
    'Umm Al-Qura University',
    'Imam Abdulrahman Bin Faisal University',
  ],
  QA: [
    'Qatar University',
    'Hamad Bin Khalifa University',
    'Texas A&M University at Qatar',
    'Carnegie Mellon University in Qatar',
  ],
  KW: ['Kuwait University'],
  BH: [
    'University of Bahrain',
    'Arabian Gulf University',
  ],
  OM: ['Sultan Qaboos University'],
  JO: [
    'University of Jordan',
    'Jordan University of Science and Technology',
  ],
  LB: [
    'American University of Beirut',
    'Lebanese University',
  ],
  EG: [
    'Cairo University',
    'Ain Shams University',
    'Alexandria University',
    'American University in Cairo',
    'Mansoura University',
    'Assiut University',
  ],
  IR: [
    'University of Tehran',
    'Sharif University of Technology',
    'Iran University of Science and Technology',
  ],
  IQ: [
    'University of Baghdad',
    'University of Basrah',
  ],
  IL: [
    'Hebrew University of Jerusalem',
    'Technion — Israel Institute of Technology',
    'Tel Aviv University',
    'Weizmann Institute of Science',
    'Bar-Ilan University',
  ],
  PS: ['Birzeit University'],
  SY: [
    'Damascus University',
    'University of Aleppo',
  ],
  YE: ["Sana'a University"],
  LY: ['University of Tripoli'],
  SD: ['University of Khartoum'],
  MA: [
    'Mohammed V University',
    'Cadi Ayyad University',
  ],
  TN: [
    'University of Tunis',
    'Tunis El Manar University',
  ],
  DZ: [
    'University of Algiers',
    'USTHB',
  ],
}

// Oceania
const OCEANIA_UNIVERSITIES: Record<string, string[]> = {
  AU: [
    'University of Melbourne',
    'University of Sydney',
    'Australian National University',
    'University of Queensland',
    'University of New South Wales',
    'Monash University',
    'University of Western Australia',
    'University of Adelaide',
    'University of Technology Sydney',
    'University of Newcastle',
    'Queensland University of Technology',
    'Macquarie University',
    'RMIT University',
    'Deakin University',
    'University of Wollongong',
    'Curtin University',
    'Griffith University',
    'University of South Australia',
    'Swinburne University of Technology',
    'La Trobe University',
    'Flinders University',
    'James Cook University',
  ],
  NZ: [
    'University of Auckland',
    'University of Otago',
    'Victoria University of Wellington',
    'University of Canterbury',
    'Massey University',
    'University of Waikato',
    'Lincoln University',
    'Auckland University of Technology',
  ],
  FJ: [
    'University of the South Pacific',
    'Fiji National University',
  ],
  PG: ['University of Papua New Guinea'],
  WS: ['National University of Samoa'],
}

// South America
const SOUTH_AMERICA_UNIVERSITIES: Record<string, string[]> = {
  BR: [
    'University of São Paulo',
    'State University of Campinas',
    'Federal University of Rio de Janeiro',
    'Federal University of Minas Gerais',
    'Federal University of Rio Grande do Sul',
    'University of Brasília',
    'Federal University of São Paulo',
    'Federal University of Santa Catarina',
    'Federal University of Bahia',
    'Pontifical Catholic University of Rio de Janeiro',
    'Pontifical Catholic University of São Paulo',
  ],
  AR: [
    'University of Buenos Aires',
    'National University of La Plata',
    'National University of Córdoba',
    'Torcuato Di Tella University',
  ],
  CL: [
    'University of Chile',
    'Pontifical Catholic University of Chile',
    'University of Santiago Chile',
  ],
  CO: [
    'National University of Colombia',
    'University of the Andes',
    'Pontifical Xavierian University',
  ],
  PE: [
    'National University of San Marcos',
    'Pontifical Catholic University of Peru',
  ],
  VE: [
    'Central University of Venezuela',
    'Simón Bolívar University',
  ],
  EC: [
    'Central University of Ecuador',
    'Escuela Politécnica Nacional',
  ],
  UY: ['University of the Republic'],
  PY: ['National University of Asunción'],
  BO: ['Higher University of San Andrés'],
}

// Africa
const AFRICA_UNIVERSITIES: Record<string, string[]> = {
  ZA: [
    'University of Cape Town',
    'University of the Witwatersrand',
    'Stellenbosch University',
    'University of KwaZulu-Natal',
    'University of Pretoria',
    'University of Johannesburg',
    'North-West University',
    'University of the Western Cape',
    'Rhodes University',
    'University of South Africa',
  ],
  NG: [
    'University of Ibadan',
    'University of Lagos',
    'Obafemi Awolowo University',
    'Ahmadu Bello University',
    'University of Nigeria',
    'Covenant University',
    'University of Benin',
    'University of Ilorin',
  ],
  KE: [
    'University of Nairobi',
    'Kenyatta University',
    'Strathmore University',
    'Moi University',
  ],
  GH: [
    'University of Ghana',
    'Kwame Nkrumah University of Science and Technology',
    'University of Cape Coast',
  ],
  EG: [
    'Cairo University',
    'Ain Shams University',
    'Alexandria University',
  ],
  ET: ['Addis Ababa University'],
  UG: ['Makerere University'],
  TZ: ['University of Dar es Salaam'],
  RW: ['University of Rwanda'],
  BW: ['University of Botswana'],
  NA: ['University of Namibia'],
  ZM: ['University of Zambia'],
  ZW: ['University of Zimbabwe'],
  SN: ['Cheikh Anta Diop University'],
  CI: ['Félix Houphouët-Boigny University'],
  CM: ['University of Yaoundé I'],
  MA: ['Mohammed V University'],
  TN: ['Tunis El Manar University'],
  DZ: ['University of Algiers'],
  LY: ['University of Tripoli'],
  SD: ['University of Khartoum'],
}

// ─── Derived region categories (backward compatible) ─────────────────────────

export const UNIVERSITY_CATEGORIES: ExamCategory[] = [
  {
    id: 'universities-asia',
    label: 'Universities — Asia',
    exams: Object.values(ASIA_UNIVERSITIES).flat(),
  },
  {
    id: 'universities-europe',
    label: 'Universities — Europe',
    exams: Object.values(EUROPE_UNIVERSITIES).flat(),
  },
  {
    id: 'universities-north-america',
    label: 'Universities — North America',
    exams: Object.values(NORTH_AMERICA_UNIVERSITIES).flat(),
  },
  {
    id: 'universities-middle-east',
    label: 'Universities — Middle East',
    exams: Object.values(MIDDLE_EAST_UNIVERSITIES).flat(),
  },
  {
    id: 'universities-oceania',
    label: 'Universities — Oceania',
    exams: Object.values(OCEANIA_UNIVERSITIES).flat(),
  },
  {
    id: 'universities-south-america',
    label: 'Universities — South America',
    exams: Object.values(SOUTH_AMERICA_UNIVERSITIES).flat(),
  },
  {
    id: 'universities-africa',
    label: 'Universities — Africa',
    exams: Object.values(AFRICA_UNIVERSITIES).flat(),
  },
]

// ─── Country-level lookup for filtering ──────────────────────────────────────

export const UNIVERSITIES_BY_COUNTRY_CODE: Record<string, string[]> = {
  ...ASIA_UNIVERSITIES,
  ...EUROPE_UNIVERSITIES,
  ...NORTH_AMERICA_UNIVERSITIES,
  ...MIDDLE_EAST_UNIVERSITIES,
  ...OCEANIA_UNIVERSITIES,
  ...SOUTH_AMERICA_UNIVERSITIES,
  ...AFRICA_UNIVERSITIES,
}

// Helper: get region ID from country code based on which university group it's in
export function getUniversityRegionId(countryCode: string): string | null {
  if (ASIA_UNIVERSITIES[countryCode]) return 'asia'
  if (EUROPE_UNIVERSITIES[countryCode]) return 'europe'
  if (NORTH_AMERICA_UNIVERSITIES[countryCode]) return 'north-america'
  if (MIDDLE_EAST_UNIVERSITIES[countryCode]) return 'middle-east'
  if (OCEANIA_UNIVERSITIES[countryCode]) return 'oceania'
  if (SOUTH_AMERICA_UNIVERSITIES[countryCode]) return 'south-america'
  if (AFRICA_UNIVERSITIES[countryCode]) return 'africa'
  return null
}

// ─── Flat exports for convenience ────────────────────────────────────────────

export const SPECIALTY_CATEGORIES: ExamCategory[] = [
  ...UNIVERSITY_CATEGORIES,
  ...LANGUAGE_CATEGORIES,
  ...PROFESSIONAL_CATEGORIES,
]
