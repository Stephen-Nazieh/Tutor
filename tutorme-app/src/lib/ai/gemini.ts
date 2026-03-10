import { GoogleGenAI } from '@google/genai';

interface AIOptions {
    temperature?: number;
    maxTokens?: number;
    model?: string;
    systemPrompt?: string;
}

export async function isGeminiAvailable() {
    return !!process.env.GEMINI_API_KEY;
}

export async function generateWithGemini(prompt: string, options?: AIOptions) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
        model: options?.model || 'gemini-2.5-flash',
        contents: prompt,
        config: {
            temperature: options?.temperature,
            maxOutputTokens: options?.maxTokens,
            systemInstruction: options?.systemPrompt,
        }
    });

    return response.text;
}

export async function chatWithGemini(messages: Array<{ role: string; content: string }>, options?: AIOptions) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('GEMINI_API_KEY is not set');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Convert generic messages to Gemini format
    let systemPrompt = options?.systemPrompt;

    if (!systemPrompt && messages.length > 0 && messages[0].role === 'system') {
        systemPrompt = messages[0].content;
    }

    const filteredMessages = messages.filter(m => m.role !== 'system');

    const contents = filteredMessages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
        model: options?.model || 'gemini-2.5-flash',
        contents: contents,
        config: {
            temperature: options?.temperature,
            maxOutputTokens: options?.maxTokens,
            systemInstruction: systemPrompt,
        }
    });

    return response.text;
}
