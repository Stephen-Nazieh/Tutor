'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BackButton } from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { HANDLE_REGEX, isReservedHandle } from '@/lib/mentions/handles'
import {
  GraduationCap,
  ShieldCheck,
  Globe,
  UserRound,
  ChevronDown,
  Eye,
  EyeOff,
  Loader2,
  X,
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import { cn } from '@/lib/utils'

type GlobalExamState = {
  standardizedEnglish: string[]
  undergradAdmissions: string[]
  apAdvancedPlacement: string[]
  internationalAS: string[]
}

type SocialLinks = {
  instagram: string
  tiktok: string
  youtube: string
  facebook: string
}

// Region and Country data for tutoring selection
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

// National exams data by country
const NATIONAL_EXAMS_DATA: Record<string, ExamCategory[]> = {
  HK: [
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
        'S5 HKDSE Combined Science Preparation',
      ],
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
        'S6 HKDSE Combined Science Preparation',
      ],
    },
    {
      id: 'hk-subject-s4',
      label: 'Secondary 4 (S4 / Grade 10)',
      exams: [
        'S4 Chinese Language',
        'S4 English Language',
        'S4 Mathematics',
        'S4 Mathematics Extended Module 1 (M1)',
        'S4 Mathematics Extended Module 2 (M2)',
        'S4 Physics',
        'S4 Chemistry',
        'S4 Biology',
        'S4 Combined Science',
      ],
    },
    {
      id: 'hk-subject-s5',
      label: 'Secondary 5 (S5 / Grade 11)',
      exams: [
        'S5 Chinese Language',
        'S5 English Language',
        'S5 Mathematics',
        'S5 Mathematics Extended Module 1 (M1)',
        'S5 Mathematics Extended Module 2 (M2)',
        'S5 Physics',
        'S5 Chemistry',
        'S5 Biology',
        'S5 Combined Science',
      ],
    },
    {
      id: 'hk-subject-s6',
      label: 'Secondary 6 (S6 / Grade 12)',
      exams: [
        'S6 Chinese Language',
        'S6 English Language',
        'S6 Mathematics',
        'S6 Mathematics Extended Module 1 (M1)',
        'S6 Mathematics Extended Module 2 (M2)',
        'S6 Physics',
        'S6 Chemistry',
        'S6 Biology',
        'S6 Combined Science',
      ],
    },
  ],
  KR: [
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
        'CSAT Earth Science Preparation',
      ],
    },
    {
      id: 'kr-year-1',
      label: 'High School Year 1',
      exams: [
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
      ],
    },
    {
      id: 'kr-year-2',
      label: 'High School Year 2',
      exams: [
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
      ],
    },
    {
      id: 'kr-year-3',
      label: 'High School Year 3',
      exams: [
        'Korean Language',
        'English Language',
        'Mathematics',
        'Calculus',
        'Probability & Statistics',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ],
    },
  ],
  SG: [
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
        'O-Level Combined Science Preparation',
      ],
    },
    {
      id: 'gce-a-level',
      label: 'GCE A-Level Preparation',
      exams: [
        'A-Level General Paper Preparation',
        'A-Level Mathematics Preparation',
        'A-Level Physics Preparation',
        'A-Level Chemistry Preparation',
        'A-Level Biology Preparation',
      ],
    },
    {
      id: 'sg-sec-4',
      label: 'Secondary 4 (Sec 4 / Grade 10)',
      exams: [
        'English Language',
        'Elementary Mathematics',
        'Additional Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ],
    },
    {
      id: 'sg-sec-5',
      label: 'Secondary 5 (Sec 5 / Grade 11)',
      exams: [
        'English Language',
        'Elementary Mathematics',
        'Additional Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Combined Science',
      ],
    },
    {
      id: 'sg-jc1',
      label: 'Junior College Year 1 (JC1 / Grade 11)',
      exams: [
        'General Paper (English Academic Literacy)',
        'H1 Mathematics',
        'H2 Mathematics',
        'H1 Physics',
        'H2 Physics',
        'H1 Chemistry',
        'H2 Chemistry',
        'H1 Biology',
        'H2 Biology',
      ],
    },
    {
      id: 'sg-jc2',
      label: 'Junior College Year 2 (JC2 / Grade 12)',
      exams: [
        'General Paper (English Academic Literacy)',
        'H1 Mathematics',
        'H2 Mathematics',
        'H1 Physics',
        'H2 Physics',
        'H1 Chemistry',
        'H2 Chemistry',
        'H1 Biology',
        'H2 Biology',
      ],
    },
  ],
  JP: [
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
        'Japanese University Entrance Earth Science',
      ],
    },
    {
      id: 'jp-year-1',
      label: 'High School Year 1 (G10 / 高校1年)',
      exams: [
        'Japanese Language',
        'English Language',
        'Mathematics I',
        'Mathematics A',
        'Basic Physics',
        'Basic Chemistry',
        'Basic Biology',
        'Earth Science Basics',
      ],
    },
    {
      id: 'jp-year-2',
      label: 'High School Year 2 (G11 / 高校2年)',
      exams: [
        'Japanese Language',
        'English Language',
        'Mathematics II',
        'Mathematics B',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ],
    },
    {
      id: 'jp-year-3',
      label: 'High School Year 3 (G12 / 高校3年)',
      exams: [
        'Japanese Language',
        'English Language',
        'Mathematics III',
        'Advanced Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
        'Earth Science',
      ],
    },
  ],
  TH: [
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
        'Thai University Admission Earth & Space Science',
      ],
    },
    {
      id: 'th-grade-10',
      label: 'Grade 10',
      exams: [
        'Thai Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'th-grade-11',
      label: 'Grade 11',
      exams: [
        'Thai Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'th-grade-12',
      label: 'Grade 12',
      exams: [
        'Thai Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  IN: [
    {
      id: 'jee',
      label: 'Engineering Entrance (JEE)',
      exams: [
        'JEE Main Preparation — Mathematics',
        'JEE Main Preparation — Physics',
        'JEE Main Preparation — Chemistry',
        'JEE Advanced Preparation — Mathematics',
        'JEE Advanced Preparation — Physics',
        'JEE Advanced Preparation — Chemistry',
      ],
    },
    {
      id: 'neet',
      label: 'Medical Entrance (NEET)',
      exams: [
        'NEET Preparation — Physics',
        'NEET Preparation — Chemistry',
        'NEET Preparation — Biology',
      ],
    },
    {
      id: 'in-grade-10',
      label: 'Grade 10',
      exams: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    },
    {
      id: 'in-grade-11',
      label: 'Grade 11',
      exams: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    },
    {
      id: 'in-grade-12',
      label: 'Grade 12',
      exams: ['English Language', 'Mathematics', 'Physics', 'Chemistry', 'Biology'],
    },
  ],
  VN: [
    {
      id: 'national-exam',
      label: 'National Examination Preparation',
      exams: [
        'Vietnam National Exam — Vietnamese Language',
        'Vietnam National Exam — English',
        'Vietnam National Exam — Mathematics',
        'Vietnam National Exam — Physics',
        'Vietnam National Exam — Chemistry',
        'Vietnam National Exam — Biology',
      ],
    },
    {
      id: 'vn-grade-10',
      label: 'Grade 10',
      exams: [
        'Vietnamese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'vn-grade-11',
      label: 'Grade 11',
      exams: [
        'Vietnamese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'vn-grade-12',
      label: 'Grade 12',
      exams: [
        'Vietnamese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  TW: [
    {
      id: 'university-entrance',
      label: 'University Entrance Examination',
      exams: [
        'Taiwan University Entrance Chinese',
        'Taiwan University Entrance English',
        'Taiwan University Entrance Mathematics',
        'Taiwan University Entrance Physics',
        'Taiwan University Entrance Chemistry',
        'Taiwan University Entrance Biology',
      ],
    },
    {
      id: 'tw-grade-10',
      label: 'Grade 10',
      exams: [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'tw-grade-11',
      label: 'Grade 11',
      exams: [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'tw-grade-12',
      label: 'Grade 12',
      exams: [
        'Chinese Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  MY: [
    {
      id: 'spm',
      label: 'SPM Examination',
      exams: [
        'SPM Malay',
        'SPM English',
        'SPM Mathematics',
        'SPM Physics',
        'SPM Chemistry',
        'SPM Biology',
      ],
    },
    {
      id: 'my-grade-10',
      label: 'Grade 10',
      exams: [
        'Malay Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'my-grade-11',
      label: 'Grade 11',
      exams: [
        'Malay Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'my-grade-12',
      label: 'Grade 12',
      exams: [
        'Malay Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  ID: [
    {
      id: 'university-admission',
      label: 'University Admission',
      exams: [
        'University Admission Indonesian',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ],
    },
    {
      id: 'id-grade-10',
      label: 'Grade 10',
      exams: [
        'Indonesian Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'id-grade-11',
      label: 'Grade 11',
      exams: [
        'Indonesian Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'id-grade-12',
      label: 'Grade 12',
      exams: [
        'Indonesian Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  IL: [
    {
      id: 'bagrut',
      label: 'Bagrut',
      exams: [
        'Bagrut Hebrew',
        'Bagrut English',
        'Bagrut Mathematics',
        'Bagrut Physics',
        'Bagrut Chemistry',
        'Bagrut Biology',
      ],
    },
    {
      id: 'il-grade-10',
      label: 'Grade 10',
      exams: [
        'Hebrew Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'il-grade-11',
      label: 'Grade 11',
      exams: [
        'Hebrew Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'il-grade-12',
      label: 'Grade 12',
      exams: [
        'Hebrew Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  SA: [
    {
      id: 'university-admission',
      label: 'University Admission',
      exams: [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ],
    },
    {
      id: 'sa-grade-10',
      label: 'Grade 10',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'sa-grade-11',
      label: 'Grade 11',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'sa-grade-12',
      label: 'Grade 12',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  QA: [
    {
      id: 'university-admission',
      label: 'University Admission',
      exams: [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ],
    },
    {
      id: 'qa-grade-10',
      label: 'Grade 10',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'qa-grade-11',
      label: 'Grade 11',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'qa-grade-12',
      label: 'Grade 12',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  KW: [
    {
      id: 'university-admission',
      label: 'University Admission',
      exams: [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ],
    },
    {
      id: 'kw-grade-10',
      label: 'Grade 10',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'kw-grade-11',
      label: 'Grade 11',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'kw-grade-12',
      label: 'Grade 12',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  OM: [
    {
      id: 'university-admission',
      label: 'University Admission',
      exams: [
        'University Admission Arabic',
        'University Admission English',
        'University Admission Mathematics',
        'University Admission Physics',
        'University Admission Chemistry',
        'University Admission Biology',
      ],
    },
    {
      id: 'om-grade-10',
      label: 'Grade 10',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'om-grade-11',
      label: 'Grade 11',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
    {
      id: 'om-grade-12',
      label: 'Grade 12',
      exams: [
        'Arabic Language',
        'English Language',
        'Mathematics',
        'Physics',
        'Chemistry',
        'Biology',
      ],
    },
  ],
  GB: [
    {
      id: 'gcse',
      label: 'GCSE',
      exams: [
        'GCSE English Language',
        'GCSE English Literature',
        'GCSE Mathematics',
        'GCSE Biology',
        'GCSE Chemistry',
        'GCSE Physics',
        'GCSE Combined Science',
      ],
    },
    {
      id: 'a-level-uk',
      label: 'A Level (UK)',
      exams: [
        'A Level English',
        'A Level Mathematics',
        'A Level Biology',
        'A Level Chemistry',
        'A Level Physics',
      ],
    },
    {
      id: 'gb-grade-10',
      label: 'Grade 10',
      exams: [
        'English Language',
        'English Literature',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
        'Combined Science',
      ],
    },
    {
      id: 'gb-grade-11',
      label: 'Grade 11',
      exams: [
        'English Language',
        'English Literature',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'gb-grade-12',
      label: 'Grade 12 (Age 17-18)',
      exams: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    },
    {
      id: 'gb-grade-13',
      label: 'Grade 13',
      exams: ['English Language', 'Mathematics', 'Biology', 'Chemistry', 'Physics'],
    },
  ],
  DE: [
    {
      id: 'abitur',
      label: 'Abitur',
      exams: [
        'Abitur German',
        'Abitur English',
        'Abitur Mathematics',
        'Abitur Biology',
        'Abitur Chemistry',
        'Abitur Physics',
      ],
    },
    {
      id: 'de-grade-10',
      label: 'Grade 10',
      exams: [
        'German Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'de-grade-11',
      label: 'Grade 11',
      exams: [
        'German Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'de-grade-12',
      label: 'Grade 12',
      exams: [
        'German Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
  ],
  FR: [
    {
      id: 'baccalaureat',
      label: 'Baccalauréat',
      exams: [
        'Baccalauréat French',
        'Baccalauréat English',
        'Baccalauréat Mathematics',
        'Baccalauréat Biology',
        'Baccalauréat Chemistry',
        'Baccalauréat Physics',
      ],
    },
    {
      id: 'fr-grade-10',
      label: 'Grade 10 (Seconde - Age 16)',
      exams: [
        'French Language',
        'English Language',
        'Mathematics',
        'Biology & Earth Sciences',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'fr-grade-11',
      label: 'Grade 11 (Première - Age 17)',
      exams: [
        'French Language',
        'English Language',
        'Mathematics',
        'Biology & Earth Sciences',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'fr-grade-12',
      label: 'Grade 12 (Terminale - Age 18)',
      exams: [
        'French Language',
        'English Language',
        'Mathematics',
        'Biology & Earth Sciences',
        'Chemistry',
        'Physics',
      ],
    },
  ],
  NL: [
    {
      id: 'dutch-national',
      label: 'National Examination',
      exams: [
        'Dutch National Exam — Dutch',
        'Dutch National Exam — English',
        'Dutch National Exam — Mathematics',
        'Dutch National Exam — Biology',
        'Dutch National Exam — Chemistry',
        'Dutch National Exam — Physics',
      ],
    },
    {
      id: 'nl-grade-10',
      label: 'Grade 10',
      exams: [
        'Dutch Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'nl-grade-11',
      label: 'Grade 11',
      exams: [
        'Dutch Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
    {
      id: 'nl-grade-12',
      label: 'Grade 12',
      exams: [
        'Dutch Language',
        'English Language',
        'Mathematics',
        'Biology',
        'Chemistry',
        'Physics',
      ],
    },
  ],
  BE: [],
  CH: [],
  IT: [],
  ES: [],
  IE: [],
  PT: [],
  AT: [],
  PL: [],
  CZ: [],
  HU: [],
  RO: [],
  GR: [],
  TR: [],
  AU: [],
  NZ: [],
  US: [],
  CA: [],
  MX: [],
  CR: [],
  PA: [],
  DO: [],
  BR: [],
  CL: [],
  PE: [],
  CO: [],
  AR: [],
  UY: [],
  EC: [],
  NG: [],
  KE: [],
  GH: [],
  EG: [],
  MA: [],
  TN: [],
  BW: [],
  NA: [],
  ZA: [],
  PH: [],
}

const REGIONS: Region[] = [
  {
    id: 'global',
    name: 'Global (All Nationalities)',
    countries: [],
  },
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
    ],
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    countries: [
      { code: 'SA', name: 'Saudi Arabia', nationalExams: NATIONAL_EXAMS_DATA['SA'] || [] },
      { code: 'QA', name: 'Qatar', nationalExams: NATIONAL_EXAMS_DATA['QA'] || [] },
      { code: 'KW', name: 'Kuwait', nationalExams: NATIONAL_EXAMS_DATA['KW'] || [] },
      { code: 'OM', name: 'Oman', nationalExams: NATIONAL_EXAMS_DATA['OM'] || [] },
    ],
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
    ],
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: [
      { code: 'AU', name: 'Australia', nationalExams: [] },
      { code: 'NZ', name: 'New Zealand', nationalExams: [] },
    ],
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
    ],
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
    ],
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
    ],
  },
]

// Generate ALL_COUNTRIES from REGIONS for the country of residence selector
const ALL_COUNTRIES = REGIONS.flatMap(region =>
  region.countries.map(country => ({
    code: country.code,
    name: country.name,
  }))
).sort((a, b) => a.name.localeCompare(b.name))

// Global Exams Categories
const GLOBAL_EXAMS_CATEGORIES: ExamCategory[] = [
  { id: 'admission-exams', label: 'Admission Exams', exams: ['SAT', 'ACT'] },
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
]

// AP Categories
const AP_CATEGORIES: ExamCategory[] = [
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
]

// A Level Categories
const A_LEVEL_CATEGORIES: ExamCategory[] = [
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
]

// IB Categories
const IB_CATEGORIES: ExamCategory[] = [
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

// IGCSE Categories
const IGCSE_CATEGORIES: ExamCategory[] = [
  {
    id: 'igcse-mathematics',
    label: 'IGCSE Mathematics',
    exams: ['IGCSE Mathematics', 'IGCSE Additional Mathematics', 'IGCSE International Mathematics'],
  },
  {
    id: 'igcse-sciences',
    label: 'IGCSE Sciences',
    exams: [
      'IGCSE Physics',
      'IGCSE Chemistry',
      'IGCSE Biology',
      'IGCSE Combined Science',
      'IGCSE Coordinated Sciences',
      'IGCSE Environmental Management',
    ],
  },
  {
    id: 'igcse-english',
    label: 'IGCSE English',
    exams: [
      'IGCSE English Language',
      'IGCSE English Literature',
      'IGCSE English as a Second Language',
    ],
  },
  {
    id: 'igcse-humanities',
    label: 'IGCSE Humanities',
    exams: [
      'IGCSE History',
      'IGCSE Geography',
      'IGCSE Economics',
      'IGCSE Business Studies',
      'IGCSE Accounting',
      'IGCSE Sociology',
      'IGCSE Global Perspectives',
    ],
  },
  {
    id: 'igcse-languages',
    label: 'IGCSE Languages',
    exams: [
      'IGCSE French',
      'IGCSE Spanish',
      'IGCSE German',
      'IGCSE Chinese',
      'IGCSE Arabic',
      'IGCSE Hindi',
    ],
  },
  {
    id: 'igcse-arts',
    label: 'IGCSE Arts',
    exams: [
      'IGCSE Art & Design',
      'IGCSE Music',
      'IGCSE Drama',
      'IGCSE Physical Education',
      'IGCSE Travel & Tourism',
    ],
  },
  {
    id: 'igcse-technical',
    label: 'IGCSE Technical',
    exams: [
      'IGCSE Computer Science',
      'IGCSE Information & Communication Technology',
      'IGCSE Design & Technology',
    ],
  },
]

const REGION_OPTIONS = [
  'Worldwide',
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
  'Oceania',
  'Middle East',
  'Other',
]

const REGION_COUNTRY_MAP: Record<string, string[]> = {
  Africa: [
    'Algeria',
    'Angola',
    'Benin',
    'Botswana',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cameroon',
    'Central African Republic',
    'Chad',
    'Comoros',
    'Congo (Congo-Brazzaville)',
    'Congo (DRC)',
    "Côte d'Ivoire",
    'Djibouti',
    'Egypt',
    'Equatorial Guinea',
    'Eritrea',
    'Eswatini',
    'Ethiopia',
    'Gabon',
    'Gambia',
    'Ghana',
    'Guinea',
    'Guinea-Bissau',
    'Kenya',
    'Lesotho',
    'Liberia',
    'Libya',
    'Madagascar',
    'Malawi',
    'Mali',
    'Mauritania',
    'Mauritius',
    'Morocco',
    'Mozambique',
    'Namibia',
    'Niger',
    'Nigeria',
    'Rwanda',
    'Sao Tome and Principe',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Somalia',
    'South Africa',
    'South Sudan',
    'Sudan',
    'Tanzania',
    'Togo',
    'Tunisia',
    'Uganda',
    'Zambia',
    'Zimbabwe',
    'Western Sahara',
  ],
  Asia: [
    'Afghanistan',
    'Armenia',
    'Azerbaijan',
    'Bahrain',
    'Bangladesh',
    'Bhutan',
    'Brunei',
    'Cambodia',
    'China',
    'Georgia',
    'India',
    'Indonesia',
    'Japan',
    'Kazakhstan',
    'Kyrgyzstan',
    'Laos',
    'Malaysia',
    'Maldives',
    'Mongolia',
    'Myanmar (Burma)',
    'Nepal',
    'North Korea',
    'Pakistan',
    'Philippines',
    'Singapore',
    'South Korea',
    'Sri Lanka',
    'Taiwan',
    'Tajikistan',
    'Thailand',
    'Timor-Leste',
    'Turkmenistan',
    'Uzbekistan',
    'Vietnam',
  ],
  Europe: [
    'Albania',
    'Andorra',
    'Austria',
    'Belarus',
    'Belgium',
    'Bosnia and Herzegovina',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czechia',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Iceland',
    'Ireland',
    'Italy',
    'Kosovo',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Moldova',
    'Monaco',
    'Montenegro',
    'Netherlands',
    'North Macedonia',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'San Marino',
    'Serbia',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Ukraine',
    'United Kingdom',
    'Vatican City',
  ],
  'North America': [
    'Antigua and Barbuda',
    'Bahamas',
    'Barbados',
    'Belize',
    'Canada',
    'Costa Rica',
    'Cuba',
    'Dominica',
    'Dominican Republic',
    'El Salvador',
    'Grenada',
    'Guatemala',
    'Haiti',
    'Honduras',
    'Jamaica',
    'Mexico',
    'Nicaragua',
    'Panama',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Trinidad and Tobago',
    'United States',
    'Puerto Rico',
    'Greenland',
    'Bermuda',
  ],
  'South America': [
    'Argentina',
    'Bolivia',
    'Brazil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Guyana',
    'Paraguay',
    'Peru',
    'Suriname',
    'Uruguay',
    'Venezuela',
    'Falkland Islands',
  ],
  Oceania: [
    'Australia',
    'Fiji',
    'Kiribati',
    'Marshall Islands',
    'Micronesia',
    'Nauru',
    'New Zealand',
    'Palau',
    'Papua New Guinea',
    'Samoa',
    'Solomon Islands',
    'Tonga',
    'Tuvalu',
    'Vanuatu',
    'New Caledonia',
    'French Polynesia',
    'Guam',
    'American Samoa',
  ],
  'Middle East': [
    'Algeria',
    'Bahrain',
    'Egypt',
    'Iran',
    'Iraq',
    'Israel',
    'Jordan',
    'Kuwait',
    'Lebanon',
    'Libya',
    'Oman',
    'Palestine',
    'Qatar',
    'Saudi Arabia',
    'Syria',
    'Turkey',
    'United Arab Emirates',
    'Yemen',
  ],
}

const COUNTRY_TO_REGION = new Map<string, string>()
Object.entries(REGION_COUNTRY_MAP).forEach(([region, countries]) => {
  countries.forEach(country => COUNTRY_TO_REGION.set(country, region))
})

const resolveRegionForCountry = (country: string) => COUNTRY_TO_REGION.get(country) ?? 'Other'

export default function TutorRegistrationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const [usernameStatus, setUsernameStatus] = useState<{
    status: 'idle' | 'checking' | 'available' | 'taken' | 'invalid'
    message?: string
    suggestion?: string
  }>({
    status: 'idle',
  })
  const [emailStatus, setEmailStatus] = useState<{
    status: 'idle' | 'checking' | 'available' | 'taken' | 'invalid'
    message?: string
  }>({
    status: 'idle',
  })
  const [usernameTouched, setUsernameTouched] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showUsernameCheckModal, setShowUsernameCheckModal] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    legalName: '',
    nationality: '',
    countryOfResidence: '',
    educationLevel: '',
    tutoringExperienceRange: '',
    globalExams: {
      standardizedEnglish: [],
      undergradAdmissions: [],
      apAdvancedPlacement: [],
      internationalAS: [],
    } as GlobalExamState,
    tutoringCountries: [] as string[],
    countrySubjectSelections: {} as Record<string, string[]>,
    username: '',
    socialLinks: {
      instagram: '',
      tiktok: '',
      youtube: '',
      facebook: '',
    } as SocialLinks,
    timezone: 'Asia/Shanghai',
    preferredLanguage: 'en',
    agreeToTerms: false,
    // New fields for category selection
    selectedRegions: [] as string[],
    selectedCountries: [] as string[],
    selectedCategories: [] as string[],
  })

  // New state for category selection
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const passwordMismatch =
    formData.password.length > 0 &&
    formData.confirmPassword.length > 0 &&
    formData.password !== formData.confirmPassword

  // Updated: No dots allowed, use underscores instead
  const normalizeUsernameInput = (value: string) =>
    value
      .trim()
      .replace(/^@+/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(0, 30)

  // Generate username suggestion from first and last name
  const generateUsernameSuggestion = () => {
    const first = formData.firstName.toLowerCase().replace(/[^a-z]/g, '')
    const last = formData.lastName.toLowerCase().replace(/[^a-z]/g, '')
    if (first && last) {
      return `${first}_${last}`
    } else if (first) {
      return `${first}_tutor`
    } else if (last) {
      return `${last}_tutor`
    }
    return ''
  }

  const checkUsernameAvailability = async (value: string): Promise<boolean> => {
    const normalized = normalizeUsernameInput(value)
    if (!normalized.trim()) {
      setUsernameStatus({ status: 'idle' })
      return false
    }
    if (!HANDLE_REGEX.test(normalized)) {
      setUsernameStatus({
        status: 'invalid',
        message: 'Username must be 3-30 characters (letters, numbers, underscores)',
      })
      return false
    }
    if (isReservedHandle(normalized)) {
      setUsernameStatus({ status: 'invalid', message: 'This username is reserved' })
      return false
    }
    setUsernameStatus({ status: 'checking' })
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const res = await fetch(
        `/api/public/username-availability?username=${encodeURIComponent(normalized)}`,
        { signal: controller.signal }
      )
      clearTimeout(timeoutId)

      if (!res.ok) {
        setUsernameStatus({ status: 'idle' })
        return false
      }
      const data = await res.json()
      if (data.available) {
        setUsernameStatus({ status: 'available', message: 'Username is available' })
        return true
      } else {
        setUsernameStatus({
          status: 'taken',
          message: 'Username is taken',
          suggestion: data.suggestion,
        })
        return false
      }
    } catch (err) {
      // Handle timeout or network errors gracefully
      if (err instanceof Error && err.name === 'AbortError') {
        setUsernameStatus({ status: 'idle', message: 'Check timed out, please try again' })
      } else {
        setUsernameStatus({ status: 'idle' })
      }
      return false
    }
  }

  const checkEmailAvailability = async (value: string) => {
    if (!value.trim()) {
      setEmailStatus({ status: 'idle' })
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(value)) {
      setEmailStatus({ status: 'invalid', message: 'Enter a valid email address' })
      return false
    }
    setEmailStatus({ status: 'checking' })
    try {
      const res = await fetch(`/api/public/email-availability?email=${encodeURIComponent(value)}`)
      if (!res.ok) {
        setEmailStatus({ status: 'idle', message: 'Unable to verify right now' })
        return true
      }
      const data = await res.json()
      if (data.available) {
        setEmailStatus({ status: 'available', message: 'Email is available' })
        return true
      }
      setEmailStatus({ status: 'taken', message: 'Email is already registered' })
      return false
    } catch {
      setEmailStatus({ status: 'idle', message: 'Unable to verify right now' })
      return true
    }
  }

  const applySuggestion = () => {
    if (!usernameStatus.suggestion) return
    setFormData(prev => ({ ...prev, username: usernameStatus.suggestion ?? prev.username }))
    setUsernameTouched(true)
    setUsernameStatus({ status: 'idle' })
  }

  useEffect(() => {
    const email = formData.email.trim()
    if (!email) {
      setEmailStatus({ status: 'idle' })
      return
    }
    const handle = setTimeout(() => {
      void checkEmailAvailability(email)
    }, 500)
    return () => clearTimeout(handle)
  }, [formData.email])

  useEffect(() => {
    const normalized = normalizeUsernameInput(formData.username)
    if (!normalized) {
      setUsernameStatus({ status: 'idle' })
      return
    }
    if (!HANDLE_REGEX.test(normalized)) {
      setUsernameStatus({
        status: 'invalid',
        message: 'Username must be 3-30 characters (letters, numbers, underscores)',
      })
      return
    }
    if (isReservedHandle(normalized)) {
      setUsernameStatus({ status: 'invalid', message: 'This username is reserved' })
      return
    }
    const handle = setTimeout(() => {
      void checkUsernameAvailability(normalized)
    }, 500)
    return () => clearTimeout(handle)
  }, [formData.username])

  // Auto-suggest username when entering step 2
  useEffect(() => {
    if (step === 2 && !formData.username && formData.firstName && formData.lastName) {
      const suggestion = generateUsernameSuggestion()
      if (suggestion) {
        // Set username and immediately check availability
        setFormData(prev => ({ ...prev, username: suggestion }))
        // Don't wait for setFormData to propagate, check immediately
        checkUsernameAvailability(suggestion)
      }
    }
  }, [step])

  const validateStepOne = async () => {
    if (!formData.firstName || !formData.lastName) {
      toast.error('First and last name are required')
      return false
    }
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required')
      return false
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(formData.email)) {
      toast.error('Enter a valid email address')
      return false
    }
    if (emailStatus.status === 'invalid') {
      toast.error('Enter a valid email address')
      return false
    }
    if (emailStatus.status === 'taken') {
      toast.error('Email already exists')
      return false
    }
    // Always verify email before proceeding
    const ok = await checkEmailAvailability(formData.email)
    if (!ok) {
      toast.error('Email already exists or is invalid')
      return false
    }
    if (passwordMismatch) {
      toast.error('Passwords do not match')
      return false
    }
    if (!formData.nationality) {
      toast.error('Nationality is required')
      return false
    }
    return true
  }

  const validateStepTwo = async () => {
    if (!formData.username) {
      toast.error('Username is required')
      return false
    }
    const normalized = normalizeUsernameInput(formData.username)
    if (!HANDLE_REGEX.test(normalized)) {
      toast.error('Username must be 3-30 characters (letters, numbers, underscores)')
      return false
    }
    if (isReservedHandle(normalized)) {
      toast.error('This username is reserved')
      return false
    }
    if (usernameStatus.status === 'invalid') {
      toast.error(usernameStatus.message || 'Username is invalid')
      return false
    }

    // If already checked and available, proceed immediately
    if (usernameStatus.status === 'available') {
      return true
    }

    // Show checking modal and verify username
    setShowUsernameCheckModal(true)

    // Check availability and get result directly
    const isAvailable = await checkUsernameAvailability(normalized)

    setShowUsernameCheckModal(false)

    if (isAvailable) {
      return true
    }

    // Check failed or username is taken
    if (usernameStatus.status === 'taken') {
      toast.error('Username is already taken')
      return false
    }

    // Timeout or error - allow proceeding with server-side verification
    toast.info('We will verify your username during signup')
    return true
  }

  // Helper to get country names from codes
  const getCountryNamesFromCodes = (codes: string[]) => {
    const names: string[] = []
    codes.forEach(code => {
      REGIONS.forEach(region => {
        const country = region.countries.find(c => c.code === code)
        if (country) {
          names.push(country.name)
        }
      })
    })
    return names
  }

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      toast.error('You must accept the Terms and Agreements')
      return
    }

    setIsLoading(true)
    try {
      // Get country names from selected country codes
      const tutoringCountryNames = getCountryNamesFromCodes(selectedCountries)

      // Generate Category-Nationality combinations
      // e.g., ["IELTS - Korea", "TOEFL - Korea", "IELTS - Hong Kong", "TOEFL - Hong Kong"]
      const categoryNationalityCombinations: string[] = []

      if (selectedRegions.includes('global')) {
        // If Global is selected, just use categories without nationality suffix
        selectedCategories.forEach(category => {
          categoryNationalityCombinations.push(`${category} - Global`)
        })
      } else {
        // Create combinations of each category with each selected country
        selectedCategories.forEach(category => {
          tutoringCountryNames.forEach(countryName => {
            categoryNationalityCombinations.push(`${category} - ${countryName}`)
          })
        })
      }

      const payload = {
        role: 'TUTOR',
        email: formData.email,
        password: formData.password,
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        tosAccepted: formData.agreeToTerms,
        profileData: {
          timezone: formData.timezone,
          preferredLanguage: formData.preferredLanguage,
          nationality: formData.nationality,
          tutorNationalities: selectedRegions.includes('global')
            ? ['Global']
            : tutoringCountryNames,
          categoryNationalityCombinations: categoryNationalityCombinations,
        },
        additionalData: {
          firstName: formData.firstName,
          middleName: formData.middleName,
          lastName: formData.lastName,
          legalName: formData.legalName,
          nationality: formData.nationality,
          phoneCountryCode: '+1',
          phoneNumber: '0000000000',
          educationLevel: 'Bachelor',
          hasTeachingCertificate: false,
          tutoringExperienceRange: '0-2',
          globalExams: formData.globalExams,
          tutoringCountries: tutoringCountryNames,
          countrySubjectSelections: formData.countrySubjectSelections,
          categories: selectedCategories,
          username: formData.username,
          socialLinks: formData.socialLinks,
        },
      }

      const formPayload = new FormData()
      formPayload.set('payload', JSON.stringify(payload))
      const response = await fetch('/api/auth/register/tutor', {
        method: 'POST',
        body: formPayload,
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Tutor account created successfully!')
        router.push('/login?registered=1')
      } else {
        toast.error(data.error || 'Failed to create account')
      }
    } catch {
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Updated steps - removed Tutoring (step 2)
  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Profile' },
    { number: 3, title: 'Review' },
    { number: 4, title: 'Terms' },
  ]

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <BackButton href="/register" className="mb-4" />

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F17623]/10">
            <GraduationCap className="h-8 w-8 text-[#F17623]" />
          </div>
          <h1 className="text-3xl font-bold text-[#1F2933]">Become a Solocorn Tutor</h1>
          <p className="mt-2 text-gray-600">
            Complete your application to start tutoring on the platform
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {steps.map(s => (
            <div key={s.number} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${step >= s.number ? 'bg-[#F17623] text-white' : 'bg-gray-200 text-gray-500'}`}
              >
                {s.number}
              </div>
              <span className={`text-sm ${step >= s.number ? 'text-[#F17623]' : 'text-gray-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Become a Solocorn Tutor'}
              {step === 2 && 'Profile'}
              {step === 3 && 'Review'}
              {step === 4 && 'Terms and Agreements'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us who you are'}
              {step === 2 && 'Complete your profile information'}
              {step === 3 && 'Review your application before registering'}
              {step === 4 && 'Accept the terms to finalize your application'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={formData.firstName}
                      onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Middle Name</Label>
                    <Input
                      value={formData.middleName}
                      onChange={e => setFormData({ ...formData, middleName: e.target.value })}
                      placeholder="Optional"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={formData.lastName}
                      onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tutor@example.com"
                  />
                  {emailStatus.status === 'checking' && (
                    <p className="text-xs text-gray-500">Checking availability...</p>
                  )}
                  {emailStatus.status === 'available' && (
                    <p className="text-xs text-green-600">{emailStatus.message}</p>
                  )}
                  {emailStatus.status === 'taken' && (
                    <p className="text-xs text-red-600">{emailStatus.message}</p>
                  )}
                  {emailStatus.status === 'invalid' && (
                    <p className="text-xs text-red-600">{emailStatus.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={e =>
                          setFormData({ ...formData, confirmPassword: e.target.value })
                        }
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {passwordMismatch && (
                      <p className="text-xs text-red-500">Passwords do not match.</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nationality</Label>
                  <Select
                    value={formData.nationality}
                    onValueChange={value => {
                      setFormData(prev => ({
                        ...prev,
                        nationality: value,
                      }))
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_COUNTRIES.map(country => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-[#F17623] hover:bg-[#e06613]"
                    onClick={async () => {
                      if (await validateStepOne()) setStep(2)
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label>Solocorn Username</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex w-full items-center gap-2 rounded-md border bg-white px-3 py-2">
                      <span className="text-gray-500">@</span>
                      <Input
                        className="h-auto border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={formData.username}
                        onChange={e => {
                          setFormData({
                            ...formData,
                            username: normalizeUsernameInput(e.target.value),
                          })
                          setUsernameTouched(true)
                          setUsernameStatus({ status: 'idle' })
                        }}
                        placeholder="your_username"
                      />
                    </div>
                  </div>
                  {usernameStatus.status === 'checking' && (
                    <p className="text-xs text-gray-500">Checking availability...</p>
                  )}
                  {usernameStatus.status === 'available' && (
                    <p className="text-xs text-green-600">{usernameStatus.message}</p>
                  )}
                  {usernameStatus.status === 'taken' && (
                    <div className="text-xs text-red-600">
                      <p>{usernameStatus.message}</p>
                      {usernameStatus.suggestion && (
                        <button
                          className="text-[#1D4ED8] underline"
                          type="button"
                          onClick={applySuggestion}
                        >
                          Use {usernameStatus.suggestion}
                        </button>
                      )}
                    </div>
                  )}
                  {usernameStatus.status === 'invalid' && (
                    <p className="text-xs text-red-600">{usernameStatus.message}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    3-15 characters. Only letters, numbers, and underscores allowed.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label>Social Media Accounts</Label>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Input
                      value={formData.socialLinks.instagram}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                        })
                      }
                      placeholder="Instagram"
                    />
                    <Input
                      value={formData.socialLinks.tiktok}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, tiktok: e.target.value },
                        })
                      }
                      placeholder="TikTok"
                    />
                    <Input
                      value={formData.socialLinks.youtube}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                        })
                      }
                      placeholder="YouTube"
                    />
                    <Input
                      value={formData.socialLinks.facebook}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                        })
                      }
                      placeholder="Facebook"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-[#F17623] hover:bg-[#e06613]"
                    onClick={async () => {
                      const isValid = await validateStepTwo()
                      if (isValid) setStep(3)
                    }}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-4">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold">
                      <UserRound className="h-4 w-4" />
                      Profile Overview
                    </h4>
                    <p className="text-sm">
                      <strong>Name:</strong> {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm">
                      <strong>Username:</strong> {formData.username}
                    </p>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold">
                      <Globe className="h-4 w-4" />
                      Categories
                    </h4>
                    {selectedCategories.length === 0 ? (
                      <p className="text-sm text-gray-500">No categories selected.</p>
                    ) : (
                      <ul className="list-inside list-disc text-sm text-gray-700">
                        {selectedCategories.map(category => (
                          <li key={category}>{category}</li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold">
                      <ShieldCheck className="h-4 w-4" />
                      Countries
                    </h4>
                    {selectedCountries.length === 0 ? (
                      <p className="text-sm text-gray-500">No countries selected.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {getCountryNamesFromCodes(selectedCountries).map(country => (
                          <span
                            key={country}
                            className="rounded border bg-white px-2 py-1 text-sm text-gray-700"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-[#F17623] hover:bg-[#e06613]"
                    onClick={() => setStep(4)}
                  >
                    Register
                  </Button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={checked =>
                        setFormData({ ...formData, agreeToTerms: checked as boolean })
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Terms and Agreements and confirm that the information provided
                      is accurate.
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(3)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-[#F17623] hover:bg-[#e06613]"
                    onClick={handleSubmit}
                    disabled={isLoading || !formData.agreeToTerms}
                  >
                    {isLoading ? 'Submitting...' : 'Complete Registration'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Username Check Modal */}
        <Dialog open={showUsernameCheckModal} onOpenChange={setShowUsernameCheckModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-[#F17623]" />
                Checking Username Availability
              </DialogTitle>
              <DialogDescription>
                Please wait while we verify if @{formData.username} is available...
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
