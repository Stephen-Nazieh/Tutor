/**
 * useWhiteboardPages Hook
 * Manages multiple whiteboard pages
 */

import { useCallback, useState } from 'react'

export interface Page {
    id: string
    name: string
    strokes: any[]
    texts: any[]
    shapes: any[]
    backgroundColor: string
    backgroundStyle: 'solid' | 'grid' | 'dots' | 'lines'
    backgroundImage?: string
}

interface UseWhiteboardPagesProps {
    externalPages?: Page[]
    externalPageIndex?: number
    onPagesChange?: (pages: Page[]) => void
    onPageIndexChange?: (index: number) => void
}

const createDefaultPage = (index: number): Page => ({
    id: `page-${Date.now()}-${index}`,
    name: `Page ${index + 1}`,
    strokes: [],
    texts: [],
    shapes: [],
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid'
})

export function useWhiteboardPages({
    externalPages,
    externalPageIndex,
    onPagesChange,
    onPageIndexChange
}: UseWhiteboardPagesProps = {}) {
    const [internalPages, setInternalPages] = useState<Page[]>([createDefaultPage(0)])
    const [internalPageIndex, setInternalPageIndex] = useState(0)

    const isExternal = externalPages !== undefined
    const pages = isExternal ? externalPages : internalPages
    const currentPageIndex = isExternal ? (externalPageIndex ?? 0) : internalPageIndex

    const setPages = useCallback((updater: Page[] | ((prev: Page[]) => Page[])) => {
        if (isExternal) {
            const newPages = typeof updater === 'function' ? updater(pages) : updater
            onPagesChange?.(newPages)
        } else {
            setInternalPages(prev => typeof updater === 'function' ? updater(prev) : updater)
        }
    }, [isExternal, pages, onPagesChange])

    const setCurrentPageIndex = useCallback((index: number) => {
        if (isExternal) {
            onPageIndexChange?.(index)
        } else {
            setInternalPageIndex(index)
        }
    }, [isExternal, onPageIndexChange])

    const addPage = useCallback(() => {
        const newPage = createDefaultPage(pages.length)
        setPages(prev => [...prev, newPage])
        setCurrentPageIndex(pages.length)
    }, [pages.length, setPages, setCurrentPageIndex])

    const deletePage = useCallback((index: number) => {
        if (pages.length <= 1) return
        setPages(prev => prev.filter((_, i) => i !== index))
        if (currentPageIndex >= index && currentPageIndex > 0) {
            setCurrentPageIndex(currentPageIndex - 1)
        }
    }, [pages.length, currentPageIndex, setPages, setCurrentPageIndex])

    const updatePageBackground = useCallback((color: string, style: 'solid' | 'grid' | 'dots' | 'lines') => {
        setPages(prev =>
            prev.map((page, i) => i === currentPageIndex ? { ...page, backgroundColor: color, backgroundStyle: style } : page)
        )
    }, [currentPageIndex, setPages])

    const currentPage = pages[currentPageIndex] || pages[0]

    return {
        pages,
        currentPage,
        currentPageIndex,
        setPages,
        addPage,
        deletePage,
        setCurrentPageIndex,
        updatePageBackground
    }
}
