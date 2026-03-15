'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  BookOpen, 
  ArrowLeft, 
  Search, 
  Globe, 
  MapPin, 
  GraduationCap, 
  Check,
  X,
  ChevronRight,
  School,
  Award,
  Flag,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Region and Country data from Categories.docx
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
  // Asia
  'HK': [
    { id: 'hkdse-s5', label: 'HKDSE Preparation (S5)', exams: ['S5 HKDSE Chinese Language Preparation', 'S5 HKDSE English Language Preparation', 'S5 HKDSE Mathematics Preparation', 'S5 HKDSE Mathematics M1 Preparation', 'S5 HKDSE Mathematics M2 Preparation', 'S5 HKDSE Physics Preparation', 'S5 HKDSE Chemistry Preparation', 'S5 HKDSE Biology Preparation', 'S5 HKDSE Combined Science Preparation'] },
    { id: 'hkdse-s6', label: 'HKDSE Preparation (S6)', exams: ['S6 HKDSE Chinese Language Preparation', 'S6 HKDSE English Language Preparation', 'S6 HKDSE Mathematics Preparation', 'S6 HKDSE Mathematics M1 Preparation', 'S6 HKDSE Mathematics M2 Preparation', 'S6 HKDSE Physics Preparation', 'S6 HKDSE Chemistry Preparation', 'S6 HKDSE Biology Preparation', 'S6 HKDSE Combined Science Preparation'] }
  ],
  'KR': [
    { id: 'csat', label: 'CSAT Preparation', exams: ['CSAT Korean Language Preparation', 'CSAT English Preparation', 'CSAT Mathematics Preparation', 'CSAT Physics Preparation', 'CSAT Chemistry Preparation', 'CSAT Biology Preparation', 'CSAT Earth Science Preparation'] }
  ],
  'SG': [
    { id: 'gce-o-level', label: 'GCE O-Level Preparation', exams: ['O-Level English Preparation', 'O-Level Elementary Mathematics Preparation', 'O-Level Additional Mathematics Preparation', 'O-Level Physics Preparation', 'O-Level Chemistry Preparation', 'O-Level Biology Preparation', 'O-Level Combined Science Preparation'] },
    { id: 'gce-a-level', label: 'GCE A-Level Preparation', exams: ['A-Level General Paper Preparation', 'A-Level Mathematics Preparation', 'A-Level Physics Preparation', 'A-Level Chemistry Preparation', 'A-Level Biology Preparation'] }
  ],
  'JP': [
    { id: 'university-entrance', label: 'University Entrance Examination Preparation', exams: ['Japanese University Entrance Japanese Language', 'Japanese University Entrance English', 'Japanese University Entrance Mathematics', 'Japanese University Entrance Physics', 'Japanese University Entrance Chemistry', 'Japanese University Entrance Biology', 'Japanese University Entrance Earth Science'] }
  ],
  'TH': [
    { id: 'university-admission', label: 'University Admission Examination', exams: ['Thai University Admission Thai Language', 'Thai University Admission English', 'Thai University Admission Mathematics', 'Thai University Admission Physics', 'Thai University Admission Chemistry', 'Thai University Admission Biology', 'Thai University Admission Earth & Space Science'] }
  ],
  'IN': [
    { id: 'jee', label: 'Engineering Entrance (JEE)', exams: ['JEE Main Preparation — Mathematics', 'JEE Main Preparation — Physics', 'JEE Main Preparation — Chemistry', 'JEE Advanced Preparation — Mathematics', 'JEE Advanced Preparation — Physics', 'JEE Advanced Preparation — Chemistry'] },
    { id: 'neet', label: 'Medical Entrance (NEET)', exams: ['NEET Preparation — Physics', 'NEET Preparation — Chemistry', 'NEET Preparation — Biology'] }
  ],
  'VN': [
    { id: 'national-exam', label: 'National Examination Preparation', exams: ['Vietnam National Exam — Vietnamese Language', 'Vietnam National Exam — English', 'Vietnam National Exam — Mathematics', 'Vietnam National Exam — Physics', 'Vietnam National Exam — Chemistry', 'Vietnam National Exam — Biology'] }
  ],
  'TW': [
    { id: 'university-entrance', label: 'University Entrance Examination', exams: ['Taiwan University Entrance Chinese', 'Taiwan University Entrance English', 'Taiwan University Entrance Mathematics', 'Taiwan University Entrance Physics', 'Taiwan University Entrance Chemistry', 'Taiwan University Entrance Biology'] }
  ],
  'MY': [
    { id: 'spm', label: 'SPM Examination', exams: ['SPM Malay', 'SPM English', 'SPM Mathematics', 'SPM Physics', 'SPM Chemistry', 'SPM Biology'] }
  ],
  'ID': [
    { id: 'university-admission', label: 'University Admission', exams: ['University Admission Indonesian', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] }
  ],
  'IL': [
    { id: 'bagrut', label: 'Bagrut', exams: ['Bagrut Hebrew', 'Bagrut English', 'Bagrut Mathematics', 'Bagrut Physics', 'Bagrut Chemistry', 'Bagrut Biology'] }
  ],
  // Middle East
  'SA': [
    { id: 'university-admission', label: 'University Admission', exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] }
  ],
  'QA': [
    { id: 'university-admission', label: 'University Admission', exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] }
  ],
  'KW': [
    { id: 'university-admission', label: 'University Admission', exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] }
  ],
  'OM': [
    { id: 'university-admission', label: 'University Admission', exams: ['University Admission Arabic', 'University Admission English', 'University Admission Mathematics', 'University Admission Physics', 'University Admission Chemistry', 'University Admission Biology'] }
  ],
  // Europe
  'GB': [
    { id: 'gcse', label: 'GCSE', exams: ['GCSE English Language', 'GCSE English Literature', 'GCSE Mathematics', 'GCSE Biology', 'GCSE Chemistry', 'GCSE Physics', 'GCSE Combined Science'] },
    { id: 'a-level-uk', label: 'A Level (UK)', exams: ['A Level English', 'A Level Mathematics', 'A Level Biology', 'A Level Chemistry', 'A Level Physics'] }
  ],
  'DE': [
    { id: 'abitur', label: 'Abitur', exams: ['Abitur German', 'Abitur English', 'Abitur Mathematics', 'Abitur Biology', 'Abitur Chemistry', 'Abitur Physics'] }
  ],
  'FR': [
    { id: 'baccalaureat', label: 'Baccalauréat', exams: ['Baccalauréat French', 'Baccalauréat English', 'Baccalauréat Mathematics', 'Baccalauréat Biology', 'Baccalauréat Chemistry', 'Baccalauréat Physics'] }
  ],
  'NL': [
    { id: 'dutch-national', label: 'National Examination', exams: ['Dutch National Exam — Dutch', 'Dutch National Exam — English', 'Dutch National Exam — Mathematics', 'Dutch National Exam — Biology', 'Dutch National Exam — Chemistry', 'Dutch National Exam — Physics'] }
  ],
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

