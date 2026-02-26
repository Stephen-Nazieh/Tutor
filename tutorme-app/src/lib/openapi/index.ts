// @ts-nocheck
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TutorMe API',
      version: '1.0.0',
      description: 'AI-powered hybrid tutoring platform API',
      contact: {
        name: 'TutorMe Support',
        email: 'support@tutorme.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3003',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            code: { type: 'string' },
            details: { type: 'object' }
          }
        },
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['STUDENT', 'TUTOR', 'ADMIN'] }
          }
        }
      }
    }
  },
  apis: [
    '**/*.route.ts',
    '**/api.ts',
    '**/types.ts'
  ]
}

export const swaggerSpec = swaggerJSDoc(options)