// scripts/backup.ts
import { execSync } from 'child_process'
import fs from 'fs'
import { Storage } from '@google-cloud/storage'
import { config } from './backup-config.json'

export interface BackupConfig {
  schedule: string // Cron format
  retentionDays: number
  gcsBucket: string
  gcpProjectId?: string
  gcpSaKey?: string
  kmsKeyName?: string
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
  
  // Upload to GCS (server-side encryption is default in GCS; optionally use KMS)
  const credentialsJson = process.env.GCP_SA_KEY || config.gcpSaKey
  if (!credentialsJson) {
    throw new Error('GCP_SA_KEY is required for GCS backups')
  }
  const credentials = JSON.parse(credentialsJson)
  const projectId = process.env.GCP_PROJECT_ID || config.gcpProjectId
  const bucketName = process.env.GCS_BUCKET || config.gcsBucket
  const storage = new Storage({ projectId, credentials })

  await storage.bucket(bucketName).upload(`/tmp/${filename}`, {
    destination: `backups/${filename}`,
    ...(config.encryption && config.kmsKeyName ? { kmsKeyName: config.kmsKeyName } : {}),
  })
  
  // Cleanup old backups
  await cleanupOldBackups(storage, bucketName, config.retentionDays)
  
  // Remove local file
  fs.unlinkSync(`/tmp/${filename}`)
}

async function cleanupOldBackups(
  storage: Storage,
  bucketName: string,
  retentionDays: number
): Promise<void> {
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000
  const [files] = await storage.bucket(bucketName).getFiles({ prefix: 'backups/' })

  const deletions = files.map(async file => {
    const created = file.metadata.timeCreated ? Date.parse(file.metadata.timeCreated) : null
    if (created && created < cutoff) {
      await file.delete({ ignoreNotFound: true })
    }
  })

  await Promise.all(deletions)
}
