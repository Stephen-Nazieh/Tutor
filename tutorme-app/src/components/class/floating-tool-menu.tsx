import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PenTool,
  Pencil,
  Eraser,
  Palette,
  Circle,
  Type,
  MousePointer2,
  Trash2,
  X,
  Square,
  Triangle,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FloatingToolMenuProps {
  currentTool: string
  currentColor: string
  onToolChange: (tool: any) => void
  onColorChange: (color: string) => void
  onClear: () => void
  isDrawing: boolean
  currentPointerPos: { x: number; y: number } | null
}

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Green', value: '#22c55e' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Purple', value: '#a855f7' },
]

export function FloatingToolMenu({
  currentTool,
  currentColor,
  onToolChange,
  onColorChange,
  onClear,
  isDrawing,
  currentPointerPos,
}: FloatingToolMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 20 })
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Auto-evasion logic
  useEffect(() => {
    if (isDrawing && currentPointerPos && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const widgetCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
      
      // Calculate distance between pointer and widget center
      const dx = currentPointerPos.x - widgetCenter.x
      const dy = currentPointerPos.y - widgetCenter.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      const evasionRadius = 150 // Distance within which the widget evades
      
      if (distance < evasionRadius) {
        // Determine the safe corner or opposite side within the parent container
        const parent = containerRef.current.parentElement
        if (parent) {
          const parentRect = parent.getBoundingClientRect()
          // Use pointer position relative to parent to determine where to jump
          const relX = currentPointerPos.x - parentRect.left
          const relY = currentPointerPos.y - parentRect.top
          
          const newX = relX > parentRect.width / 2 ? 20 : parentRect.width - 100
          const newY = relY > parentRect.height / 2 ? 20 : parentRect.height - 100
          
          setPosition({ x: newX, y: newY })
        } else {
          const newX = currentPointerPos.x > window.innerWidth / 2 ? 20 : window.innerWidth - 200
          const newY = currentPointerPos.y > window.innerHeight / 2 ? 20 : window.innerHeight - 200
          setPosition({ x: newX, y: newY })
        }
        
        if (isOpen) setIsOpen(false) // Auto-collapse when evading
      }
    }
  }, [isDrawing, currentPointerPos, position, isOpen])

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Main floating button icon based on current tool
  const getIcon = () => {
    switch (currentTool) {
      case 'pen': return <PenTool className="h-6 w-6" />
      case 'line': return <Minus className="h-6 w-6" />
      case 'rectangle': return <Square className="h-6 w-6" />
      case 'circle': return <Circle className="h-6 w-6" />
      case 'triangle': return <Triangle className="h-6 w-6" />
      case 'eraser': return <Eraser className="h-6 w-6" />
      case 'text': return <Type className="h-6 w-6" />
      case 'select': return <MousePointer2 className="h-6 w-6" />
      default: return <Pencil className="h-6 w-6" />
    }
  }

  // Radial menu items
  const menuItems = [
    { icon: <Pencil className="h-5 w-5" />, label: 'Pen', action: () => onToolChange('pen'), active: currentTool === 'pen' },
    { icon: <Minus className="h-5 w-5" />, label: 'Line', action: () => onToolChange('line'), active: currentTool === 'line' },
    { icon: <Square className="h-5 w-5" />, label: 'Rectangle', action: () => onToolChange('rectangle'), active: currentTool === 'rectangle' },
    { icon: <Circle className="h-5 w-5" />, label: 'Circle', action: () => onToolChange('circle'), active: currentTool === 'circle' },
    { icon: <Triangle className="h-5 w-5" />, label: 'Triangle', action: () => onToolChange('triangle'), active: currentTool === 'triangle' },
    { icon: <Type className="h-5 w-5" />, label: 'Text', action: () => onToolChange('text'), active: currentTool === 'text' },
    { icon: <Eraser className="h-5 w-5" />, label: 'Eraser', action: () => onToolChange('eraser'), active: currentTool === 'eraser' },
    { icon: <MousePointer2 className="h-5 w-5" />, label: 'Select', action: () => onToolChange('select'), active: currentTool === 'select' },
    { icon: <Trash2 className="h-5 w-5" />, label: 'Clear', action: () => { onClear(); setIsOpen(false) }, active: false, isDestructive: true },
  ]

  const radius = 90 // Slightly larger radius for the radial menu to accommodate more items

  return (
    <motion.div
      ref={containerRef}
      className="absolute z-50 pointer-events-auto"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      drag
      dragMomentum={false}
      onDragEnd={(e, info) => {
        setPosition({
          x: position.x + info.offset.x,
          y: position.y + info.offset.y
        })
      }}
      style={{ touchAction: 'none' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Radial Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Tools */}
              {menuItems.map((item, index) => {
                const angle = (index * (Math.PI * 2)) / menuItems.length - Math.PI / 2
                const x = Math.cos(angle) * radius
                const y = Math.sin(angle) * radius

                return (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{ opacity: 1, x, y, scale: 1 }}
                    exit={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.05 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      item.action()
                    }}
                    className={cn(
                      "absolute flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-colors",
                      item.active ? "bg-cyan-100 text-cyan-600 border-2 border-cyan-400" : 
                      item.isDestructive ? "bg-white text-rose-500 hover:bg-rose-50" :
                      "bg-white text-slate-700 hover:bg-slate-50"
                    )}
                    title={item.label}
                  >
                    {item.icon}
                  </motion.button>
                )
              })}

              {/* Colors Arch (below the circle) */}
              <motion.div 
                className="absolute top-[100px] flex gap-2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-md border border-slate-200"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: 'spring', delay: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                {COLORS.map((c) => (
                  <button
                    key={c.name}
                    className={cn(
                      "h-8 w-8 rounded-full shadow-sm transition-transform hover:scale-110",
                      currentColor === c.value && "ring-2 ring-cyan-400 ring-offset-2"
                    )}
                    style={{ backgroundColor: c.value }}
                    onClick={() => onColorChange(c.value)}
                    title={c.name}
                  />
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Center Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,0,0,0.15)] transition-colors",
            isOpen ? "bg-slate-800 text-white" : "bg-white text-slate-800 hover:bg-slate-50",
            !isOpen && currentColor !== '#000000' && currentTool === 'pen' && "border-4 border-solid"
          )}
          style={{
            borderColor: !isOpen && currentColor !== '#000000' && currentTool === 'pen' ? currentColor : undefined
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : getIcon()}
        </motion.button>
      </div>
    </motion.div>
  )
}
