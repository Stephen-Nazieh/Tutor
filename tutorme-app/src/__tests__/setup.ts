import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    constructor() {}
    models = {
      generateContent: async () => ({ text: '' }),
    }
  },
}), { virtual: true })

process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/tutorme'
