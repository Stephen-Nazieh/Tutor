// @ts-nocheck
/**
 * Difficulty Resolution Engine
 * Automatically resolves course content to match group difficulty levels
 */

import type { DifficultyLevel, ResolvedContent } from '@/types/course-assignment'
import type { WithDifficultyVariants, DifficultyVariant } from '@/app/tutor/dashboard/components/CourseBuilder'

/**
 * Resolve a single content item for a specific difficulty level
 */
export function resolveContent<T extends WithDifficultyVariants & Record<string, any>>(
  item: T,
  targetDifficulty: DifficultyLevel,
  options: {
    /** Fields that can be overridden by variants */
    variantFields?: (keyof DifficultyVariant)[]
    /** If true, return null for hidden items instead of marking them hidden */
    filterHidden?: boolean
  } = {}
): ResolvedContent<T> | null {
  const { variantFields = ['title', 'description', 'duration', 'instructions', 'points'], filterHidden = false } = options

  // Mode: All Levels - return base content as-is
  if (item.difficultyMode === 'all') {
    return {
      content: item,
      resolution: { type: 'base', source: 'all' }
    }
  }

  // Mode: Fixed - only show if matching target difficulty
  if (item.difficultyMode === 'fixed') {
    if (item.fixedDifficulty !== targetDifficulty) {
      if (filterHidden) return null
      return {
        content: item,
        resolution: { type: 'hidden', source: 'fixed' },
        hiddenReason: `Fixed to ${item.fixedDifficulty} level - not suitable for ${targetDifficulty} group`
      }
    }
    return {
      content: item,
      resolution: { type: 'base', source: 'fixed' }
    }
  }

  // Mode: Adaptive - apply variant if available
  if (item.difficultyMode === 'adaptive') {
    const variant = item.variants?.[targetDifficulty]

    if (variant?.enabled) {
      // Build resolved content with variant overrides
      const resolved = { ...item }
      const originalValues: Partial<T> = {}

      // Apply variant fields
      for (const field of variantFields) {
        if (variant[field] !== undefined) {
          // Store original
          if (item[field] !== undefined) {
            originalValues[field] = item[field]
          }
          // Apply variant
          ; (resolved as any)[field] = variant[field]
        }
      }

      return {
        content: resolved,
        resolution: {
          type: 'variant',
          source: 'adaptive',
          variantLevel: targetDifficulty
        },
        originalValues: Object.keys(originalValues).length > 0 ? originalValues : undefined
      }
    }

    // No variant enabled, fall back to base
    return {
      content: item,
      resolution: { type: 'base', source: 'adaptive' }
    }
  }

  // Unknown mode - return base
  return {
    content: item,
    resolution: { type: 'base' }
  }
}

/**
 * Resolve an entire array of content items
 */
export function resolveContentArray<T extends WithDifficultyVariants & Record<string, any>>(
  items: T[],
  targetDifficulty: DifficultyLevel,
  options?: Parameters<typeof resolveContent>[2]
): ResolvedContent<T>[] {
  return items
    .map(item => resolveContent(item, targetDifficulty, options))
    .filter((result): result is ResolvedContent<T> => result !== null)
}

/**
 * Filter out hidden items and return only visible content
 */
export function filterVisibleContent<T extends WithDifficultyVariants & Record<string, any>>(
  items: T[],
  targetDifficulty: DifficultyLevel
): T[] {
  return resolveContentArray(items, targetDifficulty, { filterHidden: true })
    .map(r => r.content)
}

/**
 * Get statistics about how content will be resolved
 */
export function getResolutionStats<T extends WithDifficultyVariants & Record<string, any>>(
  items: T[],
  targetDifficulty: DifficultyLevel
) {
  const resolved = resolveContentArray(items, targetDifficulty)

  return {
    total: items.length,
    visible: resolved.filter(r => r.resolution.type !== 'hidden').length,
    hidden: resolved.filter(r => r.resolution.type === 'hidden').length,
    adapted: resolved.filter(r => r.resolution.type === 'variant').length,
    base: resolved.filter(r => r.resolution.type === 'base').length
  }
}

/**
 * Preview how a course will look for a specific group
 */
export function previewCourseForGroup(
  modules: any[],
  groupDifficulty: DifficultyLevel
) {
  const preview = {
    modules: [] as any[],
    stats: {
      totalModules: modules.length,
      visibleModules: 0,
      hiddenModules: 0,
      adaptedContent: 0
    },
    hiddenItems: [] as { type: string; id: string; title: string; reason: string }[],
    adaptedItems: [] as { type: string; id: string; title: string; field: string; original: string; adapted: string }[]
  }

  for (const module of modules) {
    const resolvedModule = resolveContent(module, groupDifficulty)

    if (resolvedModule.resolution.type === 'hidden') {
      preview.stats.hiddenModules++
      preview.hiddenItems.push({
        type: 'module',
        id: module.id,
        title: module.title,
        reason: resolvedModule.hiddenReason || 'Hidden'
      })
      continue
    }

    preview.stats.visibleModules++
    if (resolvedModule.resolution.type === 'variant') {
      preview.stats.adaptedContent++
    }

    const modulePreview = {
      ...resolvedModule.content,
      lessons: [] as any[]
    }

    // Process lessons
    for (const lesson of module.lessons || []) {
      const resolvedLesson = resolveContent(lesson, groupDifficulty)

      if (resolvedLesson.resolution.type === 'hidden') {
        preview.hiddenItems.push({
          type: 'lesson',
          id: lesson.id,
          title: lesson.title,
          reason: resolvedLesson.hiddenReason || 'Hidden'
        })
        continue
      }

      if (resolvedLesson.resolution.type === 'variant' && resolvedLesson.originalValues) {
        preview.stats.adaptedContent++
        for (const [field, original] of Object.entries(resolvedLesson.originalValues)) {
          preview.adaptedItems.push({
            type: 'lesson',
            id: lesson.id,
            title: lesson.title,
            field,
            original: String(original),
            adapted: String((resolvedLesson.content as any)[field])
          })
        }
      }

      modulePreview.lessons.push(resolvedLesson.content)
    }

    preview.modules.push(modulePreview)
  }

  return preview
}

/**
 * Check if there's a difficulty mismatch warning
 */
export function getDifficultyMismatchWarning(
  courseDifficulty: 'all' | DifficultyLevel | undefined,
  groupDifficulty: DifficultyLevel
): string | null {
  if (!courseDifficulty || courseDifficulty === 'all') {
    return null // No mismatch possible
  }

  if (courseDifficulty !== groupDifficulty) {
    const levels = ['beginner', 'intermediate', 'advanced']
    const courseIdx = levels.indexOf(courseDifficulty)
    const groupIdx = levels.indexOf(groupDifficulty)

    if (courseIdx > groupIdx) {
      return `Course is ${courseDifficulty} but group is ${groupDifficulty}. Students may find content challenging.`
    } else {
      return `Course is ${courseDifficulty} but group is ${groupDifficulty}. Content may be too basic.`
    }
  }

  return null
}
