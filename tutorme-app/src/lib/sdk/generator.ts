import SwaggerClient from 'swagger-client'
import { swaggerSpec } from '../openapi'

export class TutorMeSDK {
  private client: any
  
  constructor(options: SDKOptions) {
    this.client = new SwaggerClient({
      spec: swaggerSpec,
      requestInterceptor: (request) => {
        // Add auth headers
        if (options.apiKey) {
          request.headers['Authorization'] = `Bearer ${options.apiKey}`
        }
        return request
      }
    })
  }
  
  // Typed API methods
  async createChatMessage(params: ChatMessageParams): Promise<ChatResponse> {
    return this.client.apis['AI Tutor'].createChatMessage(params)
  }
  
  async createPayment(params: PaymentParams): Promise<PaymentResponse> {
    return this.client.apis.Payments.createPayment({ payment: params })
  }
}