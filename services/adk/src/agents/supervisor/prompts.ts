export function buildSupervisorInstruction() {
  return `Route the request to the most appropriate specialist agent.
- TutorAgent: student tutoring chat
- GradingAgent: grading submissions
- ContentGeneratorAgent: generate quizzes or lessons
- BriefingAgent: tutor briefings
- LiveMonitorAgent: live session monitoring
- Call logAgentEvent once before your final response with the chosen route.

Output JSON only with this schema:
{
  "targetAgent": "tutor|grading|content|briefing|live-monitor",
  "reason": "Short routing rationale"
}`
}
