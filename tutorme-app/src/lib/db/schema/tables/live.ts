/**
 * Drizzle table definitions (domain slice).
 * Aggregated via ./index.ts — keep enums in ../enums.ts.
 */
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  doublePrecision,
  uniqueIndex,
  index,
  uuid,
} from 'drizzle-orm/pg-core'
import * as enums from '../enums'

export const liveSession = pgTable(
  'LiveSession',
  {
    sessionId: text('sessionId').primaryKey().notNull(),
    tutorId: text('tutorId').notNull(),
    courseId: text('courseId'),
    title: text('title').notNull(),
    category: text('category').notNull(),
    description: text('description'),
    gradeLevel: text('gradeLevel'),
    scheduledAt: timestamp('scheduledAt', { withTimezone: true }),
    startedAt: timestamp('startedAt', { withTimezone: true }),
    endedAt: timestamp('endedAt', { withTimezone: true }),
    maxStudents: integer('maxStudents').notNull(),
    status: text('status').notNull(),
    roomId: text('roomId'),
    roomUrl: text('roomUrl'),
    recordingUrl: text('recordingUrl'),
    recordingAvailableAt: timestamp('recordingAvailableAt', { withTimezone: true }),
  },
  table => ({
    LiveSession_tutorId_idx: index('LiveSession_tutorId_idx').on(table.tutorId),
    LiveSession_courseId_idx: index('LiveSession_courseId_idx').on(table.courseId),
    LiveSession_status_idx: index('LiveSession_status_idx').on(table.status),
    LiveSession_scheduledAt_idx: index('LiveSession_scheduledAt_idx').on(table.scheduledAt),
  })
)

export const sessionReplayArtifact = pgTable(
  'SessionReplayArtifact',
  {
    artifactId: text('artifactId').primaryKey().notNull(),
    sessionId: text('sessionId').notNull().unique(),
    tutorId: text('tutorId').notNull(),
    recordingUrl: text('recordingUrl'),
    transcript: text('transcript'),
    summary: text('summary'),
    summaryJson: jsonb('summaryJson'),
    status: text('status').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }),
    endedAt: timestamp('endedAt', { withTimezone: true }),
    generatedAt: timestamp('generatedAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    SessionReplayArtifact_tutorId_idx: index('SessionReplayArtifact_tutorId_idx').on(table.tutorId),
    SessionReplayArtifact_status_idx: index('SessionReplayArtifact_status_idx').on(table.status),
    SessionReplayArtifact_generatedAt_idx: index('SessionReplayArtifact_generatedAt_idx').on(
      table.generatedAt
    ),
  })
)

export const sessionParticipant = pgTable(
  'SessionParticipant',
  {
    participantId: text('participantId').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    studentId: text('studentId').notNull(),
    joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
    leftAt: timestamp('leftAt', { withTimezone: true }),
  },
  table => ({
    SessionParticipant_studentId_idx: index('SessionParticipant_studentId_idx').on(table.studentId),
    SessionParticipant_sessionId_studentId_key: uniqueIndex(
      'SessionParticipant_sessionId_studentId_key'
    ).on(table.sessionId, table.studentId),
  })
)

export const poll = pgTable(
  'Poll',
  {
    pollId: text('pollId').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    tutorId: text('tutorId').notNull(),
    question: text('question').notNull(),
    type: enums.pollTypeEnum('type').notNull(),
    isAnonymous: boolean('isAnonymous').notNull(),
    allowMultiple: boolean('allowMultiple').notNull(),
    timeLimit: integer('timeLimit'),
    showResults: boolean('showResults').notNull(),
    correctOptionId: text('correctOptionId'),
    status: enums.pollStatusEnum('status').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }),
    endedAt: timestamp('endedAt', { withTimezone: true }),
    totalResponses: integer('totalResponses').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    Poll_sessionId_idx: index('Poll_sessionId_idx').on(table.sessionId),
    Poll_tutorId_idx: index('Poll_tutorId_idx').on(table.tutorId),
    Poll_status_idx: index('Poll_status_idx').on(table.status),
    Poll_createdAt_idx: index('Poll_createdAt_idx').on(table.createdAt),
  })
)

export const pollOption = pgTable(
  'PollOption',
  {
    optionId: text('optionId').primaryKey().notNull(),
    pollId: text('pollId').notNull(),
    label: text('label').notNull(),
    text: text('text').notNull(),
    color: text('color'),
    responseCount: integer('responseCount').notNull(),
    percentage: doublePrecision('percentage').notNull(),
  },
  table => ({
    PollOption_pollId_idx: index('PollOption_pollId_idx').on(table.pollId),
  })
)

export const pollResponse = pgTable(
  'PollResponse',
  {
    responseId: text('responseId').primaryKey().notNull(),
    pollId: text('pollId').notNull(),
    respondentHash: text('respondentHash'),
    optionIds: text('optionIds').array().notNull(),
    rating: integer('rating'),
    textAnswer: text('textAnswer'),
    studentId: text('studentId'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    PollResponse_pollId_idx: index('PollResponse_pollId_idx').on(table.pollId),
    PollResponse_studentId_idx: index('PollResponse_studentId_idx').on(table.studentId),
    PollResponse_pollId_respondentHash_key: uniqueIndex(
      'PollResponse_pollId_respondentHash_key'
    ).on(table.pollId, table.respondentHash),
  })
)

