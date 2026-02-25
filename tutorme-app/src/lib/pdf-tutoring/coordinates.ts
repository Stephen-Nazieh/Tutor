export interface PointPx {
  x: number
  y: number
}

export interface PointPercent {
  x: number
  y: number
}

function clampPercent(value: number): number {
  return Math.max(0, Math.min(100, value))
}

export function pxToPercent(value: number, total: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return 0
  return clampPercent((value / total) * 100)
}

export function percentToPx(value: number, total: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return 0
  return (value / 100) * total
}

export function pointToPercent(point: PointPx, width: number, height: number): PointPercent {
  return {
    x: pxToPercent(point.x, width),
    y: pxToPercent(point.y, height),
  }
}

export function pointToPx(point: PointPercent, width: number, height: number): PointPx {
  return {
    x: percentToPx(point.x, width),
    y: percentToPx(point.y, height),
  }
}

export function rectToPercent<T extends { left?: number; top?: number; width?: number; height?: number }>(
  rect: T,
  width: number,
  height: number
): T {
  return {
    ...rect,
    ...(typeof rect.left === 'number' ? { left: pxToPercent(rect.left, width) } : {}),
    ...(typeof rect.top === 'number' ? { top: pxToPercent(rect.top, height) } : {}),
    ...(typeof rect.width === 'number' ? { width: pxToPercent(rect.width, width) } : {}),
    ...(typeof rect.height === 'number' ? { height: pxToPercent(rect.height, height) } : {}),
  }
}

export function rectToPx<T extends { left?: number; top?: number; width?: number; height?: number }>(
  rect: T,
  width: number,
  height: number
): T {
  return {
    ...rect,
    ...(typeof rect.left === 'number' ? { left: percentToPx(rect.left, width) } : {}),
    ...(typeof rect.top === 'number' ? { top: percentToPx(rect.top, height) } : {}),
    ...(typeof rect.width === 'number' ? { width: percentToPx(rect.width, width) } : {}),
    ...(typeof rect.height === 'number' ? { height: percentToPx(rect.height, height) } : {}),
  }
}