export default function CategoriesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('global')
  const [searchQuery, setSearchQuery] = useState('')
  const [customCategory, setCustomCategory] = useState('')

  // Get countries for selected region
  const availableCountries = useMemo(() => {
    if (!selectedRegion) return []
    const region = REGIONS.find(r => r.id === selectedRegion)
    return region ? region.countries : []
  }, [selectedRegion])

  // Get selected country
  const selectedCountry = useMemo(() => {
    if (!selectedCountryCode) return null
    return availableCountries.find(c => c.code === selectedCountryCode)
  }, [selectedCountryCode, availableCountries])

  // Get national exams for selected country
  const nationalExams = useMemo(() => {
    return selectedCountry?.nationalExams || []
  }, [selectedCountry])

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1F2933] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[#4FD1C5]" />
              <span className="text-xl font-bold">Browse All Categories</span>
            </div>
            <div className="w-24" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933] mb-4">Explore All Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select your region and country to see relevant exams. All categories will be assigned to your selected country.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Region, Country, Tabs & Custom Category */}
          <div className="lg:col-span-3 space-y-6">
            {/* Region & Country Dropdowns */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Region Dropdown */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#4FD1C5]" />
                      Region
                    </Label>
                    <Select value={selectedRegion} onValueChange={(value) => {
                      setSelectedRegion(value)
                      setSelectedCountryCode('')
                    }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONS.map(region => (
                          <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Country Dropdown */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#F17623]" />
                      Country
                    </Label>
                    <Select 
                      value={selectedCountryCode} 
                      onValueChange={setSelectedCountryCode}
                      disabled={!selectedRegion}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={selectedRegion ? "Select Country" : "Select Region first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCountries.map(country => (
                          <SelectItem key={country.code} value={country.code}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Selected Count */}
                {selectedCategories.length > 0 && (
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'} selected
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Categories Tabs - Fixed Height Container */}
            <Card className="h-[500px] flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                <CardHeader className="pb-0">
                  <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="global" className="text-xs md:text-sm">
                      <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Global
                    </TabsTrigger>
                    <TabsTrigger value="ap" className="text-xs md:text-sm">
                      <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      AP
                    </TabsTrigger>
                    <TabsTrigger value="alevel" className="text-xs md:text-sm">
                      <GraduationCap className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      A Level
                    </TabsTrigger>
                    <TabsTrigger value="ib" className="text-xs md:text-sm">
                      <BookOpen className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      IB
                    </TabsTrigger>
                    <TabsTrigger value="igcse" className="text-xs md:text-sm">
                      <School className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      IGCSE
                    </TabsTrigger>
                    <TabsTrigger 
                      value="national" 
                      className="text-xs md:text-sm"
                      disabled={!selectedCountryCode || nationalExams.length === 0}
                    >
                      <Flag className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      National
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="flex-1 overflow-hidden pt-6">
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
                  <div className="h-[calc(100%-60px)]">
                    {/* Global Exams Tab */}
                    <TabsContent value="global" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {GLOBAL_EXAMS_CATEGORIES.map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* AP Tab */}
                    <TabsContent value="ap" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {AP_CATEGORIES.map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* A Level Tab */}
                    <TabsContent value="alevel" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {A_LEVEL_CATEGORIES.map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* IB Tab */}
                    <TabsContent value="ib" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {IB_CATEGORIES.map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* IGCSE Tab */}
                    <TabsContent value="igcse" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {IGCSE_CATEGORIES.map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* National Tab */}
                    <TabsContent value="national" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {!selectedCountryCode ? (
                            <div className="text-center py-12 text-gray-500">
                              <Flag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>Please select a country to view national exams.</p>
                            </div>
                          ) : nationalExams.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                              <Flag className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>No national exams available for {selectedCountry?.name}.</p>
                            </div>
                          ) : (
                            nationalExams.map(renderCategorySection)
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </div>
                </CardContent>
              </Tabs>
            </Card>

            {/* Your Own Category Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-[#4FD1C5]" />
                  Your Own Category
                </CardTitle>
                <CardDescription>
                  Add a custom category if you don't see what you're looking for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your own category..."
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
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Selected Categories Sidebar */}
          <div className="space-y-6">
            <Card className="h-[calc(100vh-300px)] min-h-[400px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4FD1C5] text-white text-xs flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                  Selected
                </CardTitle>
                <CardDescription>
                  {selectedCategories.length === 0 
                    ? 'No categories selected' 
                    : `${selectedCategories.length} selected`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-full pr-2">
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
                </ScrollArea>
              </CardContent>
              {selectedCategories.length > 0 && (
                <CardContent className="pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllSelections}
                    className="w-full"
                  >
                    Clear All
                  </Button>
                </CardContent>
              )}
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-[#4FD1C5]/10 to-[#1D4ED8]/10 border-[#4FD1C5]/30">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-[#1F2933] mb-2">Ready to start tutoring?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Create an account and start sharing your expertise.
                </p>
                <Link href="/register/tutor">
                  <Button className="w-full bg-[#F17623] hover:bg-[#e06613]">
                    Become a Tutor
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
