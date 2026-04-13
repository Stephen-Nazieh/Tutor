'use client'

import React from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocs() {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Solocorn API Documentation</h1>
          <p className="text-muted-foreground">Complete reference for all Solocorn API endpoints</p>
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
