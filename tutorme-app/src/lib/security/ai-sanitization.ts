// @ts-nocheck
/**
 * AI Input/Output Sanitization
 * Advanced AI security measures for input sanitization and response validation
 * Extends basic sanitization with AI-specific security measures
 */

import { sanitizeHtml } from '@/lib/security/sanitize'
import crypto from 'crypto'
import { securityLogger } from '@/lib/security/logging'

/**
 * Student ID anonymization for AI contexts
 * Creates consistent anonymous identifiers for AI interactions
 */
export class AISecurityManager {
  /**
   * Sanitize AI input with advanced AI security measures
   * Prevents prompt injection, escapes AI jailbreaks, removes PII
   */
  static sanitizeAiInput(input: string): string {
    // Basic sanity check
    if (!input || typeof input !== 'string') {
      return ''
    }

    try {
      // Normalize input
      let sanitized = input.trim()

      // Critical: Remove system prompt injection attempts
      const systemPrompts = [
        /ignore.*all.*previous.*instructions/gi,
        /forget.*everything.*above/gi,
        /disregard.*above/gi,
        /you are now.*admin/gi,
        /your role is now.*system/gi,
        /from now on.*you are.*developer/gi,
        /new instructions.*ignore.*previous/gi,
        /system prompt.*override/gi,
        /override.*all.*security.*rules/gi
      ]

      for (const pattern of systemPrompts) {
        sanitized = sanitized.replace(pattern, '[REMOVED]')
      }

      // Remove AI assistant impersonation attempts
      const jailbreakPatterns = [
        /assistant.*you.*are.*now/gi,
        /you.*are.*now.*assistant.*system/gi,
        /mode.*system.*administrator/gi,
        /bypass.*all.*restrictions/gi,
        /unlock.*all.*capabilities/gi
      ]

      for (const pattern of jailbreakPatterns) {
        sanitized = sanitized.replace(pattern, '[REMOVED]')
      }

      // Remove command injection attempts
      const commandInjection = [
        /exec\s*\(/gi,
        /system\s*\(/gi,
        /shell\s*\(/gi,
        /exec\s+/gi,
        /system\s+/gi,
        /shell\s+/gi,
        /bash\.*execute/gi,
        /powershell\.*run/gi
      ]

      for (const pattern of commandInjection) {
        sanitized = sanitized.replace(pattern, '[REMOVED]')
      }

      // Remove dangerous code patterns
      const dangerousCode = [
        /<script.*?>/gi,
        /javascript:\.*\(/gi,
        /vbscript:\.*\(/gi,
        /onload\s*=/gi,
        /onerror\s*=/gi,
        /onclick\s*=/gi,
        /eval\s*\(/gi
      ]

      for (const pattern of dangerousCode) {
        sanitized = sanitized.replace(pattern, '[REMOVED]')
      }

      // Remove system control attempts
      const systemControl = [
        /sudo/gi,
        /admin/gi,
        /system.*override/gi,
        /override.*security.*settings/gi,
        /disable.*all.*protections/gi
      ]

      for (const pattern of systemControl) {
        sanitized = sanitized.replace(pattern, '[REMOVED]')
      }

      // Apply enhanced HTML sanitization
      sanitized = sanitizeHtml(sanitized)

      // Apply length limits to prevent overflow attacks
      const MAX_INPUT_LENGTH = 3000
      if (sanitized.length > MAX_INPUT_LENGTH) {
        sanitized = sanitized.substring(0, MAX_INPUT_LENGTH) + ' [TRUNCATED FOR SECURITY]'
      }

      // Log security sanitization
      securityLogger.logEvent({
        eventType: 'AI_INPUT_SANITIZED',
        description: 'AI input underwent security sanitization',
        metadata: {
          originalLength: input.length,
          sanitizedLength: sanitized.length,
          patternsRemoved: systemPrompts.length + jailbreakPatterns.length + commandInjection.length
        }
      })

      return sanitized.trim()

    } catch (error) {
      securityLogger.logEvent({
        eventType: 'AI_SECURITY_ERROR',
        description: 'AI input sanitization error occurred',
        severity: 'MEDIUM',
        metadata: {
          error: error.message
        }
      })
      
      // Return safe, empty response on sanitization error
      return ''
    }
  }

  /**
   * Create student identifier hash for anonymity in AI context
   * Consistent hashing for same student across sessions
   */
  static createStudentHash(studentId: string): string {
    if (!studentId || typeof studentId !== 'string') {
      return 'anonymous_student'
    }

    try {
      // Use student's unique ID + system secret for consistent hashing
      const secret = process.env.NEXTAUTH_SECRET || 'default_secret'
      
      // Create deterministic hash for consistent anonymization
      return crypto
        .createHash('sha256')
        .update(studentId)
        .update(secret)
        .digest('hex')
        .substring(0, 16) // 16-character anonymized ID

    } catch (error) {
      securityLogger.logEvent({
        eventType: 'STUDENT_HASH_ERROR',
        description: 'Student hash creation failed',
        severity: 'LOW',
        metadata: {
          error: error.message
        }
      })
      
      // Fallback to generic anonymous identifier
      return 'anonymous_student'
    }
  }

  /**
   * Validate AI response for safety and appropriateness
   * Checks for inappropriate content, system leakage, PII exposure
   */
  static async validateAiResponse(response: string): Promise<{
    isValid: boolean
    issues: string[]
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  }> {
    const issues: string[] = []
    let severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW'

    if (!response || typeof response !== 'string') {
      return {
        isValid: false,
        issues: ['AI response is invalid'],
        severity: 'HIGH'
      }
    }

    // Check for inappropriate content
    const inappropriatePatterns = [
      /suicide(\.*|\s+)+support/gi,
      /self.?harm(\.*|\s+)+advice/gi,
      /violence(\.*|\s+)+instructions/gi,
      /how.?to.?harm.+yourself/gi,
      /end.?it.?all/gi
    ]

    for (const pattern of inappropriatePatterns) {
      if (pattern.test(response)) {
        issues.push('AI response contains inappropriate or harmful content')
        severity = 'CRITICAL'
        break
      }
    }

    // Check for PII leakage
    const piiPatterns = [
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i,
      /\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g,
      /\b\d{3}-\d{2}-\d{4}\b/g
    ]

    for (const pattern of piiPatterns) {
      if (pattern.test(response)) {
        issues.push('AI response contains potential personal information')
        severity = severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH'
      }
    }

    // Check for system leakage
    if (response.includes('System:') || response.includes('Instruction:')) {
      issues.push('AI response may contain system instruction leakage')
      severity = severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH'
    }

    // Check for malicious content
    const maliciousContent = [
      /eval\s*\(/gi,
      /system\s*\(/gi,
      /download.*malicious/gi,
      /install.*virus/gi
    ]

    for (const pattern of maliciousContent) {
      if (pattern.test(response)) {
        issues.push('AI response contains potentially malicious content')
        severity = 'CRITICAL'
      }
    }

    // Check response length limits
    const MAX_RESPONSE_LENGTH = 5000
    if (response.length > MAX_RESPONSE_LENGTH) {
      issues.push('AI response exceeds safe length limits')
      severity = severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH'
    }

    // Log validation results
    if (issues.length > 0) {
      securityLogger.logEvent({
        eventType: 'AI_RESPONSE_VALIDATION',
        description: 'AI response failed security validation',
        severity: severity,
        metadata: {
          issues: issues,
          responseLength: response.length
        }
      })
    }

    return {
      isValid: issues.length === 0,
      issues,
      severity
    }
  }

  /**
   * Create safe tutoring prompt for AI with built-in protections
   */
  static createSafeTutoringPrompt(
    studentId: string,
    subject: string,
    gradeLevel: string,
    question: string
  ): { systemPrompt: string; userPrompt: string } {
    // Anonymize student identifier
    const studentHash = this.createStudentHash(studentId)
    
    // Sanitize the question
    const sanitizedQuestion = this.sanitizeAiInput(question)
    
    if (sanitizedQuestion.length === 0) {
      return {
        systemPrompt: this.createProtectedSystemPrompt(subject, gradeLevel),
        userPrompt: 'Student provided invalid input - please redirect to proper input format'
      }
    }

    return {
      systemPrompt: this.createProtectedSystemPrompt(subject, gradeLevel, studentHash),
      userPrompt: `Student ${studentHash} asks: "${sanitizedQuestion}"`
    }
  }

  /**
   * Create protected system prompt with safety guidelines
   */
  private static createProtectedSystemPrompt(
    subject: string,
    gradeLevel: string,
    studentHash?: string
  ): string {
    return `
You are an AI tutor specializing in ${subject} for ${gradeLevel} level students.

SAFETY RULES STRICTLY ENFORCED:
1. **NEVER** provide direct answers - use Socratic method (guiding questions)
2. **NEVER** give private information or personal data
3. **NEVER** provide medical, legal, or financial advice
4. **NEVER** generate harmful or inappropriate content
5. **NEVER** give instructions for self-harm or dangerous activities
6. **ALWAYS** maintain educational focus and age-appropriate language
7. **ALWAYS** escalate concerning content to human supervision
8. **ALWAYS** encourage students to discover solutions through guided learning

RESPONSE GUIDELINES:
- Use only educational, age-appropriate language
- Ask questions to guide discovery
- Provide examples when helpful
- Adapt to student${studentHash ? ` ${studentHash}` : ''}'s responses
- Never complete assignments for students
- Always check for understanding

CURRENT CONTEXT:
- Subject: ${subject}
- Level: ${gradeLevel}
- Anonymized Student ID: ${studentHash || 'anonymous'}
- Current Date: ${new Date().toISOString()}
`.trim()
  }
}

export default AISecurityManager