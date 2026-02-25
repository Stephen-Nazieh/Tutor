/**
 * Polls Module
 * Shared polling components and utilities
 */

// Types
export * from './types';

// Components
export { QuickPollPanel } from './QuickPollPanel';
export { PollCreator } from './PollCreator';
export { ActivePollView } from './ActivePollView';
export { PollResults } from './PollResults';
export { PollHistory } from './PollHistory';
export { PollTemplates } from './PollTemplates';
export { StudentPollView } from './StudentPollView';
export { StudentPollWidget } from './StudentPollWidget';

// Hooks
export { usePollSocket } from './hooks/usePollSocket';

// Utils
export { 
  POLL_TEMPLATES, 
  getTemplateById, 
  getDefaultOptions,
  getOptionColor 
} from './utils/pollTemplates';
export { 
  calculatePollStatistics,
  updatePollWithStatistics,
  generateOptionLabel,
  getRemainingTime,
  formatRemainingTime,
  isPollExpired,
  getWordCloudData,
  hashString
} from './utils/pollCalculations';