export const message = pgTable(
  'Message',
  {
    messageId: text('messageId').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    userId: text('userId').notNull(),
    content: text('content').notNull(),
    type: text('type').notNull(),
    source: enums.messageSourceEnum('source').notNull(),
    timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    Message_sessionId_idx: index('Message_sessionId_idx').on(table.sessionId),
    Message_userId_idx: index('Message_userId_idx').on(table.userId),
  })
)

export const conversation = pgTable(
  'Conversation',
  {
    conversationId: text('conversationId').primaryKey().notNull(),
    participant1Id: text('participant1Id').notNull(),
    participant2Id: text('participant2Id').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    Conversation_participant1Id_idx: index('Conversation_participant1Id_idx').on(
      table.participant1Id
    ),
    Conversation_participant2Id_idx: index('Conversation_participant2Id_idx').on(
      table.participant2Id
    ),
    Conversation_updatedAt_idx: index('Conversation_updatedAt_idx').on(table.updatedAt),
    Conversation_participant1Id_participant2Id_key: uniqueIndex(
      'Conversation_participant1Id_participant2Id_key'
    ).on(table.participant1Id, table.participant2Id),
  })
)

export const directMessage = pgTable(
  'DirectMessage',
  {
    directMessageId: text('directMessageId').primaryKey().notNull(),
    conversationId: text('conversationId').notNull(),
    senderId: text('senderId').notNull(),
    content: text('content').notNull(),
    type: text('type').notNull(),
    attachmentUrl: text('attachmentUrl'),
    read: boolean('read').notNull(),
    readAt: timestamp('readAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    DirectMessage_conversationId_idx: index('DirectMessage_conversationId_idx').on(
      table.conversationId
    ),
    DirectMessage_senderId_idx: index('DirectMessage_senderId_idx').on(table.senderId),
    DirectMessage_createdAt_idx: index('DirectMessage_createdAt_idx').on(table.createdAt),
  })
)

export const mention = pgTable(
  'Mention',
  {
    mentionId: uuid('mentionId').primaryKey().notNull().defaultRandom(),
    messageId: text('messageId').notNull(),
    mentionerId: text('mentionerId').notNull(),
    mentioneeId: text('mentioneeId').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    Mention_messageId_idx: index('Mention_messageId_idx').on(table.messageId),
    Mention_mentionerId_idx: index('Mention_mentionerId_idx').on(table.mentionerId),
    Mention_mentioneeId_idx: index('Mention_mentioneeId_idx').on(table.mentioneeId),
  })
)

export const tutorFollow = pgTable(
  'TutorFollow',
  {
    followId: uuid('followId').primaryKey().notNull().defaultRandom(),
    followerId: text('followerId').notNull(),
    tutorId: text('tutorId').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    TutorFollow_followerId_idx: index('TutorFollow_followerId_idx').on(table.followerId),
    TutorFollow_tutorId_idx: index('TutorFollow_tutorId_idx').on(table.tutorId),
    TutorFollow_follower_tutor_key: uniqueIndex('TutorFollow_follower_tutor_key').on(
      table.followerId,
      table.tutorId
    ),
  })
)

export const notification = pgTable(
  'Notification',
  {
    notificationId: text('notificationId').primaryKey().notNull(),
    userId: text('userId').notNull(),
    type: text('type').notNull(),
    title: text('title').notNull(),
    message: text('message').notNull(),
    data: jsonb('data'),
    read: boolean('read').notNull(),
    readAt: timestamp('readAt', { withTimezone: true }),
    actionUrl: text('actionUrl'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    Notification_userId_idx: index('Notification_userId_idx').on(table.userId),
    Notification_read_idx: index('Notification_read_idx').on(table.read),
    Notification_createdAt_idx: index('Notification_createdAt_idx').on(table.createdAt),
    Notification_type_idx: index('Notification_type_idx').on(table.type),
    idx_notification_user_read_created: index('idx_notification_user_read_created').on(
      table.userId,
      table.read,
      table.createdAt
    ),
    idx_notification_user_type_created: index('idx_notification_user_type_created').on(
      table.userId,
      table.type,
      table.createdAt
    ),
  })
)

export const notificationPreference = pgTable('NotificationPreference', {
  preferenceId: text('preferenceId').primaryKey().notNull(),
  userId: text('userId').notNull().unique(),
  emailEnabled: boolean('emailEnabled').notNull(),
  pushEnabled: boolean('pushEnabled').notNull(),
  inAppEnabled: boolean('inAppEnabled').notNull(),
  channelOverrides: jsonb('channelOverrides').notNull(),
  quietHoursStart: text('quietHoursStart'),
  quietHoursEnd: text('quietHoursEnd'),
  timezone: text('timezone').notNull(),
  emailDigest: text('emailDigest').notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
})
