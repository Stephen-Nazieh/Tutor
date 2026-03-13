import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    constructor() {}
    models = {
      generateContent: async () => ({ text: '' }),
    }
  },
}))

process.env.DATABASE_URL ||= 'postgresql://example.com:5432/tutorme'
