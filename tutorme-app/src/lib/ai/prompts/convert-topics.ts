export const convertTopicsToEditablePrompt = (params: {
  topicsListText: string
  subject?: string
  language?: string
}): string => {
  return `The user uploaded a list of topics. Expand it into editable "Edit Topics" text: each topic as a short section with a 1-2 sentence description, so the tutor can edit later. Keep the order. Output plain text only.

Topics list:
${params.topicsListText.slice(0, 8000)}`
}
