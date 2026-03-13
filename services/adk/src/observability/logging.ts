export function logInfo(message: string, context?: Record<string, unknown>) {
  if (context) {
    console.log(message, context)
  } else {
    console.log(message)
  }
}

export function logError(message: string, error?: unknown) {
  if (error) {
    console.error(message, error)
  } else {
    console.error(message)
  }
}
