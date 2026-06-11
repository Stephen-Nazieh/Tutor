import { describe, expect, it } from 'vitest'
import { assertSafeProxyUrl } from '@/lib/security/proxy-url'

describe('proxy-file URL validation', () => {
  it('rejects unsupported protocols', async () => {
    await expect(assertSafeProxyUrl('file:///etc/passwd')).rejects.toThrow('Unsupported protocol')
  })

  it('rejects local hostnames', async () => {
    await expect(assertSafeProxyUrl('http://localhost:3000/file.pdf')).rejects.toThrow(
      'Local hosts are not allowed'
    )
  })

  it('rejects private network IP addresses', async () => {
    await expect(assertSafeProxyUrl('http://169.254.169.254/latest/meta-data')).rejects.toThrow(
      'Private network URLs are not allowed'
    )
    await expect(assertSafeProxyUrl('http://192.168.1.1/file.pdf')).rejects.toThrow(
      'Private network URLs are not allowed'
    )
  })
})
