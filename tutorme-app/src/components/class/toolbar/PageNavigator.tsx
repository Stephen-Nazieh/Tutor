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
    readOnly = false
}: PageNavigatorProps) {
    const hasPrevious = currentPageIndex > 0
    const hasNext = currentPageIndex < pages.length - 1
    const canDelete = pages.length > 1

    return (
        <div className="absolute top-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-2 flex items-center gap-2 z-10">
            {/* Previous Page */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onPageChange(currentPageIndex - 1)}
                disabled={!hasPrevious}
                title="Previous Page"
                className="w-8 h-8 p-0"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Page Indicator */}
            <div className="px-3 py-1 bg-gray-900 rounded text-sm font-mono min-w-[80px] text-center">
                {pages[currentPageIndex]?.name || `Page ${currentPageIndex + 1}`}
                <span className="text-gray-500 ml-1">
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
                className="w-8 h-8 p-0"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>

            {!readOnly && (
                <>
                    <div className="w-px h-6 bg-gray-700 mx-1" />

                    {/* Add Page */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onAddPage}
                        title="Add Page"
                        className="w-8 h-8 p-0"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>

                    {/* Delete Page */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => canDelete && onDeletePage(currentPageIndex)}
                        disabled={!canDelete}
                        title="Delete Page"
                        className="w-8 h-8 p-0 text-red-400 hover:text-red-300"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </>
            )}
        </div>
    )
}
