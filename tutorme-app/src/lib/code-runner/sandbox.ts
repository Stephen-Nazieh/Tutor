/**
 * Docker-based code execution sandbox.
 * Runs user code in isolated containers with timeout and resource limits.
 * Supports Python and JavaScript.
 */

import { spawn } from 'child_process'

const MAX_CODE_LENGTH = 16 * 1024 // 16KB
const EXEC_TIMEOUT_MS = 15_000 // 15s
const DOCKER_MEMORY = '128m'
const DOCKER_CPUS = '0.5'

export type SandboxLanguage = 'python' | 'javascript'

export interface RunResult {
  stdout: string
  stderr: string
  exitCode: number | null
  timedOut: boolean
  error?: string
}

const IMAGES: Record<SandboxLanguage, string> = {
  python: 'python:3.11-slim',
  javascript: 'node:20-slim',
}

/**
 * Run code in a Docker container. Network disabled, read-only, memory/CPU limited.
 */
export async function runInSandbox(
  language: SandboxLanguage,
  code: string
): Promise<RunResult> {
  if (code.length > MAX_CODE_LENGTH) {
    return {
      stdout: '',
      stderr: '',
      exitCode: null,
      timedOut: false,
      error: `Code exceeds maximum length (${MAX_CODE_LENGTH} characters).`,
    }
  }

  const image = IMAGES[language]
  const args = [
    'run',
    '--rm',
    '-i',
    '--network=none',
    '--memory=' + DOCKER_MEMORY,
    '--cpus=' + DOCKER_CPUS,
    '--read-only',
    '--security-opt=no-new-privileges',
    image,
    ...getRunnerArgs(language),
  ]

  return new Promise((resolve) => {
    let settled = false
    const once = (result: RunResult) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolve(result)
    }

    const proc = spawn('docker', args, {
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''
    const timer = setTimeout(() => {
      proc.kill('SIGKILL')
      once({
        stdout,
        stderr,
        exitCode: null,
        timedOut: true,
        error: 'Execution timed out.',
      })
    }, EXEC_TIMEOUT_MS)

    proc.stdout?.on('data', (chunk: Buffer) => {
      stdout += chunk.toString()
    })
    proc.stderr?.on('data', (chunk: Buffer) => {
      stderr += chunk.toString()
    })

    proc.on('error', (err) => {
      once({
        stdout: '',
        stderr: '',
        exitCode: null,
        timedOut: false,
        error: err.message || 'Failed to run Docker.',
      })
    })

    proc.on('close', (code) => {
      once({
        stdout: truncate(stdout, 32 * 1024),
        stderr: truncate(stderr, 32 * 1024),
        exitCode: code,
        timedOut: false,
      })
    })

    proc.stdin?.write(code, (err) => {
      if (err) {
        once({
          stdout: '',
          stderr: '',
          exitCode: null,
          timedOut: false,
          error: err.message,
        })
        return
      }
      proc.stdin?.end()
    })
  })
}

function getRunnerArgs(language: SandboxLanguage): string[] {
  switch (language) {
    case 'python':
      return ['python', '-c', 'import sys; exec(sys.stdin.read())']
    case 'javascript':
      return [
        'node',
        '-e',
        "const fs=require('fs');const s=fs.readFileSync('/dev/stdin','utf8');eval(s);",
      ]
    default:
      return []
  }
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s
  return s.slice(0, max) + '\n...[output truncated]'
}
