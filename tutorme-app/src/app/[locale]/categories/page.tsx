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
  Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Region and Country data from Categories.docx
interface Country {
  code: string
  name: string
}

interface Region {
  id: string
  name: string
  countries: Country[]
}

const REGIONS: Region[] = [
  {
    id: 'asia',
    name: 'Asia',
    countries: [
      { code: 'HK', name: 'Hong Kong' },
      { code: 'KR', name: 'Korea' },
      { code: 'SG', name: 'Singapore' },
      { code: 'JP', name: 'Japan' },
      { code: 'TH', name: 'Thailand' },
      { code: 'IN', name: 'India' },
      { code: 'VN', name: 'Vietnam' },
      { code: 'TW', name: 'Taiwan' },
      { code: 'MY', name: 'Malaysia' },
      { code: 'ID', name: 'Indonesia' },
      { code: 'PH', name: 'Philippines' },
      { code: 'IL', name: 'Israel' },
    ]
  },
  {
    id: 'middle-east',
    name: 'Middle East',
    countries: [
      { code: 'SA', name: 'Saudi Arabia' },
      { code: 'QA', name: 'Qatar' },
      { code: 'KW', name: 'Kuwait' },
      { code: 'OM', name: 'Oman' },
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: [
      { code: 'GB', name: 'United Kingdom' },
      { code: 'DE', name: 'Germany' },
      { code: 'FR', name: 'France' },
      { code: 'NL', name: 'Netherlands' },
      { code: 'BE', name: 'Belgium' },
      { code: 'CH', name: 'Switzerland' },
      { code: 'IT', name: 'Italy' },
      { code: 'ES', name: 'Spain' },
      { code: 'IE', name: 'Ireland' },
      { code: 'PT', name: 'Portugal' },
      { code: 'AT', name: 'Austria' },
      { code: 'PL', name: 'Poland' },
      { code: 'CZ', name: 'Czech Republic' },
      { code: 'HU', name: 'Hungary' },
      { code: 'RO', name: 'Romania' },
      { code: 'GR', name: 'Greece' },
      { code: 'TR', name: 'Turkey' },
    ]
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: [
      { code: 'AU', name: 'Australia' },
      { code: 'NZ', name: 'New Zealand' },
    ]
  },
  {
    id: 'north-america',
    name: 'North America',
    countries: [
      { code: 'US', name: 'United States' },
      { code: 'CA', name: 'Canada' },
      { code: 'MX', name: 'Mexico' },
      { code: 'CR', name: 'Costa Rica' },
      { code: 'PA', name: 'Panama' },
      { code: 'DO', name: 'Dominican Republic' },
    ]
  },
  {
    id: 'south-america',
    name: 'South America',
    countries: [
      { code: 'BR', name: 'Brazil' },
      { code: 'CL', name: 'Chile' },
      { code: 'PE', name: 'Peru' },
      { code: 'CO', name: 'Colombia' },
      { code: 'AR', name: 'Argentina' },
      { code: 'UY', name: 'Uruguay' },
      { code: 'EC', name: 'Ecuador' },
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: [
      { code: 'NG', name: 'Nigeria' },
      { code: 'KE', name: 'Kenya' },
      { code: 'GH', name: 'Ghana' },
      { code: 'EG', name: 'Egypt' },
      { code: 'MA', name: 'Morocco' },
      { code: 'TN', name: 'Tunisia' },
      { code: 'BW', name: 'Botswana' },
      { code: 'NA', name: 'Namibia' },
      { code: 'ZA', name: 'South Africa' },
    ]
  }
]

const NOT_LISTED_COUNTRY: Country = { code: 'OTHER', name: 'Not Listed' }

// Global Exams Categories - From Categories.docx first table
const GLOBAL_EXAMS_CATEGORIES = {
  'admission-exams': {
    id: 'admission-exams',
    label: 'Admission Exams',
    exams: ['SAT', 'ACT']
  },
  'english-proficiency': {
    id: 'english-proficiency',
    label: 'English Proficiency',
    exams: [
      'IELTS Academic', 'IELTS General', 'TOEFL iBT', 'PTE Academic',
      'Duolingo English Test', 'CPE', 'CAE', 'Cambridge B2',
      'International ESOL', 'Oxford Test of English', 'iTEP Academic',
      'TOEIC', 'MET', 'EIKEN'
    ]
  },
  'postgraduate-exams': {
    id: 'postgraduate-exams',
    label: 'Postgraduate Exams',
    exams: ['GRE', 'GMAT', 'LSAT', 'MCAT', 'UCAT']
  }
}

// AP Categories
const AP_CATEGORIES = {
  'ap-stem': {
    id: 'ap-stem',
    label: 'AP - STEM',
    exams: [
      'AP Calculus AB', 'AP Calculus BC', 'AP Statistics', 'AP Biology',
      'AP Chemistry', 'AP Physics 1', 'AP Physics 2',
      'AP Physics C: Mechanics', 'AP Physics C: Electricity and Magnetism',
      'AP Environmental Science', 'AP Computer Science A', 'AP Computer Science Principles'
    ]
  },
  'ap-humanities': {
    id: 'ap-humanities',
    label: 'AP - Humanities',
    exams: [
      'AP English & Composition', 'AP Literature & Composition', 'AP Seminar',
      'AP Research', 'AP World History: Modern', 'AP United States History',
      'AP European History', 'AP Human Geography', 'AP Psychology',
      'AP Macroeconomics', 'AP Microeconomics',
      'AP Comparative Government and Politics', 'AP United States Government and Politics'
    ]
  },
  'ap-languages': {
    id: 'ap-languages',
    label: 'AP - Languages',
    exams: [
      'AP Chinese Language and Culture', 'AP French Language and Culture',
      'AP German Language and Culture', 'AP Italian Language and Culture',
      'AP Japanese Language and Culture', 'AP Latin',
      'AP Spanish Language and Culture', 'AP Spanish Literature and Culture'
    ]
  },
  'ap-art': {
    id: 'ap-art',
    label: 'AP - Art',
    exams: [
      'AP Art History', 'AP Music Theory',
      'AP Studio Art: 2-D Art and Design', 'AP Studio Art: 3-D Art and Design', 'AP Drawing'
    ]
  }
}

// A Level Categories
const A_LEVEL_CATEGORIES = {
  'as-courses': {
    id: 'as-courses',
    label: 'AS Level Courses',
    exams: [
      'AS Level Mathematics', 'AS Level Further Mathematics', 'AS Level Physics',
      'AS Level Chemistry', 'AS Level Biology', 'AS Level Computer Science',
      'AS Level Information Technology', 'AS Level Economics', 'AS Level Business',
      'AS Level Accounting', 'AS Level Psychology', 'AS Level Sociology',
      'AS Level History', 'AS Level Geography', 'AS Level English Language',
      'AS Level English Literature', 'AS Level Global Perspectives & Research',
      'AS Level Art and Design', 'AS Level Media Studies'
    ]
  },
  'a-level-courses': {
    id: 'a-level-courses',
    label: 'A Level Courses',
    exams: [
      'A Level Mathematics', 'A Level Further Mathematics', 'A Level Physics',
      'A Level Chemistry', 'A Level Biology', 'A Level Computer Science',
      'A Level Information Technology', 'A Level Economics', 'A Level Business',
      'A Level Accounting', 'A Level Psychology', 'A Level Sociology',
      'A Level History', 'A Level Geography', 'A Level English Language',
      'A Level English Literature', 'A Level Global Perspectives & Research',
      'A Level Art and Design', 'A Level Media Studies'
    ]
  }
}

// IB Categories
const IB_CATEGORIES = {
  'ib-courses': {
    id: 'ib-courses',
    label: 'IB Courses',
    exams: [
      'IB Mathematics: Analysis and Approaches', 'IB Mathematics: Applications and Interpretation',
      'IB Physics', 'IB Chemistry', 'IB Biology', 'IB Computer Science',
      'IB Economics', 'IB Business Management', 'IB Psychology', 'IB History',
      'IB Geography', 'IB English A: Language and Literature', 'IB English A: Literature',
      'IB Language B Courses', 'IB Visual Arts', 'IB Theory of Knowledge (TOK)', 'IB Extended Essay (EE)'
    ]
  }
}

// Subject Categories (S tab)
const SUBJECT_CATEGORIES = {
  'mathematics': {
    id: 'mathematics',
    label: 'Mathematics',
    exams: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Trigonometry', 'Linear Algebra']
  },
  'sciences': {
    id: 'sciences',
    label: 'Sciences',
    exams: ['Physics', 'Chemistry', 'Biology', 'Earth Science', 'Environmental Science']
  },
  'languages': {
    id: 'languages',
    label: 'Languages',
    exams: ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean']
  },
  'humanities': {
    id: 'humanities',
    label: 'Humanities',
    exams: ['History', 'Geography', 'Economics', 'Psychology', 'Sociology', 'Philosophy']
  },
  'arts': {
    id: 'arts',
    label: 'Arts',
    exams: ['Visual Arts', 'Music', 'Drama', 'Film Studies']
  }
}

interface ExamCategory {
  id: string
  label: string
  exams: string[]
}

export default function CategoriesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('global')
  const [searchQuery, setSearchQuery] = useState('')

  // Get countries for selected region
  const availableCountries = useMemo(() => {
    if (!selectedRegion) return []
    const region = REGIONS.find(r => r.id === selectedRegion)
    return region ? [...region.countries, NOT_LISTED_COUNTRY] : [NOT_LISTED_COUNTRY]
  }, [selectedRegion])

  // Get selected country name
  const selectedCountry = useMemo(() => {
    if (!selectedCountryCode) return null
    if (selectedCountryCode === 'OTHER') return NOT_LISTED_COUNTRY
    return availableCountries.find(c => c.code === selectedCountryCode)
  }, [selectedCountryCode, availableCountries])

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
          {/* Left Column - Region, Country & Categories */}
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
            <Card className="h-[600px] flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
                <CardHeader className="pb-0">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="global" className="text-xs md:text-sm">
                      <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Global Exams
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
                    <TabsTrigger value="subject" className="text-xs md:text-sm">
                      <School className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      S
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
                    {/* Global Exams Tab - Shows Admission, English Proficiency, Postgraduate */}
                    <TabsContent value="global" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {renderCategorySection(GLOBAL_EXAMS_CATEGORIES['admission-exams'])}
                          {renderCategorySection(GLOBAL_EXAMS_CATEGORIES['english-proficiency'])}
                          {renderCategorySection(GLOBAL_EXAMS_CATEGORIES['postgraduate-exams'])}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* AP Tab */}
                    <TabsContent value="ap" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {Object.values(AP_CATEGORIES).map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* A Level Tab */}
                    <TabsContent value="alevel" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {Object.values(A_LEVEL_CATEGORIES).map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* IB Tab */}
                    <TabsContent value="ib" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {Object.values(IB_CATEGORIES).map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Subject (S) Tab */}
                    <TabsContent value="subject" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {Object.values(SUBJECT_CATEGORIES).map(renderCategorySection)}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </div>
                </CardContent>
              </Tabs>
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
