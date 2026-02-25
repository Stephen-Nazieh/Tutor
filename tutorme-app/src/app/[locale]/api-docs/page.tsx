'use client'

import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TutorMe API Documentation</h1>
          <p className="text-muted-foreground">
            Complete reference for all TutorMe API endpoints
          </p>
        </div>
        <SwaggerUI
          url="/api/openapi"
          docExpansion="list"
          deepLinking={true}
          defaultModelsExpandDepth={3}
        />
      </div>
    </div>
  )
}