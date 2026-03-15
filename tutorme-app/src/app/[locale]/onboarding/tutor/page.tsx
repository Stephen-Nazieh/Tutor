'use client'

import { useState, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Loader2, CheckCircle, DollarSign, Globe, MapPin, BookOpen, Award, GraduationCap, School, Flag, X, Search, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Region and Country data (same as categories page)
interface CountryData {
  code: string
  name: string
  nationalExams: ExamCategory[]
}

interface Region {
  id: string
  name: string
  countries: CountryData[]
}

interface ExamCategory {
  id: string
  label: string
  exams: string[]
}

// National exams data by country - extracted from Categories.docx
const NATIONAL_EXAMS_DATA: Record<string, ExamCategory[]> = {
  // Asia - Hong Kong
  'HK': [
    { 
      id: 'hkdse-s5', 
      label: 'HKDSE Preparation (S5)', 
      exams: [
        'S5 HKDSE Chinese Language Preparation', 
        'S5 HKDSE English Language Preparation', 
        'S5 HKDSE Mathematics Preparation', 
        'S5 HKDSE Mathematics M1 Preparation', 
        'S5 HKDSE Mathematics M2 Preparation', 
        'S5 HKDSE Physics Preparation', 
        'S5 HKDSE Chemistry Preparation', 
        'S5 HKDSE Biology Preparation', 
        'S5 HKDSE Combined Science Preparation'
      ] 
    },
    { 
      id: 'hkdse-s6', 
      label: 'HKDSE Preparation (S6)', 
      exams: [
        'S6 HKDSE Chinese Language Preparation', 
        'S6 HKDSE English Language Preparation', 
        'S6 HKDSE Mathematics Preparation', 
        'S6 HKDSE Mathematics M1 Preparation', 
        'S6 HKDSE Mathematics M2 Preparation', 
        'S6 HKDSE Physics Preparation', 
        'S6 HKDSE Chemistry Preparation', 
        'S6 HKDSE Biology Preparation', 
        'S6 HKDSE Combined Science Preparation'
      ] 
    },
    {
      id: 'hk-subject-s4',
      label: 'Secondary 4 (S4 / Grade 10)',
      exams: ['S4 Chinese Language', 'S4 English Language', 'S4 Mathematics', 'S4 Mathematics Extended Module 1 (M1)', 'S4 Mathematics Extended Module 2 (M2)', 'S4 Physics', 'S4 Chemistry', 'S4 Biology', 'S4 Combined Science']
    },
    {
      id: 'hk-subject-s5',
      label: 'Secondary 5 (S5 / Grade 11)',
      exams: ['S5 Chinese Language', 'S5 English Language', 'S5 Mathematics', 'S5 Mathematics Extended Module 1 (M1)', 'S5 Mathematics Extended Module 2 (M2)', 'S5 Physics', 'S5 Chemistry', 'S5 Biology', 'S5 Combined Science']
    },
    {
      id: 'hk-subject-s6',
      label: 'Secondary 6 (S6 / Grade 12)',
      exams: ['S6 Chinese Language', 'S6 English Language', 'S6 Mathematics', 'S6 Mathematics Extended Module 1 (M1)', 'S6 Mathematics Extended Module 2 (M2)', 'S6 Physics', 'S6 Chemistry', 'S6 Biology', 'S6 Combined Science']
    }
  ],
  // South Korea
  'KR': [
    { 
      id: 'csat', 
      label: 'CSAT Preparation (수능 Preparation)', 
      exams: [
        'CSAT Korean Language Preparation', 
        'CSAT English Preparation', 
        'CSAT Mathematics Preparation', 
        'CSAT Physics Preparation', 
        'CSAT Chemistry Preparation', 
        'CSAT Biology Preparation', 
        'CSAT Earth Science Preparation'
      ] 
    },
    {
      id: 'kr-year-1',
      label: 'High School Year 1',
      exams: ['Korean Language', 'English Language', 'Mathematics', 'Algebra', 'Geometry', 'Probability & Statistics', 'Integrated Science', 'Physics', 'Chemistry', 'Biology', 'Earth Science']
    },
    {
      id: 'kr-year-2',
      label: 'High School Year 2',
      exams: ['Korean Language', 'English Language', 'Mathematics', 'Algebra', 'Calculus Foundations', 'Probability & Statistics', 'Physics', 'Chemistry', 'Biology', 'Earth Science']
    },
    {
      id: 'kr-year-3',
      label: 'High School Year 3',
      exams: ['Korean Language', 'English Language', 'Mathematics', 'Calculus', 'Probability & Statistics', 'Physics', 'Chemistry', 'Biology', 'Earth Science']
    }
  ],
  // Singapore
  'SG': [
    { 
      id: 'gce-o-level', 
      label: 'GCE O-Level Preparation', 
      exams: [
        'O-Level English Preparation', 
        'O-Level Elementary Mathematics Preparation', 
        'O-Level Additional Mathematics Preparation', 
        'O-Level Physics Preparation', 
        'O-Level Chemistry Preparation', 
        'O-Level Biology Preparation', 
        'O-Level Combined Science Preparation'
      ] 
    },
    { 
      id: 'gce-a-level', 
      label: 'GCE A-Level Preparation', 
      exams: [
        'A-Level General Paper Preparation', 
        'A-Level Mathematics Preparation', 
        'A-Level Physics Preparation', 
        'A-Level Chemistry Preparation', 
        'A-Level Biology Preparation'
      ] 
    },
    {
      id: 'sg-sec-4',
      label: 'Secondary 4 (Sec 4 / Grade 10)',
      exams: ['English Language', 'Elementary Mathematics', 'Additional Mathematics', 'Physics', 'Chemistry', 'Biology', 'Combined Science']
    },
    {
      id: 'sg-sec-5',
      label: 'Secondary 5 (Sec 5 / Grade 11)',
      exams: ['English Language', 'Elementary Mathematics', 'Additional Mathematics', 'Physics', 'Chemistry', 'Biology', 'Combined Science']
    },
    {
      id: 'sg-jc1',
      label: 'Junior College Year 1 (JC1 / Grade 11)',
      exams: ['General Paper (English Academic Literacy)', 'H1 Mathematics', 'H2 Mathematics', 'H1 Physics', 'H2 Physics', 'H1 Chemistry', 'H2 Chemistry', 'H1 Biology', 'H2 Biology']
    },
    {
      id: 'sg-jc2',
      label: 'Junior College Year 2 (JC2 / Grade 12)',
      exams: ['General Paper (English Academic Literacy)', 'H1 Mathematics', 'H2 Mathematics', 'H1 Physics', 'H2 Physics', 'H1 Chemistry', 'H2 Chemistry', 'H1 Biology', 'H2 Biology']
    }
  ],
  // Japan
  'JP': [
    { 
      id: 'university-entrance', 
      label: 'University Entrance Examination Preparation', 
      exams: [
        'Japanese University Entrance Japanese Language', 
        'Japanese University Entrance English', 
        'Japanese University Entrance Mathematics', 
        'Japanese University Entrance Physics', 
        'Japanese University Entrance Chemistry', 
        'Japanese University Entrance Biology', 
        'Japanese University Entrance Earth Science'
      ] 
    },
    {
      id: 'jp-year-1',
      label: 'High School Year 1 (G10 / 高校1年)',
      exams: ['Japanese Language', 'English Language', 'Mathematics I', 'Mathematics A', 'Basic Physics', 'Basic Chemistry', 'Basic Biology', 'Earth Science Basics']
    },
    {
      id: 'jp-year-2',
      label: 'High School Year 2 (G11 / 高校2年)',
      exams: ['Japanese Language', 'English Language', 'Mathematics II', 'Mathematics B', 'Physics', 'Chemistry', 'Biology', 'Earth Science']
    },
    {
      id: 'jp-year-3',
      label: 'High School Year 3 (G12 / 高校3年)',
      exams: ['Japanese Language', 'English Language', 'Mathematics III', 'Advanced Mathematics', 'Physics', 'Chemistry', 'Biology', 'Earth Science']
    }
  ],
  // Thailand
  'TH': [
    { 
      id: 'university-admission', 
      label: 'University Admission Examination', 
      exams: [
        'Thai University Admission Thai Language', 
        'Thai University Admission English', 
        'Thai University Admission Mathematics', 
        'Thai University Admission Physics', 
        'Thai University Admission Chemistry', 
        'Thai University Admission Biology', 
        'Thai University Admission Earth & Space Science'
      ] 
    },
    {
      id: 'th-grade-10',
      label: 'Grade 10',
      exams: ['Thai Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'th-grade-11',
      label: 'Grade 11',
      exams: ['Thai Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'th-grade-12',
      label: 'Grade 12',
      exams: ['Thai Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // India
  'IN': [
    { 
      id: 'jee', 
      label: 'Engineering Entrance (JEE)', 
      exams: [
        'JEE Main Preparation — Mathematics', 
        'JEE Main Preparation — Physics', 
        'JEE Main Preparation — Chemistry', 
        'JEE Advanced Preparation — Mathematics', 
        'JEE Advanced Preparation — Physics', 
        'JEE Advanced Preparation — Chemistry'
      ] 
    },
    { 
      id: 'neet', 
      label: 'Medical Entrance (NEET)', 
      exams: [
        'NEET Preparation — Physics', 
        'NEET Preparation — Chemistry', 
        'NEET Preparation — Biology'
      ] 
    },
    {
      id: 'in-grade-10',
      label: 'Grade 10',
      exams: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'in-grade-11',
      label: 'Grade 11',
      exams: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'in-grade-12',
      label: 'Grade 12',
      exams: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Vietnam
  'VN': [
    { 
      id: 'national-exam', 
      label: 'National Examination Preparation', 
      exams: [
        'Vietnam National Exam — Vietnamese Language', 
        'Vietnam National Exam — English', 
        'Vietnam National Exam — Mathematics', 
        'Vietnam National Exam — Physics', 
        'Vietnam National Exam — Chemistry', 
        'Vietnam National Exam — Biology'
      ] 
    },
    {
      id: 'vn-grade-10',
      label: 'Grade 10',
      exams: ['Vietnamese Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'vn-grade-11',
      label: 'Grade 11',
      exams: ['Vietnamese Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'vn-grade-12',
      label: 'Grade 12',
      exams: ['Vietnamese Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Taiwan
  'TW': [
    { 
      id: 'university-entrance', 
      label: 'University Entrance Examination', 
      exams: [
        'Taiwan University Entrance Chinese', 
        'Taiwan University Entrance English', 
        'Taiwan University Entrance Mathematics', 
        'Taiwan University Entrance Physics', 
        'Taiwan University Entrance Chemistry', 
        'Taiwan University Entrance Biology'
      ] 
    },
    {
      id: 'tw-grade-10',
      label: 'Grade 10',
      exams: ['Chinese Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'tw-grade-11',
      label: 'Grade 11',
      exams: ['Chinese Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'tw-grade-12',
      label: 'Grade 12',
      exams: ['Chinese Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Malaysia
  'MY': [
    { 
      id: 'spm', 
      label: 'SPM Examination', 
      exams: ['SPM Malay', 'SPM English', 'SPM Mathematics', 'SPM Physics', 'SPM Chemistry', 'SPM Biology'] 
    },
    {
      id: 'my-grade-10',
      label: 'Grade 10',
      exams: ['Malay Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'my-grade-11',
      label: 'Grade 11',
      exams: ['Malay Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'my-grade-12',
      label: 'Grade 12',
      exams: ['Malay Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Indonesia
  'ID': [
    { 
      id: 'university-admission', 
      label: 'University Admission', 
      exams: [
        'University Admission Indonesian', 
        'University Admission English', 
        'University Admission Mathematics', 
        'University Admission Physics', 
        'University Admission Chemistry', 
        'University Admission Biology'
      ] 
    },
    {
      id: 'id-grade-10',
      label: 'Grade 10',
      exams: ['Indonesian Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'id-grade-11',
      label: 'Grade 11',
      exams: ['Indonesian Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'id-grade-12',
      label: 'Grade 12',
      exams: ['Indonesian Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Israel
  'IL': [
    { 
      id: 'bagrut', 
      label: 'Bagrut', 
      exams: ['Bagrut Hebrew', 'Bagrut English', 'Bagrut Mathematics', 'Bagrut Physics', 'Bagrut Chemistry', 'Bagrut Biology'] 
    },
    {
      id: 'il-grade-10',
      label: 'Grade 10',
      exams: ['Hebrew Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'il-grade-11',
      label: 'Grade 11',
      exams: ['Hebrew Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'il-grade-12',
      label: 'Grade 12',
      exams: ['Hebrew Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Middle East
  'SA': [
    { 
      id: 'university-admission', 
      label: 'University Admission', 
      exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] 
    },
    {
      id: 'sa-grade-10',
      label: 'Grade 10',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'sa-grade-11',
      label: 'Grade 11',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'sa-grade-12',
      label: 'Grade 12',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  'QA': [
    { 
      id: 'university-admission', 
      label: 'University Admission', 
      exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] 
    },
    {
      id: 'qa-grade-10',
      label: 'Grade 10',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'qa-grade-11',
      label: 'Grade 11',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'qa-grade-12',
      label: 'Grade 12',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  'KW': [
    { 
      id: 'university-admission', 
      label: 'University Admission', 
      exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] 
    },
    {
      id: 'kw-grade-10',
      label: 'Grade 10',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'kw-grade-11',
      label: 'Grade 11',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'kw-grade-12',
      label: 'Grade 12',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  'OM': [
    { 
      id: 'university-admission', 
      label: 'University Admission', 
      exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] 
    },
    {
      id: 'om-grade-10',
      label: 'Grade 10',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'om-grade-11',
      label: 'Grade 11',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    },
    {
      id: 'om-grade-12',
      label: 'Grade 12',
      exams: ['Arabic Language', 'English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology']
    }
  ],
  // Europe
  'GB': [
    { 
      id: 'gcse', 
      label: 'GCSE', 
      exams: ['GCSE English Language', 'GCSE English Literature', 'GCSE Mathematics', 'GCSE Biology', 'GCSE Chemistry', 'GCSE Physics', 'GCSE Combined Science'] 
    },
    { 
      id: 'a-level-uk', 
      label: 'A Level (UK)', 
      exams: ['A Level English', 'A Level Mathematics', 'A Level Biology', 'A Level Chemistry', 'A Level Physics'] 
    },
    {
      id: 'gb-grade-10',
      label: 'Grade 10',
      exams: ['English Language', 'English Literature', 'Mathematics', 'Biology', 'Chemistry', 'Physics', 'Combined Science']
    },
    {
      id: 'gb-grade-11',
      label: 'Grade 11',
      exams: ['English Language', 'English Literature', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'gb-grade-12',
      label: 'Grade 12 (Age 17-18)',
      exams: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'gb-grade-13',
      label: 'Grade 13',
      exams: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    }
  ],
  'DE': [
    { 
      id: 'abitur', 
      label: 'Abitur', 
      exams: ['Abitur German', 'Abitur English', 'Abitur Mathematics', 'Abitur Biology', 'Abitur Chemistry', 'Abitur Physics'] 
    },
    {
      id: 'de-grade-10',
      label: 'Grade 10',
      exams: ['German Language', 'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'de-grade-11',
      label: 'Grade 11',
      exams: ['German Language', 'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'de-grade-12',
      label: 'Grade 12',
      exams: ['German Language', 'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    }
  ],
  'FR': [
    { 
      id: 'baccalaureat', 
      label: 'Baccalauréat', 
      exams: ['Baccalauréat French', 'Baccalauréat English', 'Baccalauréat Mathematics', 'Baccalauréat Biology', 'Baccalauréat Chemistry', 'Baccalauréat Physics'] 
    },
    {
      id: 'fr-grade-10',
      label: 'Grade 10 (Seconde - Age 16)',
      exams: ['French Language', 'English Language', 'Mathematics', 'Biology & Earth Sciences', 'Chemistry', 'Physics']
    },
    {
      id: 'fr-grade-11',
      label: 'Grade 11 (Première - Age 17)',
      exams: ['French Language', 'English Language', 'Mathematics', 'Biology & Earth Sciences', 'Chemistry', 'Physics']
    },
    {
      id: 'fr-grade-12',
      label: 'Grade 12 (Terminale - Age 18)',
      exams: ['French Language', 'English Language', 'Mathematics', 'Biology & Earth Sciences', 'Chemistry', 'Physics']
    }
  ],
  'NL': [
    { 
      id: 'dutch-national', 
      label: 'National Examination', 
      exams: ['Dutch National Exam — Dutch', 'Dutch National Exam — English', 'Dutch National Exam — Mathematics', 'Dutch National Exam — Biology', 'Dutch National Exam — Chemistry', 'Dutch National Exam — Physics'] 
    },
    {
      id: 'nl-grade-10',
      label: 'Grade 10',
      exams: ['Dutch Language', 'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'nl-grade-11',
      label: 'Grade 11',
      exams: ['Dutch Language', 'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    },
    {
      id: 'nl-grade-12',
      label: 'Grade 12',
      exams: ['Dutch Language', 'English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics']
    }
  ],
  // Countries without specific national exams
  'BE': [], 'CH': [], 'IT': [], 'ES': [], 'IE': [], 'PT': [], 'AT': [], 'PL': [], 'CZ': [], 'HU': [], 'RO': [], 'GR': [], 'TR': [],
  'AU': [], 'NZ': [],
  'US': [], 'CA': [], 'MX': [], 'CR': [], 'PA': [], 'DO': [],
  'BR': [], 'CL': [], 'PE': [], 'CO': [], 'AR': [], 'UY': [], 'EC': [],
  'NG': [], 'KE': [], 'GH': [], 'EG': [], 'MA': [], 'TN': [], 'BW': [], 'NA': [], 'ZA': [],
  'PH': []
}

const REGIONS: Region[] = [
  {
    id: 'asia',
    name: 'Asia',
    countries: [
      { code: 'HK', name: 'Hong Kong', nationalExams: NATIONAL_EXAMS_DATA['HK'] || [] },
      { code: 'KR', name: 'Korea', nationalExams: NATIONAL_EXAMS_DATA['KR'] || [] },
      { code: 'SG', name: 'Singapore', nationalExams: NATIONAL_EXAMS_DATA['SG'] || [] },
      { code: 'JP', name: 'Japan', nationalExams: NATIONAL_EXAMS_DATA['JP'] || [] },
      { code: 'TH', name: 'Thailand', nationalExams: NATIONAL_EXAMS_DATA['TH'] || [] },
      { code: 'IN', name: 'India', nationalExams: NATIONAL_EXAMS_DATA['IN'] || [] },
      { code: 'VN', name: 'Vietnam', nationalExams: NATIONAL_EXAMS_DATA['VN'] || [] },
      { code: 'TW', name: 'Taiwan', nationalExams: NATIONAL_EXAMS_DATA['TW'] || [] },
      { code: 'MY', name: 'Malaysia', nationalExams: NATIONAL_EXAMS_DATA['MY'] || [] },
      { code: 'ID', name: 'Indonesia', nationalExams: NATIONAL_EXAMS_DATA['ID'] || [] },
      { code: 'PH', name: 'Philippines', nationalExams: [] },
      { code: 'IL', name: 'Israel', nationalExams: NATIONAL_EXAMS_DATA['IL'] || [] },
    ]
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    countries: [
      { code: 'SA', name: 'Saudi Arabia', nationalExams: NATIONAL_EXAMS_DATA['SA'] || [] },
      { code: 'QA', name: 'Qatar', nationalExams: NATIONAL_EXAMS_DATA['QA'] || [] },
      { code: 'KW', name: 'Kuwait', nationalExams: NATIONAL_EXAMS_DATA['KW'] || [] },
      { code: 'OM', name: 'Oman', nationalExams: NATIONAL_EXAMS_DATA['OM'] || [] },
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: [
      { code: 'GB', name: 'United Kingdom', nationalExams: NATIONAL_EXAMS_DATA['GB'] || [] },
      { code: 'DE', name: 'Germany', nationalExams: NATIONAL_EXAMS_DATA['DE'] || [] },
      { code: 'FR', name: 'France', nationalExams: NATIONAL_EXAMS_DATA['FR'] || [] },
      { code: 'NL', name: 'Netherlands', nationalExams: NATIONAL_EXAMS_DATA['NL'] || [] },
      { code: 'BE', name: 'Belgium', nationalExams: [] },
      { code: 'CH', name: 'Switzerland', nationalExams: [] },
      { code: 'IT', name: 'Italy', nationalExams: [] },
      { code: 'ES', name: 'Spain', nationalExams: [] },
      { code: 'IE', name: 'Ireland', nationalExams: [] },
      { code: 'PT', name: 'Portugal', nationalExams: [] },
      { code: 'AT', name: 'Austria', nationalExams: [] },
      { code: 'PL', name: 'Poland', nationalExams: [] },
      { code: 'CZ', name: 'Czech Republic', nationalExams: [] },
      { code: 'HU', name: 'Hungary', nationalExams: [] },
      { code: 'RO', name: 'Romania', nationalExams: [] },
      { code: 'GR', name: 'Greece', nationalExams: [] },
      { code: 'TR', name: 'Turkey', nationalExams: [] },
    ]
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: [
      { code: 'AU', name: 'Australia', nationalExams: [] },
      { code: 'NZ', name: 'New Zealand', nationalExams: [] },
    ]
  },
  {
    id: 'north-america',
    name: 'North America',
    countries: [
      { code: 'US', name: 'United States', nationalExams: [] },
      { code: 'CA', name: 'Canada', nationalExams: [] },
      { code: 'MX', name: 'Mexico', nationalExams: [] },
      { code: 'CR', name: 'Costa Rica', nationalExams: [] },
      { code: 'PA', name: 'Panama', nationalExams: [] },
      { code: 'DO', name: 'Dominican Republic', nationalExams: [] },
    ]
  },
  {
    id: 'south-america',
    name: 'South America',
    countries: [
      { code: 'BR', name: 'Brazil', nationalExams: [] },
      { code: 'CL', name: 'Chile', nationalExams: [] },
      { code: 'PE', name: 'Peru', nationalExams: [] },
      { code: 'CO', name: 'Colombia', nationalExams: [] },
      { code: 'AR', name: 'Argentina', nationalExams: [] },
      { code: 'UY', name: 'Uruguay', nationalExams: [] },
      { code: 'EC', name: 'Ecuador', nationalExams: [] },
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: [
      { code: 'NG', name: 'Nigeria', nationalExams: [] },
      { code: 'KE', name: 'Kenya', nationalExams: [] },
      { code: 'GH', name: 'Ghana', nationalExams: [] },
      { code: 'EG', name: 'Egypt', nationalExams: [] },
      { code: 'MA', name: 'Morocco', nationalExams: [] },
      { code: 'TN', name: 'Tunisia', nationalExams: [] },
      { code: 'BW', name: 'Botswana', nationalExams: [] },
      { code: 'NA', name: 'Namibia', nationalExams: [] },
      { code: 'ZA', name: 'South Africa', nationalExams: [] },
    ]
  }
]

// Global Exams Categories
const GLOBAL_EXAMS_CATEGORIES: ExamCategory[] = [
  { id: 'admission-exams', label: 'Admission Exams', exams: ['SAT', 'ACT'] },
  { id: 'english-proficiency', label: 'English Proficiency', exams: ['IELTS Academic', 'IELTS General', 'TOEFL iBT', 'PTE Academic', 'Duolingo English Test', 'CPE', 'CAE', 'Cambridge B2', 'International ESOL', 'Oxford Test of English', 'iTEP Academic', 'TOEIC', 'MET', 'EIKEN'] },
  { id: 'postgraduate-exams', label: 'Postgraduate Exams', exams: ['GRE', 'GMAT', 'LSAT', 'MCAT', 'UCAT'] }
]

// AP Categories
const AP_CATEGORIES: ExamCategory[] = [
  { id: 'ap-stem', label: 'AP - STEM', exams: ['AP Calculus AB', 'AP Calculus BC', 'AP Statistics', 'AP Biology', 'AP Chemistry', 'AP Physics 1', 'AP Physics 2', 'AP Physics C: Mechanics', 'AP Physics C: Electricity and Magnetism', 'AP Environmental Science', 'AP Computer Science A', 'AP Computer Science Principles'] },
  { id: 'ap-humanities', label: 'AP - Humanities', exams: ['AP English & Composition', 'AP Literature & Composition', 'AP Seminar', 'AP Research', 'AP World History: Modern', 'AP United States History', 'AP European History', 'AP Human Geography', 'AP Psychology', 'AP Macroeconomics', 'AP Microeconomics', 'AP Comparative Government and Politics', 'AP United States Government and Politics'] },
  { id: 'ap-languages', label: 'AP - Languages', exams: ['AP Chinese Language and Culture', 'AP French Language and Culture', 'AP German Language and Culture', 'AP Italian Language and Culture', 'AP Japanese Language and Culture', 'AP Latin', 'AP Spanish Language and Culture', 'AP Spanish Literature and Culture'] },
  { id: 'ap-art', label: 'AP - Art', exams: ['AP Art History', 'AP Music Theory', 'AP Studio Art: 2-D Art and Design', 'AP Studio Art: 3-D Art and Design', 'AP Drawing'] }
]

// A Level Categories
const A_LEVEL_CATEGORIES: ExamCategory[] = [
  { id: 'as-courses', label: 'AS Level Courses', exams: ['AS Level Mathematics', 'AS Level Further Mathematics', 'AS Level Physics', 'AS Level Chemistry', 'AS Level Biology', 'AS Level Computer Science', 'AS Level Information Technology', 'AS Level Economics', 'AS Level Business', 'AS Level Accounting', 'AS Level Psychology', 'AS Level Sociology', 'AS Level History', 'AS Level Geography', 'AS Level English Language', 'AS Level English Literature', 'AS Level Global Perspectives & Research', 'AS Level Art and Design', 'AS Level Media Studies'] },
  { id: 'a-level-courses', label: 'A Level Courses', exams: ['A Level Mathematics', 'A Level Further Mathematics', 'A Level Physics', 'A Level Chemistry', 'A Level Biology', 'A Level Computer Science', 'A Level Information Technology', 'A Level Economics', 'A Level Business', 'A Level Accounting', 'A Level Psychology', 'A Level Sociology', 'A Level History', 'A Level Geography', 'A Level English Language', 'A Level English Literature', 'A Level Global Perspectives & Research', 'A Level Art and Design', 'A Level Media Studies'] }
]

// IB Categories
const IB_CATEGORIES: ExamCategory[] = [
  { id: 'ib-courses', label: 'IB Courses', exams: ['IB Mathematics: Analysis and Approaches', 'IB Mathematics: Applications and Interpretation', 'IB Physics', 'IB Chemistry', 'IB Biology', 'IB Computer Science', 'IB Economics', 'IB Business Management', 'IB Psychology', 'IB History', 'IB Geography', 'IB English A: Language and Literature', 'IB English A: Literature', 'IB Language B Courses', 'IB Visual Arts', 'IB Theory of Knowledge (TOK)', 'IB Extended Essay (EE)'] }
]

// IGCSE Categories
const IGCSE_CATEGORIES: ExamCategory[] = [
  { id: 'igcse-mathematics', label: 'IGCSE Mathematics', exams: ['IGCSE Mathematics', 'IGCSE Additional Mathematics', 'IGCSE International Mathematics'] },
  { id: 'igcse-sciences', label: 'IGCSE Sciences', exams: ['IGCSE Physics', 'IGCSE Chemistry', 'IGCSE Biology', 'IGCSE Combined Science', 'IGCSE Coordinated Sciences', 'IGCSE Environmental Management'] },
  { id: 'igcse-english', label: 'IGCSE English', exams: ['IGCSE English Language', 'IGCSE English Literature', 'IGCSE English as a Second Language'] },
  { id: 'igcse-humanities', label: 'IGCSE Humanities', exams: ['IGCSE History', 'IGCSE Geography', 'IGCSE Economics', 'IGCSE Business Studies', 'IGCSE Accounting', 'IGCSE Sociology', 'IGCSE Global Perspectives'] },
  { id: 'igcse-languages', label: 'IGCSE Languages', exams: ['IGCSE French', 'IGCSE Spanish', 'IGCSE German', 'IGCSE Chinese', 'IGCSE Arabic', 'IGCSE Hindi'] },
  { id: 'igcse-arts', label: 'IGCSE Arts', exams: ['IGCSE Art & Design', 'IGCSE Music', 'IGCSE Drama', 'IGCSE Physical Education', 'IGCSE Travel & Tourism'] },
  { id: 'igcse-technical', label: 'IGCSE Technical', exams: ['IGCSE Computer Science', 'IGCSE Information & Communication Technology', 'IGCSE Design & Technology'] }
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00'
]

export default function TutorOnboarding() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  
  // Step 1: Profile
  const [bio, setBio] = useState('')
  const [credentials, setCredentials] = useState('')
  
  // Step 2: Regions, Countries & Categories
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('global')
  const [searchQuery, setSearchQuery] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  
  // Step 3: Availability
  const [availability, setAvailability] = useState<Record<string, string[]>>({})
  
  // Step 4: Hourly Rate
  const [hourlyRate, setHourlyRate] = useState('')

  // Get countries for selected regions
  const availableCountries = useMemo(() => {
    if (selectedRegions.length === 0) return []
    const countries: CountryData[] = []
    selectedRegions.forEach(regionId => {
      const region = REGIONS.find(r => r.id === regionId)
      if (region) {
        countries.push(...region.countries)
      }
    })
    return countries
  }, [selectedRegions])

  // Get national exams for selected countries
  const nationalExams = useMemo(() => {
    if (selectedCountries.length === 0) return []
    const exams: ExamCategory[] = []
    selectedCountries.forEach(countryCode => {
      const country = availableCountries.find(c => c.code === countryCode)
      if (country && country.nationalExams.length > 0) {
        exams.push(...country.nationalExams)
      }
    })
    return exams
  }, [selectedCountries, availableCountries])

  // Toggle region selection
  const toggleRegion = (regionId: string) => {
    setSelectedRegions(prev => {
      const newRegions = prev.includes(regionId)
        ? prev.filter(r => r !== regionId)
        : [...prev, regionId]
      
      // Remove countries from unselected regions
      if (prev.includes(regionId)) {
        const region = REGIONS.find(r => r.id === regionId)
        if (region) {
          const countryCodes = region.countries.map(c => c.code)
          setSelectedCountries(prevCountries => 
            prevCountries.filter(c => !countryCodes.includes(c))
          )
        }
      }
      return newRegions
    })
  }

  // Toggle country selection
  const toggleCountry = (countryCode: string) => {
    setSelectedCountries(prev => 
      prev.includes(countryCode) 
        ? prev.filter(c => c !== countryCode)
        : [...prev, countryCode]
    )
  }

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Select all in category
  const selectAllInCategory = (exams: string[]) => {
    setSelectedCategories(prev => {
      const newCategories = [...prev]
      exams.forEach(exam => {
        if (!newCategories.includes(exam)) {
          newCategories.push(exam)
        }
      })
      return newCategories
    })
  }

  // Clear all in category
  const clearAllInCategory = (exams: string[]) => {
    setSelectedCategories(prev => prev.filter(c => !exams.includes(c)))
  }

  // Remove single category
  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category))
  }

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedCategories([])
  }

  // Add custom category
  const addCustomCategory = () => {
    if (customCategory.trim() && !selectedCategories.includes(customCategory.trim())) {
      setSelectedCategories(prev => [...prev, customCategory.trim()])
      setCustomCategory('')
    }
  }

  // Filter exams based on search
  const filterExams = (exams: string[]) => {
    if (!searchQuery) return exams
    return exams.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Render category section
  const renderCategorySection = (category: ExamCategory) => {
    const filteredExams = filterExams(category.exams)
    if (filteredExams.length === 0) return null

    const selectedCount = filteredExams.filter(exam => selectedCategories.includes(exam)).length

    return (
      <div key={category.id} className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[#1D4ED8]" />
            <h4 className="font-semibold text-gray-900">{category.label}</h4>
            {selectedCount > 0 && (
              <Badge variant="secondary" className="text-xs bg-[#4FD1C5]/20 text-[#1F2933]">
                {selectedCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectAllInCategory(category.exams)}
              className="h-7 text-xs text-[#1D4ED8] hover:text-[#1e40af]"
            >
              All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => clearAllInCategory(category.exams)}
              className="h-7 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {filteredExams.map(exam => (
            <label
              key={exam}
              className={cn(
                "flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors",
                selectedCategories.includes(exam) 
                  ? "bg-[#4FD1C5]/10 border border-[#4FD1C5]/30" 
                  : "hover:bg-gray-50 border border-transparent"
              )}
            >
              <Checkbox
                checked={selectedCategories.includes(exam)}
                onCheckedChange={() => toggleCategory(exam)}
              />
              <span className={cn(
                "text-sm",
                selectedCategories.includes(exam) ? "text-[#1F2933] font-medium" : "text-gray-700"
              )}>
                {exam}
              </span>
            </label>
          ))}
        </div>
      </div>
    )
  }

  const toggleTimeSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || []
      const newSlots = daySlots.includes(time)
        ? daySlots.filter(t => t !== time)
        : [...daySlots, time]
      return { ...prev, [day]: newSlots }
    })
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/onboarding/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio,
          credentials,
          regions: selectedRegions,
          countries: selectedCountries,
          subjects: selectedCategories,
          availability,
          hourlyRate: parseFloat(hourlyRate) || 0,
        })
      })

      if (response.ok) {
        setCompleted(true)
        setTimeout(() => {
          window.location.href = '/tutor/dashboard'
        }, 1500)
      }
    } catch (error) {
      console.error('Failed to save onboarding:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const progress = ((step - 1) / 4) * 100

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to Solocorn!</h2>
            <p className="text-gray-600">Your tutor profile is set up. Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Tutor Profile</CardTitle>
            <CardDescription>
              Step {step} of 4: {step === 1 ? 'About You' : step === 2 ? 'Teaching Areas' : step === 3 ? 'Availability' : 'Pricing'}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            {/* Step 1: Profile */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell students about yourself, your teaching experience, and your teaching style..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="credentials">Credentials</Label>
                  <Input
                    id="credentials"
                    placeholder="e.g., PhD in Mathematics, Certified Teacher, 10 years experience..."
                    value={credentials}
                    onChange={(e) => setCredentials(e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full mt-4" 
                  disabled={!bio.trim()}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Regions, Countries & Categories */}
            {step === 2 && (
              <div className="space-y-6">
                {/* Region Selection */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Globe className="h-5 w-5 text-[#4FD1C5]" />
                      Select Regions
                    </h3>
                    <span className="text-sm text-gray-500">
                      {selectedRegions.length} selected
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {REGIONS.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => toggleRegion(region.id)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          selectedRegions.includes(region.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Country Selection */}
                {selectedRegions.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-[#F17623]" />
                        Select Countries
                      </h3>
                      <span className="text-sm text-gray-500">
                        {selectedCountries.length} selected
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {availableCountries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => toggleCountry(country.code)}
                          className={`p-3 rounded-lg border text-left transition-colors ${
                            selectedCountries.includes(country.code)
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {country.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories Selection */}
                {selectedCountries.length > 0 && (
                  <div className="space-y-4 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-[#1D4ED8]" />
                        Select Categories You Teach
                      </h3>
                      <span className="text-sm text-gray-500">
                        {selectedCategories.length} selected
                      </span>
                    </div>

                    {/* Categories Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid grid-cols-6 w-full">
                        <TabsTrigger value="global" className="text-xs md:text-sm">
                          <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          Global
                        </TabsTrigger>
                        <TabsTrigger value="ap" className="text-xs md:text-sm">
                          <Award className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          AP
                        </TabsTrigger>
                        <TabsTrigger value="alevel" className="text-xs md:text-sm">
                          <GraduationCap className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          A Level
                        </TabsTrigger>
                        <TabsTrigger value="ib" className="text-xs md:text-sm">
                          <BookOpen className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          IB
                        </TabsTrigger>
                        <TabsTrigger value="igcse" className="text-xs md:text-sm">
                          <School className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          IGCSE
                        </TabsTrigger>
                        <TabsTrigger 
                          value="national" 
                          className="text-xs md:text-sm"
                          disabled={nationalExams.length === 0}
                        >
                          <Flag className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          National
                        </TabsTrigger>
                      </TabsList>

                      <div className="mt-4">
                        {/* Search Bar */}
                        <div className="relative mb-4">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            placeholder="Search categories..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                          />
                        </div>

                        {/* Tab Contents */}
                        <ScrollArea className="h-[300px] pr-4">
                          <TabsContent value="global" className="mt-0">
                            <div className="space-y-6 pb-4">
                              {GLOBAL_EXAMS_CATEGORIES.map(renderCategorySection)}
                            </div>
                          </TabsContent>

                          <TabsContent value="ap" className="mt-0">
                            <div className="space-y-6 pb-4">
                              {AP_CATEGORIES.map(renderCategorySection)}
                            </div>
                          </TabsContent>

                          <TabsContent value="alevel" className="mt-0">
                            <div className="space-y-6 pb-4">
                              {A_LEVEL_CATEGORIES.map(renderCategorySection)}
                            </div>
                          </TabsContent>

                          <TabsContent value="ib" className="mt-0">
                            <div className="space-y-6 pb-4">
                              {IB_CATEGORIES.map(renderCategorySection)}
                            </div>
                          </TabsContent>

                          <TabsContent value="igcse" className="mt-0">
                            <div className="space-y-6 pb-4">
                              {IGCSE_CATEGORIES.map(renderCategorySection)}
                            </div>
                          </TabsContent>

                          <TabsContent value="national" className="mt-0">
                            <div className="space-y-6 pb-4">
                              {nationalExams.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                  <Flag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                                  <p>No national exams available for selected countries.</p>
                                </div>
                              ) : (
                                nationalExams.map(renderCategorySection)
                              )}
                            </div>
                          </TabsContent>
                        </ScrollArea>
                      </div>
                    </Tabs>

                    {/* Custom Category */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Input
                        placeholder="Add your own category..."
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addCustomCategory()
                          }
                        }}
                      />
                      <Button 
                        onClick={addCustomCategory}
                        disabled={!customCategory.trim()}
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>

                    {/* Selected Categories Display */}
                    {selectedCategories.length > 0 && (
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Selected Categories:</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAllSelections}
                            className="h-7 text-xs"
                          >
                            Clear All
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedCategories.map(cat => (
                            <Badge 
                              key={cat}
                              variant="secondary"
                              className="cursor-pointer bg-[#4FD1C5]/20 text-[#1F2933] hover:bg-[#4FD1C5]/30 pr-1"
                            >
                              {cat}
                              <button 
                                onClick={() => removeCategory(cat)}
                                className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex gap-3 mt-6 pt-4 border-t">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    disabled={selectedCategories.length === 0}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Availability */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">When are you available?</h3>
                <p className="text-sm text-gray-600">
                  Select your preferred teaching hours
                </p>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {DAYS.map((day) => (
                    <div key={day} className="border rounded-lg p-3">
                      <h4 className="font-medium mb-2">{day}</h4>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => toggleTimeSlot(day, time)}
                            className={`px-3 py-1 text-sm rounded border transition-colors ${
                              availability[day]?.includes(time)
                                ? 'bg-green-500 text-white border-green-500'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={() => setStep(4)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Hourly Rate */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Set Your Hourly Rate</h3>
                  <p className="text-sm text-gray-600">
                    Students will pay this rate for 1-on-1 sessions
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-6 h-6 text-gray-600" />
                    <Input
                      type="number"
                      placeholder="50"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      className="text-2xl font-bold"
                    />
                    <span className="text-gray-600">/ hour</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <p>Platform fee: 20%</p>
                    <p className="font-medium text-gray-700">
                      You receive: ${hourlyRate ? (parseFloat(hourlyRate) * 0.8).toFixed(2) : '0.00'} / hour
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    onClick={handleComplete}
                    disabled={isLoading || !hourlyRate}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Complete Setup'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
