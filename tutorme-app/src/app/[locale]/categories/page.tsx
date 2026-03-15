'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CategorySelector } from '@/components/categories'
import { BookOpen, ArrowLeft, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function CategoriesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Filter selected categories based on search
  const filteredSelectedCategories = selectedCategories.filter(cat =>
    cat.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#1F2933] text-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-xl font-bold">Solocorn Categories</span>
            </div>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933] mb-4">Explore All Categories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive catalog of exams and subjects. Select your region and country 
            to see country-specific exams, or explore global exams available worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category Selector */}
          <div className="lg:col-span-2">
            <CategorySelector
              selectedCountry={selectedCountry}
              selectedCategories={selectedCategories}
              onCountryChange={setSelectedCountry}
              onCategoriesChange={setSelectedCategories}
              maxHeight="500px"
            />
          </div>

          {/* Sidebar - Selected Categories */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#4FD1C5] text-white text-xs flex items-center justify-center">
                    {selectedCategories.length}
                  </span>
                  Selected Categories
                </CardTitle>
                <CardDescription>
                  {selectedCategories.length === 0 
                    ? 'No categories selected yet' 
                    : `${selectedCategories.length} categor${selectedCategories.length === 1 ? 'y' : 'ies'} selected`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search selected */}
                {selectedCategories.length > 5 && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search selected..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                )}

                {/* Selected badges */}
                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
                  {(searchQuery ? filteredSelectedCategories : selectedCategories).map(cat => (
                    <Badge 
                      key={cat}
                      variant="secondary"
                      className="cursor-pointer bg-[#4FD1C5]/20 text-[#1F2933] hover:bg-[#4FD1C5]/30"
                      onClick={() => setSelectedCategories(prev => prev.filter(c => c !== cat))}
                    >
                      {cat} ×
                    </Badge>
                  ))}
                  {searchQuery && filteredSelectedCategories.length === 0 && (
                    <p className="text-sm text-gray-500">No matching categories</p>
                  )}
                </div>

                {/* Clear all button */}
                {selectedCategories.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCategories([])}
                    className="w-full"
                  >
                    Clear All Selections
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Category Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Global Exams</span>
                  <Badge variant="secondary">Available</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">National Exams</span>
                  <Badge variant={selectedCountry && selectedCountry !== 'OTHER' ? "secondary" : "outline"}>
                    {selectedCountry && selectedCountry !== 'OTHER' ? 'Available' : 'Select Country'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Selections</span>
                  <span className="font-semibold text-[#1D4ED8]">{selectedCategories.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-[#4FD1C5]/10 to-[#1D4ED8]/10 border-[#4FD1C5]/30">
              <CardContent className="pt-6">
                <h4 className="font-semibold text-[#1F2933] mb-2">Ready to start tutoring?</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Create an account and start sharing your expertise with students worldwide.
                </p>
                <Link href="/register/tutor">
                  <Button className="w-full bg-[#F17623] hover:bg-[#e06613]">
                    Become a Tutor
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#4FD1C5] text-white flex items-center justify-center text-sm">1</span>
                Select Region
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose your region to see available countries. Each region has specific exams tailored to local education systems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-sm">2</span>
                Choose Country
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Select your country to see national exams. Choose &quot;Not Listed&quot; for countries without specific categories.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#F17623] text-white flex items-center justify-center text-sm">3</span>
                Pick Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Browse Global Exams (AP, IB, A Level) and National Exams to find the subjects you want to teach.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
