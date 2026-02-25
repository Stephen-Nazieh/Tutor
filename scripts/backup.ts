// scripts/backup.ts
import { execSync } from 'child_process'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { config } from './backup-config.json'

export interface BackupConfig {
  schedule: string // Cron format
  retentionDays: number
  s3Bucket: string
  s3Region: string
  encryption: boolean
}

export async function performBackup(): Promise<void> {
  const timestamp = new Date().toISOString()
  const filename = `tutorme-backup-${timestamp}.sql.gz`
  
  // Create backup using pg_dump
  const backupCommand = `pg_dump -h ${config.dbHost} -U ${config.dbUser} -d ${config.dbName} --no-password | gzip > /tmp/${filename}`
  execSync(backupCommand)
  
  // Verify backup integrity
  const verifyCommand = `gzip -t /tmp/${filename}`
  execSync(verifyCommand)
  
  // Upload to S3 with server-side encryption
  const s3Client = new S3Client({ region: config.s3Region })
  const uploadCommand = new PutObjectCommand({
    Bucket: config.s3Bucket,
    Key: `backups/${filename}`,
    Body: fs.createReadStream(`/tmp/${filename}`),
    ServerSideEncryption: config.encryption ? 'AES256' : undefined
  })
  
  await s3Client.send(uploadCommand)
  
  // Cleanup old backups
  await cleanupOldBackups(s3Client, config)
  
  // Remove local file
  fs.unlinkSync(`/tmp/${filename}`)
}