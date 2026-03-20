/**
 * Page Navigator Component
 * Multi-page navigation for whiteboard
 */

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react'

interface PageNavigatorProps {
  pages: Array<{ id: string; name: string }>
  currentPageIndex: number
  onPageChange: (index: number) => void
  onAddPage: () => void
  onDeletePage: (index: number) => void
  readOnly?: boolean
}

export function PageNavigator({
  pages,
  currentPageIndex,
  onPageChange,
  onAddPage,
  onDeletePage,
  readOnly = false,
}: PageNavigatorProps) {
  const hasPrevious = currentPageIndex > 0
  const hasNext = currentPageIndex < pages.length - 1
  const canDelete = pages.length > 1

  return (
    <div className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/90 p-2 shadow-lg backdrop-blur-sm">
      {/* Previous Page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPageIndex - 1)}
        disabled={!hasPrevious}
        title="Previous Page"
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Indicator */}
      <div className="min-w-[80px] rounded bg-gray-900 px-3 py-1 text-center font-mono text-sm">
        {pages[currentPageIndex]?.name || `Page ${currentPageIndex + 1}`}
        <span className="ml-1 text-gray-500">
          ({currentPageIndex + 1}/{pages.length})
        </span>
      </div>

      {/* Next Page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange(currentPageIndex + 1)}
        disabled={!hasNext}
        title="Next Page"
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {!readOnly && (
        <>
          <div className="mx-1 h-6 w-px bg-gray-700" />

          {/* Add Page */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onAddPage}
            title="Add Page"
            className="h-8 w-8 p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>

          {/* Delete Page */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => canDelete && onDeletePage(currentPageIndex)}
            disabled={!canDelete}
            title="Delete Page"
            className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  )
}
