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

// ─── Universities — Asia (~80) ───────────────────────────────────────────────

export const UNIVERSITY_CATEGORIES: ExamCategory[] = [
  {
    id: 'universities-asia',
    label: 'Universities — Asia',
    exams: [
      // China
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
      'Xi\'an Jiaotong University',
      'Huazhong University of Science and Technology',
      'Tianjin University',
      'Nankai University',
      'Tongji University',
      'Southeast University',
      'Beijing Institute of Technology',
      'Xiamen University',
      'Sichuan University',
      // Japan
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
      // South Korea
      'Seoul National University',
      'KAIST',
      'Yonsei University',
      'Korea University',
      'POSTECH',
      'Hanyang University',
      'Kyung Hee University',
      // India
      'Indian Institute of Technology Bombay',
      'Indian Institute of Technology Delhi',
      'Indian Institute of Technology Madras',
      'Indian Institute of Science',
      'University of Delhi',
      'Jawaharlal Nehru University',
      'University of Mumbai',
      'Anna University',
      // Singapore
      'National University of Singapore',
      'Nanyang Technological University',
      'Singapore Management University',
      // Hong Kong
      'University of Hong Kong',
      'Chinese University of Hong Kong',
      'Hong Kong University of Science and Technology',
      'City University of Hong Kong',
      'Hong Kong Polytechnic University',
      // Taiwan
      'National Taiwan University',
      'National Tsing Hua University',
      'National Cheng Kung University',
      // Thailand
      'Chulalongkorn University',
      'Mahidol University',
      'Thammasat University',
      // Malaysia
      'University of Malaya',
      'Universiti Teknologi Malaysia',
      'Universiti Putra Malaysia',
      // Indonesia
      'University of Indonesia',
      'Gadjah Mada University',
      'Bandung Institute of Technology',
      // Philippines
      'University of the Philippines',
      'Ateneo de Manila University',
      'De La Salle University',
      // Vietnam
      'Vietnam National University Hanoi',
      'Vietnam National University Ho Chi Minh City',
      // Bangladesh
      'University of Dhaka',
      'Bangladesh University of Engineering and Technology',
      // Pakistan
      'Quaid-i-Azam University',
      'Lahore University of Management Sciences',
      // Sri Lanka
      'University of Colombo',
      'University of Peradeniya',
      // Nepal
      'Tribhuvan University',
      // Myanmar
      'University of Yangon',
      // Cambodia
      'Royal University of Phnom Penh',
      // Laos
      'National University of Laos',
      // Mongolia
      'National University of Mongolia',
      // Brunei
      'Universiti Brunei Darussalam',
    ],
  },

  // ─── Universities — Europe (~80) ────────────────────────────────────────────

  {
    id: 'universities-europe',
    label: 'Universities — Europe',
    exams: [
      // UK
      'University of Oxford',
      'University of Cambridge',
      'Imperial College London',
      'University College London',
      'London School of Economics',
      'University of Edinburgh',
      'University of Manchester',
      'King\'s College London',
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
      // Germany
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
      // France
      'Sorbonne University',
      'Paris-Saclay University',
      'École Polytechnique',
      'PSL University',
      'University of Paris',
      'École Normale Supérieure',
      'Grenoble Alpes University',
      'Aix-Marseille University',
      // Netherlands
      'University of Amsterdam',
      'Delft University of Technology',
      'Wageningen University',
      'Utrecht University',
      'Leiden University',
      'Eindhoven University of Technology',
      // Switzerland
      'ETH Zurich',
      'EPFL',
      'University of Zurich',
      'University of Geneva',
      // Italy
      'University of Bologna',
      'Sapienza University of Rome',
      'Politecnico di Milano',
      'University of Padua',
      // Spain
      'University of Barcelona',
      'Autonomous University of Barcelona',
      'Complutense University of Madrid',
      // Sweden
      'Karolinska Institute',
      'Lund University',
      'KTH Royal Institute of Technology',
      'Uppsala University',
      // Denmark
      'University of Copenhagen',
      'Technical University of Denmark',
      'Aarhus University',
      // Norway
      'University of Oslo',
      'Norwegian University of Science and Technology',
      // Finland
      'University of Helsinki',
      'Aalto University',
      // Belgium
      'KU Leuven',
      'Ghent University',
      'Université catholique de Louvain',
      // Austria
      'University of Vienna',
      'Vienna University of Technology',
      // Ireland
      'Trinity College Dublin',
      'University College Dublin',
      // Portugal
      'University of Lisbon',
      'University of Porto',
      // Poland
      'University of Warsaw',
      'Jagiellonian University',
      // Czech Republic
      'Charles University',
      'Czech Technical University in Prague',
      // Hungary
      'Eötvös Loránd University',
      // Greece
      'National and Kapodistrian University of Athens',
      'Aristotle University of Thessaloniki',
      // Russia
      'Lomonosov Moscow State University',
      'Saint Petersburg State University',
      // Turkey
      'Middle East Technical University',
      'Bilkent University',
      'Koç University',
      // Ukraine
      'Taras Shevchenko National University of Kyiv',
    ],
  },

  // ─── Universities — North America (~80) ─────────────────────────────────────

  {
    id: 'universities-north-america',
    label: 'Universities — North America',
    exams: [
      // USA — Ivy League + Top Private/Public
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
      // Canada
      'University of Toronto',
      'University of British Columbia',
      'McGill University',
      'University of Waterloo',
      'University of Alberta',
      'McMaster University',
      'Western University',
      'University of Calgary',
      'Queen\'s University',
      'University of Ottawa',
      'University of Montreal',
      'Dalhousie University',
      'Simon Fraser University',
      'University of Victoria',
      'York University',
      'University of Saskatchewan',
      // Mexico
      'National Autonomous University of Mexico',
      'Monterrey Institute of Technology',
      'Metropolitan Autonomous University',
      // Costa Rica
      'University of Costa Rica',
      // Panama
      'University of Panama',
    ],
  },

  // ─── Universities — Middle East (~60) ───────────────────────────────────────

  {
    id: 'universities-middle-east',
    label: 'Universities — Middle East',
    exams: [
      // UAE
      'United Arab Emirates University',
      'Khalifa University',
      'American University of Sharjah',
      'University of Dubai',
      'Zayed University',
      'Abu Dhabi University',
      // Saudi Arabia
      'King Saud University',
      'King Abdulaziz University',
      'King Fahd University of Petroleum and Minerals',
      'King Abdullah University of Science and Technology',
      'Umm Al-Qura University',
      'Imam Abdulrahman Bin Faisal University',
      // Qatar
      'Qatar University',
      'Hamad Bin Khalifa University',
      'Texas A&M University at Qatar',
      'Carnegie Mellon University in Qatar',
      // Kuwait
      'Kuwait University',
      // Bahrain
      'University of Bahrain',
      'Arabian Gulf University',
      // Oman
      'Sultan Qaboos University',
      // Jordan
      'University of Jordan',
      'Jordan University of Science and Technology',
      // Lebanon
      'American University of Beirut',
      'Lebanese University',
      // Egypt
      'Cairo University',
      'Ain Shams University',
      'Alexandria University',
      'American University in Cairo',
      'Mansoura University',
      'Assiut University',
      // Iran
      'University of Tehran',
      'Sharif University of Technology',
      'Iran University of Science and Technology',
      // Iraq
      'University of Baghdad',
      'University of Basrah',
      // Israel
      'Hebrew University of Jerusalem',
      'Technion — Israel Institute of Technology',
      'Tel Aviv University',
      'Weizmann Institute of Science',
      'Bar-Ilan University',
      // Palestine
      'Birzeit University',
      // Syria
      'Damascus University',
      'University of Aleppo',
      // Yemen
      'Sana\'a University',
      // Libya
      'University of Tripoli',
      // Sudan
      'University of Khartoum',
      // Morocco
      'Mohammed V University',
      'Cadi Ayyad University',
      // Tunisia
      'University of Tunis',
      'Tunis El Manar University',
      // Algeria
      'University of Algiers',
      'USTHB',
    ],
  },

  // ─── Universities — Oceania (~45) ───────────────────────────────────────────

  {
    id: 'universities-oceania',
    label: 'Universities — Oceania',
    exams: [
      // Australia
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
      // New Zealand
      'University of Auckland',
      'University of Otago',
      'Victoria University of Wellington',
      'University of Canterbury',
      'Massey University',
      'University of Waikato',
      'Lincoln University',
      'Auckland University of Technology',
      // Fiji
      'University of the South Pacific',
      'Fiji National University',
      // Papua New Guinea
      'University of Papua New Guinea',
      // Samoa
      'National University of Samoa',
    ],
  },

  // ─── Universities — South America (~45) ─────────────────────────────────────

  {
    id: 'universities-south-america',
    label: 'Universities — South America',
    exams: [
      // Brazil
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
      // Argentina
      'University of Buenos Aires',
      'National University of La Plata',
      'National University of Córdoba',
      'Torcuato Di Tella University',
      // Chile
      'University of Chile',
      'Pontifical Catholic University of Chile',
      'University of Santiago Chile',
      // Colombia
      'National University of Colombia',
      'University of the Andes',
      'Pontifical Xavierian University',
      // Peru
      'National University of San Marcos',
      'Pontifical Catholic University of Peru',
      // Venezuela
      'Central University of Venezuela',
      'Simón Bolívar University',
      // Ecuador
      'Central University of Ecuador',
      'Escuela Politécnica Nacional',
      // Uruguay
      'University of the Republic',
      // Paraguay
      'National University of Asunción',
      // Bolivia
      'Higher University of San Andrés',
    ],
  },

  // ─── Universities — Africa (~50) ────────────────────────────────────────────

  {
    id: 'universities-africa',
    label: 'Universities — Africa',
    exams: [
      // South Africa
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
      // Nigeria
      'University of Ibadan',
      'University of Lagos',
      'Obafemi Awolowo University',
      'Ahmadu Bello University',
      'University of Nigeria',
      'Covenant University',
      'University of Benin',
      'University of Ilorin',
      // Kenya
      'University of Nairobi',
      'Kenyatta University',
      'Strathmore University',
      'Moi University',
      // Ghana
      'University of Ghana',
      'Kwame Nkrumah University of Science and Technology',
      'University of Cape Coast',
      // Egypt (also listed in Middle East, but key ones here for Africa context)
      'Cairo University',
      'Ain Shams University',
      'Alexandria University',
      // Ethiopia
      'Addis Ababa University',
      // Uganda
      'Makerere University',
      // Tanzania
      'University of Dar es Salaam',
      // Rwanda
      'University of Rwanda',
      // Botswana
      'University of Botswana',
      // Namibia
      'University of Namibia',
      // Zambia
      'University of Zambia',
      // Zimbabwe
      'University of Zimbabwe',
      // Senegal
      'Cheikh Anta Diop University',
      // Ivory Coast
      'Félix Houphouët-Boigny University',
      // Cameroon
      'University of Yaoundé I',
      // Morocco
      'Mohammed V University',
      // Tunisia
      'Tunis El Manar University',
      // Algeria
      'University of Algiers',
      // Libya
      'University of Tripoli',
      // Sudan
      'University of Khartoum',
    ],
  },
]

// ─── Flat exports for convenience ────────────────────────────────────────────

export const SPECIALTY_CATEGORIES: ExamCategory[] = [
  ...UNIVERSITY_CATEGORIES,
  ...LANGUAGE_CATEGORIES,
  ...PROFESSIONAL_CATEGORIES,
]
