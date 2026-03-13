export class GoogleGenAI {
  constructor(_opts: { apiKey: string }) {}
  models = {
    generateContent: async () => ({ text: '' }),
  }
}
