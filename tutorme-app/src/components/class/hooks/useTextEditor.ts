/**
 * useTextEditor Hook
 * Manages text overlays and editing on the whiteboard
 */

import { useCallback, useRef, useState } from 'react'

export interface TextFormat {
    bold?: boolean
    italic?: boolean
    underline?: boolean
    align?: 'left' | 'center' | 'right'
    color?: string
}

export interface TextElement {
    id: string
    text: string
    x: number
    y: number
    color?: string
    fontSize?: number
    format?: TextFormat
    width?: number
    height?: number
}

export interface TextOverlay {
    id: string
    x: number
    y: number
    text: string
    fontSize: number
    format: TextFormat
    width: number
    height: number
}

export function useTextEditor(defaultFontSize = 24, defaultColor = '#000000') {
    const [textElements, setTextElements] = useState<TextElement[]>([])
    const [textOverlays, setTextOverlays] = useState<TextOverlay[]>([])
    const overlaysRef = useRef<TextOverlay[]>([])
    const [selectedTextId, setSelectedTextId] = useState<string | null>(null)
    const [fontSize, setFontSize] = useState(defaultFontSize)
    const [textFormat, setTextFormat] = useState<TextFormat>({
        bold: false,
        italic: false,
        underline: false,
        align: 'left',
        color: defaultColor
    })
    const setOverlays = useCallback((next: TextOverlay[]) => {
        overlaysRef.current = next
        setTextOverlays(next)
    }, [])

    const startTextEditing = useCallback((x: number, y: number) => {
        const overlay: TextOverlay = {
            id: `text-overlay-${Date.now()}`,
            x,
            y,
            text: '',
            fontSize,
            format: { ...textFormat },
            width: 200,
            height: 100
        }
        const next = [...overlaysRef.current, overlay]
        setOverlays(next)
        setSelectedTextId(overlay.id)
        return overlay.id
    }, [fontSize, setOverlays, textFormat])

    const updateText = useCallback((id: string, updates: Partial<TextOverlay>) => {
        const next = overlaysRef.current.map(overlay =>
            overlay.id === id ? { ...overlay, ...updates } : overlay
        )
        setOverlays(next)
    }, [setOverlays])

    const confirmText = useCallback((id: string) => {
        const overlay = overlaysRef.current.find(o => o.id === id)
        if (!overlay || !overlay.text.trim()) {
            setOverlays(overlaysRef.current.filter(o => o.id !== id))
            setSelectedTextId(null)
            return
        }

        const newTextElement: TextElement = {
            id: `text-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
            text: overlay.text,
            x: overlay.x,
            y: overlay.y,
            color: overlay.format.color || defaultColor,
            fontSize: overlay.fontSize,
            format: overlay.format,
            width: overlay.width,
            height: overlay.height
        }

        setTextElements(prev => [...prev, newTextElement])
        setOverlays(overlaysRef.current.filter(o => o.id !== id))
        setSelectedTextId(null)
    }, [defaultColor, setOverlays])

    const deleteText = useCallback((id: string) => {
        setTextElements(prev => prev.filter(t => t.id !== id))
        setOverlays(overlaysRef.current.filter(o => o.id !== id))
        if (selectedTextId === id) setSelectedTextId(null)
    }, [selectedTextId, setOverlays])

    const updateTextFormat = useCallback((format: Partial<TextFormat>) => {
        setTextFormat(prev => ({ ...prev, ...format }))
    }, [])

    const toggleBold = useCallback(() => {
        setTextFormat(prev => ({ ...prev, bold: !prev.bold }))
    }, [])

    const toggleItalic = useCallback(() => {
        setTextFormat(prev => ({ ...prev, italic: !prev.italic }))
    }, [])

    const toggleUnderline = useCallback(() => {
        setTextFormat(prev => ({ ...prev, underline: !prev.underline }))
    }, [])

    const setAlignment = useCallback((align: 'left' | 'center' | 'right') => {
        setTextFormat(prev => ({ ...prev, align }))
    }, [])

    const setTextElementsCallback = useCallback((elements: TextElement[]) => {
        setTextElements(elements)
    }, [])

    return {
        textElements,
        textOverlays,
        selectedTextId,
        fontSize,
        textFormat,
        setFontSize,
        startTextEditing,
        updateText,
        confirmText,
        deleteText,
        updateTextFormat,
        toggleBold,
        toggleItalic,
        toggleUnderline,
        setAlignment,
        setTextElements: setTextElementsCallback,
        setSelectedTextId
    }
}
