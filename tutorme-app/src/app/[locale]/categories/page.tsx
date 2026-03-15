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
  Sparkles,
  School
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  REGIONS,
  GLOBAL_EXAM_CATEGORIES,
  OTHER_COUNTRY,
  type ExamCategory,
  type SubjectCourse,
  getCategoriesForCountry,
  getCountryByCode,
  type Country
} from '@/lib/tutoring/categories-new'

// Reorganize global categories into tabs as per Categories.docx
const GLOBAL_EXAMS_ONLY: ExamCategory[] = [
  {
    id: 'admission-exams',
    label: 'Admission Exams',
    exams: ['SAT', 'ACT']
  },
  {
    id: 'english-proficiency',
    label: 'English Proficiency',
    exams: [
      'IELTS Academic', 'IELTS General', 'TOEFL iBT', 'PTE Academic',
      'Duolingo English Test', 'CPE', 'CAE', 'Cambridge B2',
      'International ESOL', 'Oxford Test of English', 'iTEP Academic',
      'TOEIC', 'MET', 'EIKEN'
    ]
  },
  {
    id: 'postgraduate-exams',
    label: 'Postgraduate Exams',
    exams: ['GRE', 'GMAT', 'LSAT', 'MCAT', 'UCAT']
  }
]

const AP_CATEGORIES: ExamCategory[] = [
  {
    id: 'ap-stem',
    label: 'AP - STEM',
    exams: [
      'AP Calculus AB', 'AP Calculus BC', 'AP Statistics', 'AP Biology',
      'AP Chemistry', 'AP Physics 1', 'AP Physics 2',
      'AP Physics C: Mechanics', 'AP Physics C: Electricity and Magnetism',
      'AP Environmental Science', 'AP Computer Science A', 'AP Computer Science Principles'
    ]
  },
  {
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
  {
    id: 'ap-languages',
    label: 'AP - Languages',
    exams: [
      'AP Chinese Language and Culture', 'AP French Language and Culture',
      'AP German Language and Culture', 'AP Italian Language and Culture',
      'AP Japanese Language and Culture', 'AP Latin',
      'AP Spanish Language and Culture', 'AP Spanish Literature and Culture'
    ]
  },
  {
    id: 'ap-art',
    label: 'AP - Art',
    exams: [
      'AP Art History', 'AP Music Theory',
      'AP Studio Art: 2-D Art and Design', 'AP Studio Art: 3-D Art and Design', 'AP Drawing'
    ]
  }
]

const A_LEVEL_CATEGORIES: ExamCategory[] = [
  {
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
  {
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
]

const IB_CATEGORIES: ExamCategory[] = [
  {
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
]

export default function CategoriesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('global')
  const [searchQuery, setSearchQuery] = useState('')

  // Get selected country object
  const selectedCountry = useMemo(() => {
    if (!selectedCountryCode) return null
    if (selectedCountryCode === 'OTHER') return OTHER_COUNTRY
    return getCountryByCode(selectedCountryCode)
  }, [selectedCountryCode])

  // Get countries for selected region
  const availableCountries = useMemo(() => {
    if (!selectedRegion) return []
    const region = REGIONS.find(r => r.id === selectedRegion)
    if (!region) return []
    return [...region.countries, OTHER_COUNTRY]
  }, [selectedRegion])

  // Get categories for selected country
  const { national: nationalCategories } = useMemo(() => {
    return getCategoriesForCountry(selectedCountryCode)
  }, [selectedCountryCode])

  // Get subject courses for selected country
  const subjectCourses = useMemo(() => {
    return selectedCountry?.subjectCourses || []
  }, [selectedCountry])

  // Prefix exams with country name for "country-specific" feel
  const getPrefixedExamName = (exam: string): string => {
    if (!selectedCountry || selectedCountry.code === 'OTHER') return exam
    // Don't prefix if already contains country/region name
    if (exam.includes(selectedCountry.name)) return exam
    // For English proficiency exams, add country prefix
    if (['IELTS', 'TOEFL', 'SAT', 'ACT', 'GRE', 'GMAT'].some(e => exam.includes(e))) {
      return `${selectedCountry.name} - ${exam}`
    }
    return exam
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

  // Filter categories based on search
  const filterBySearch = (exams: string[]) => {
    if (!searchQuery) return exams
    return exams.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedCategories([])
  }

  // Remove single category
  const removeCategory = (category: string) => {
    setSelectedCategories(prev => prev.filter(c => c !== category))
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
          {/* Left Column - Category Selector */}
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
                  <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
                    <TabsTrigger value="global" className="text-xs md:text-sm">
                      <Globe className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      <span className="hidden sm:inline">Global</span>
                      <span className="sm:hidden">Global</span>
                    </TabsTrigger>
                    <TabsTrigger value="ap" className="text-xs md:text-sm">
                      <School className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
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
                      <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                      Subject
                    </TabsTrigger>
                    <TabsTrigger 
                      value="national" 
                      className="text-xs md:text-sm"
                      disabled={!selectedCountryCode || selectedCountryCode === 'OTHER' || nationalCategories.length === 0}
                    >
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
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
                          {GLOBAL_EXAMS_ONLY.map(category => (
                            <ExamCategorySection
                              key={category.id}
                              category={category}
                              selectedCategories={selectedCategories}
                              onToggle={toggleCategory}
                              onSelectAll={() => selectAllInCategory(category.exams)}
                              onClearAll={() => clearAllInCategory(category.exams)}
                              searchQuery={searchQuery}
                              getPrefixedExamName={getPrefixedExamName}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* AP Tab */}
                    <TabsContent value="ap" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {AP_CATEGORIES.map(category => (
                            <ExamCategorySection
                              key={category.id}
                              category={category}
                              selectedCategories={selectedCategories}
                              onToggle={toggleCategory}
                              onSelectAll={() => selectAllInCategory(category.exams)}
                              onClearAll={() => clearAllInCategory(category.exams)}
                              searchQuery={searchQuery}
                              getPrefixedExamName={getPrefixedExamName}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* A Level Tab */}
                    <TabsContent value="alevel" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {A_LEVEL_CATEGORIES.map(category => (
                            <ExamCategorySection
                              key={category.id}
                              category={category}
                              selectedCategories={selectedCategories}
                              onToggle={toggleCategory}
                              onSelectAll={() => selectAllInCategory(category.exams)}
                              onClearAll={() => clearAllInCategory(category.exams)}
                              searchQuery={searchQuery}
                              getPrefixedExamName={getPrefixedExamName}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* IB Tab */}
                    <TabsContent value="ib" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {IB_CATEGORIES.map(category => (
                            <ExamCategorySection
                              key={category.id}
                              category={category}
                              selectedCategories={selectedCategories}
                              onToggle={toggleCategory}
                              onSelectAll={() => selectAllInCategory(category.exams)}
                              onClearAll={() => clearAllInCategory(category.exams)}
                              searchQuery={searchQuery}
                              getPrefixedExamName={getPrefixedExamName}
                            />
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* Subject Tab */}
                    <TabsContent value="subject" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {!selectedCountryCode ? (
                            <div className="text-center py-12 text-gray-500">
                              <School className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>Please select a country to view subject courses.</p>
                            </div>
                          ) : subjectCourses.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                              <School className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>No subject courses available for {selectedCountry?.name || 'this country'}.</p>
                            </div>
                          ) : (
                            subjectCourses.map((course, idx) => (
                              <SubjectCourseSection
                                key={idx}
                                course={course}
                                selectedCategories={selectedCategories}
                                onToggle={toggleCategory}
                                onSelectAll={() => selectAllInCategory(course.subjects)}
                                onClearAll={() => clearAllInCategory(course.subjects)}
                                searchQuery={searchQuery}
                              />
                            ))
                          )}
                        </div>
                      </ScrollArea>
                    </TabsContent>

                    {/* National Tab */}
                    <TabsContent value="national" className="h-full m-0">
                      <ScrollArea className="h-full pr-4">
                        <div className="space-y-6 pb-4">
                          {!selectedCountryCode ? (
                            <div className="text-center py-12 text-gray-500">
                              <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>Please select a country to view national exams.</p>
                            </div>
                          ) : selectedCountryCode === 'OTHER' ? (
                            <div className="text-center py-12 text-gray-500">
                              <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>&quot;Not Listed&quot; countries do not have specific national exams.</p>
                              <p className="text-sm mt-1">Please use Global Exams, AP, A Level, or IB tabs instead.</p>
                            </div>
                          ) : nationalCategories.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                              <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                              <p>No national exams available for {selectedCountry?.name} yet.</p>
                            </div>
                          ) : (
                            nationalCategories.map(category => (
                              <ExamCategorySection
                                key={category.id}
                                category={category}
                                selectedCategories={selectedCategories}
                                onToggle={toggleCategory}
                                onSelectAll={() => selectAllInCategory(category.exams)}
                                onClearAll={() => clearAllInCategory(category.exams)}
                                searchQuery={searchQuery}
                                getPrefixedExamName={(e) => e}
                              />
                            ))
                          )}
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

// Exam Category Section Component
interface ExamCategorySectionProps {
  category: ExamCategory
  selectedCategories: string[]
  onToggle: (exam: string) => void
  onSelectAll: () => void
  onClearAll: () => void
  searchQuery: string
  getPrefixedExamName?: (exam: string) => string
}

function ExamCategorySection({
  category,
  selectedCategories,
  onToggle,
  onSelectAll,
  onClearAll,
  searchQuery,
  getPrefixedExamName = (e) => e
}: ExamCategorySectionProps) {
  const filteredExams = searchQuery 
    ? category.exams.filter(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
    : category.exams

  if (filteredExams.length === 0) return null

  const selectedCount = filteredExams.filter(exam => selectedCategories.includes(exam)).length

  return (
    <div className="space-y-3">
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
            onClick={onSelectAll}
            className="h-7 text-xs text-[#1D4ED8] hover:text-[#1e40af]"
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
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
              onCheckedChange={() => onToggle(exam)}
            />
            <span className={cn(
              "text-sm",
              selectedCategories.includes(exam) ? "text-[#1F2933] font-medium" : "text-gray-700"
            )}>
              {getPrefixedExamName(exam)}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

// Subject Course Section Component
interface SubjectCourseSectionProps {
  course: SubjectCourse
  selectedCategories: string[]
  onToggle: (subject: string) => void
  onSelectAll: () => void
  onClearAll: () => void
  searchQuery: string
}

function SubjectCourseSection({
  course,
  selectedCategories,
  onToggle,
  onSelectAll,
  onClearAll,
  searchQuery
}: SubjectCourseSectionProps) {
  const filteredSubjects = searchQuery 
    ? course.subjects.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : course.subjects

  if (filteredSubjects.length === 0) return null

  const selectedCount = filteredSubjects.filter(s => selectedCategories.includes(s)).length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 text-[#F17623]" />
          <h4 className="font-semibold text-gray-900">{course.gradeLevel}</h4>
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
            onClick={onSelectAll}
            className="h-7 text-xs text-[#1D4ED8] hover:text-[#1e40af]"
          >
            All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="h-7 text-xs text-gray-500 hover:text-gray-700"
          >
            Clear
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredSubjects.map(subject => (
          <label
            key={subject}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors",
              selectedCategories.includes(subject) 
                ? "bg-[#4FD1C5]/10 border border-[#4FD1C5]/30" 
                : "hover:bg-gray-50 border border-transparent"
            )}
          >
            <Checkbox
              checked={selectedCategories.includes(subject)}
              onCheckedChange={() => onToggle(subject)}
            />
            <span className={cn(
              "text-sm",
              selectedCategories.includes(subject) ? "text-[#1F2933] font-medium" : "text-gray-700"
            )}>
              {subject}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
