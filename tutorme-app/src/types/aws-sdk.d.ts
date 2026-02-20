/**
 * Type declarations for optional @aws-sdk packages (S3 upload).
 * Install @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner when using S3 upload.
 */
declare module '@aws-sdk/client-s3' {
  export class S3Client {
    constructor(config: unknown)
  }
  export class PutObjectCommand {
    constructor(params: { Bucket: string; Key: string; ContentType?: string })
  }
}
declare module '@aws-sdk/s3-request-presigner' {
  export function getSignedUrl(
    client: unknown,
    command: unknown,
    options: { expiresIn: number }
  ): Promise<string>
}
