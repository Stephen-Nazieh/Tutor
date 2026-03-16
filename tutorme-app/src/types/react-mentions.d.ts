declare module 'react-mentions' {
  import * as React from 'react'

  export interface SuggestionDataItem {
    id: string
    display: string
  }

  export interface MentionsInputProps {
    value: string
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string,
      newPlainTextValue?: string,
      mentions?: any[]
    ) => void
    placeholder?: string
    disabled?: boolean
    className?: string
    style?: React.CSSProperties | Record<string, any>
    onKeyDown?: React.KeyboardEventHandler
  }

  export const MentionsInput: React.ComponentType<MentionsInputProps>

  export interface MentionProps {
    trigger: string | RegExp
    data: SuggestionDataItem[] | ((search: string, callback: (data: SuggestionDataItem[]) => void) => void)
    markup?: string
    displayTransform?: (id: string, display: string) => string
    renderSuggestion?: (
      suggestion: SuggestionDataItem,
      search: string,
      highlightedDisplay: React.ReactNode,
      index: number,
      focused: boolean
    ) => React.ReactNode
  }

  export const Mention: React.ComponentType<MentionProps>
}
