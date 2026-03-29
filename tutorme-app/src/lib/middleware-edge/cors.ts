/** Allowed origins for CORS — env primary URL plus local dev hosts. */
export function getAllowedOrigins(): string[] {
  const productionOrigin = process.env.NEXT_PUBLIC_APP_URL
  const devOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3003']

  if (productionOrigin) {
    return [productionOrigin, ...devOrigins]
  }

  return devOrigins
}
