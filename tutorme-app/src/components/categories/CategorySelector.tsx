'use client'

import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  REGIONS,
  GLOBAL_EXAM_CATEGORIES,
  OTHER_COUNTRY,
  type ExamCategory,
  getCategoriesForCountry,
} from '@/lib/tutoring/categories-new'
import { Globe, MapPin, BookOpen, GraduationCap, Check } from 'lucide-react'

interface CategorySelectorProps {
  selectedCountry: string | null
  selectedCategories: string[]
  onCountryChange: (countryCode: string | null) => void
  onCategoriesChange: (categories: string[]) => void
  className?: string
  maxHeight?: string
}

export function CategorySelector({
  selectedCountry,
  selectedCategories,
  onCountryChange,
  onCategoriesChange,
  className,
  maxHeight = '400px',
}: CategorySelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  // Get available countries based on region selection
  const availableCountries = useMemo(() => {
    if (!selectedRegion) return []
    const region = REGIONS.find(r => r.id === selectedRegion)
    return region ? [...region.countries, OTHER_COUNTRY] : [OTHER_COUNTRY]
  }, [selectedRegion])

  // Get categories for selected country
  const { global: globalCategories, national: nationalCategories } = useMemo(() => {
    return getCategoriesForCountry(selectedCountry)
  }, [selectedCountry])

  // Toggle category selection
  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    onCategoriesChange(newCategories)
  }

  // Select all in category
  const selectAllInCategory = (exams: string[]) => {
    const newCategories = [...selectedCategories]
    exams.forEach(exam => {
      if (!newCategories.includes(exam)) {
        newCategories.push(exam)
      }
    })
    onCategoriesChange(newCategories)
  }

  // Clear all in category
  const clearAllInCategory = (exams: string[]) => {
    const newCategories = selectedCategories.filter(c => !exams.includes(c))
    onCategoriesChange(newCategories)
  }

  return (
    <div
      className={cn('w-full overflow-hidden rounded-lg border border-gray-200 bg-white', className)}
    >
      {/* Header with Region and Country Selection */}
      <div className="space-y-4 border-b border-gray-200 bg-gray-50 p-4">
        {/* Region Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Globe className="h-4 w-4 text-[#4FD1C5]" />
            Select Region
          </Label>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map(region => (
              <Button
                key={region.id}
                variant={selectedRegion === region.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setSelectedRegion(region.id)
                  onCountryChange(null)
                }}
                className={cn(selectedRegion === region.id && 'bg-[#1D4ED8] hover:bg-[#1e40af]')}
              >
                {region.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Country Selection */}
        {selectedRegion && (
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-[#F17623]" />
              Select Country
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableCountries.map(country => (
                <Button
                  key={country.code}
                  variant={selectedCountry === country.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() =>
                    onCountryChange(country.code === selectedCountry ? null : country.code)
                  }
                  className={cn(
                    selectedCountry === country.code && 'bg-[#F17623] hover:bg-[#e06613]'
                  )}
                >
                  {country.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Categories Summary */}
        {selectedCategories.length > 0 && (
          <div className="flex items-center gap-2 border-t pt-2">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">
              {selectedCategories.length} categor{selectedCategories.length === 1 ? 'y' : 'ies'}{' '}
              selected
            </span>
          </div>
        )}
      </div>

      {/* Categories Tabs */}
      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Global Exams
          </TabsTrigger>
          <TabsTrigger
            value="national"
            className="flex items-center gap-2"
            disabled={!selectedCountry || selectedCountry === 'OTHER'}
          >
            <GraduationCap className="h-4 w-4" />
            National
            {selectedCountry && selectedCountry !== 'OTHER' && (
              <Badge variant="secondary" className="ml-1 text-xs">
                {getCategoriesForCountry(selectedCountry).national.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Global Exams Tab */}
        <TabsContent value="global" className="m-0">
          <ScrollArea className="h-[400px]" style={{ maxHeight }}>
            <div className="space-y-6 p-4">
              {globalCategories.map(category => (
                <ExamCategorySection
                  key={category.id}
                  category={category}
                  selectedCategories={selectedCategories}
                  onToggle={toggleCategory}
                  onSelectAll={() => selectAllInCategory(category.exams)}
                  onClearAll={() => clearAllInCategory(category.exams)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* National Exams Tab */}
        <TabsContent value="national" className="m-0">
          <ScrollArea className="h-[400px]" style={{ maxHeight }}>
            <div className="space-y-6 p-4">
              {nationalCategories.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  <GraduationCap className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                  <p>No national exams available for the selected country.</p>
                  <p className="mt-1 text-sm">Select Global Exams instead.</p>
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
                  />
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
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
}

function ExamCategorySection({
  category,
  selectedCategories,
  onToggle,
  onSelectAll,
  onClearAll,
}: ExamCategorySectionProps) {
  const selectedCount = category.exams.filter(exam => selectedCategories.includes(exam)).length
  const isFullySelected = selectedCount === category.exams.length && category.exams.length > 0

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[#1D4ED8]" />
          <h4 className="font-semibold text-gray-900">{category.label}</h4>
          {selectedCount > 0 && (
            <Badge variant="secondary" className="bg-[#4FD1C5]/20 text-xs text-[#1F2933]">
              {selectedCount}/{category.exams.length}
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

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {category.exams.map(exam => (
          <label
            key={exam}
            className={cn(
              'flex cursor-pointer items-center gap-2 rounded-md p-2 transition-colors',
              selectedCategories.includes(exam)
                ? 'border border-[#4FD1C5]/30 bg-[#4FD1C5]/10'
                : 'border border-transparent hover:bg-gray-50'
            )}
          >
            <Checkbox
              checked={selectedCategories.includes(exam)}
              onCheckedChange={() => onToggle(exam)}
            />
            <span
              className={cn(
                'text-sm',
                selectedCategories.includes(exam) ? 'font-medium text-[#1F2933]' : 'text-gray-700'
              )}
            >
              {exam}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CategorySelector
