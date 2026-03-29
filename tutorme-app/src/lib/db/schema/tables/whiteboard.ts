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

export const whiteboard = pgTable(
  'Whiteboard',
  {
    id: text('id').primaryKey().notNull(),
    tutorId: text('tutorId').notNull(),
    ownerId: text('ownerId').notNull(),
    sessionId: text('sessionId'),
    roomId: text('roomId'),
    curriculumId: text('curriculumId'),
    lessonId: text('lessonId'),
    title: text('title').notNull(),
    description: text('description'),
    isTemplate: boolean('isTemplate').notNull(),
    isPublic: boolean('isPublic').notNull(),
    width: integer('width').notNull(),
    height: integer('height').notNull(),
    backgroundColor: text('backgroundColor').notNull(),
    backgroundStyle: text('backgroundStyle').notNull(),
    backgroundImage: text('backgroundImage'),
    collaborators: jsonb('collaborators'),
    visibility: text('visibility').notNull(),
    isBroadcasting: boolean('isBroadcasting').notNull(),
    ownerType: text('ownerType').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    deletedAt: timestamp('deletedAt', { withTimezone: true }),
  },
  table => ({
    Whiteboard_tutorId_idx: index('Whiteboard_tutorId_idx').on(table.tutorId),
    Whiteboard_ownerId_idx: index('Whiteboard_ownerId_idx').on(table.ownerId),
    Whiteboard_sessionId_idx: index('Whiteboard_sessionId_idx').on(table.sessionId),
    Whiteboard_roomId_idx: index('Whiteboard_roomId_idx').on(table.roomId),
    Whiteboard_curriculumId_idx: index('Whiteboard_curriculumId_idx').on(table.curriculumId),
    Whiteboard_lessonId_idx: index('Whiteboard_lessonId_idx').on(table.lessonId),
    Whiteboard_isTemplate_idx: index('Whiteboard_isTemplate_idx').on(table.isTemplate),
    Whiteboard_createdAt_idx: index('Whiteboard_createdAt_idx').on(table.createdAt),
    Whiteboard_visibility_idx: index('Whiteboard_visibility_idx').on(table.visibility),
    Whiteboard_isBroadcasting_idx: index('Whiteboard_isBroadcasting_idx').on(table.isBroadcasting),
    Whiteboard_sessionId_visibility_idx: index('Whiteboard_sessionId_visibility_idx').on(
      table.sessionId,
      table.visibility
    ),
    Whiteboard_sessionId_ownerType_idx: index('Whiteboard_sessionId_ownerType_idx').on(
      table.sessionId,
      table.ownerType
    ),
    Whiteboard_sessionId_ownerId_idx: index('Whiteboard_sessionId_ownerId_idx').on(
      table.sessionId,
      table.ownerId
    ),
  })
)

export const whiteboardPage = pgTable(
  'WhiteboardPage',
  {
    id: text('id').primaryKey().notNull(),
    whiteboardId: text('whiteboardId').notNull(),
    name: text('name').notNull(),
    order: integer('order').notNull(),
    version: integer('version').notNull().default(1),
    backgroundColor: text('backgroundColor'),
    backgroundStyle: text('backgroundStyle'),
    backgroundImage: text('backgroundImage'),
    strokes: jsonb('strokes').notNull(),
    shapes: jsonb('shapes').notNull(),
    texts: jsonb('texts').notNull(),
    images: jsonb('images').notNull(),
    viewState: jsonb('viewState'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
  },
  table => ({
    WhiteboardPage_whiteboardId_idx: index('WhiteboardPage_whiteboardId_idx').on(
      table.whiteboardId
    ),
    WhiteboardPage_order_idx: index('WhiteboardPage_order_idx').on(table.order),
    WhiteboardPage_whiteboardId_order_key: uniqueIndex('WhiteboardPage_whiteboardId_order_key').on(
      table.whiteboardId,
      table.order
    ),
  })
)

export const whiteboardSnapshot = pgTable(
  'WhiteboardSnapshot',
  {
    id: text('id').primaryKey().notNull(),
    whiteboardId: text('whiteboardId').notNull(),
    name: text('name').notNull(),
    thumbnailUrl: text('thumbnailUrl'),
    pages: jsonb('pages').notNull(),
    createdBy: text('createdBy').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    WhiteboardSnapshot_whiteboardId_idx: index('WhiteboardSnapshot_whiteboardId_idx').on(
      table.whiteboardId
    ),
    WhiteboardSnapshot_createdAt_idx: index('WhiteboardSnapshot_createdAt_idx').on(table.createdAt),
  })
)

export const whiteboardSession = pgTable(
  'WhiteboardSession',
  {
    id: text('id').primaryKey().notNull(),
    whiteboardId: text('whiteboardId').notNull(),
    roomId: text('roomId').notNull(),
    tutorId: text('tutorId').notNull(),
    participants: jsonb('participants').notNull(),
    isActive: boolean('isActive').notNull(),
    startedAt: timestamp('startedAt', { withTimezone: true }).notNull().defaultNow(),
    endedAt: timestamp('endedAt', { withTimezone: true }),
    operations: jsonb('operations'),
    finalPageStates: jsonb('finalPageStates'),
  },
  table => ({
    WhiteboardSession_whiteboardId_idx: index('WhiteboardSession_whiteboardId_idx').on(
      table.whiteboardId
    ),
    WhiteboardSession_roomId_idx: index('WhiteboardSession_roomId_idx').on(table.roomId),
    WhiteboardSession_tutorId_idx: index('WhiteboardSession_tutorId_idx').on(table.tutorId),
    WhiteboardSession_isActive_idx: index('WhiteboardSession_isActive_idx').on(table.isActive),
  })
)

export const mathWhiteboardSession = pgTable(
  'MathWhiteboardSession',
  {
    id: text('id').primaryKey().notNull(),
    liveSessionId: text('liveSessionId').notNull(),
    tutorId: text('tutorId').notNull(),
    title: text('title').notNull(),
    description: text('description'),
    status: enums.mathSessionStatusEnum('status').notNull(),
    isLocked: boolean('isLocked').notNull(),
    allowStudentEdit: boolean('allowStudentEdit').notNull(),
    allowStudentTools: boolean('allowStudentTools').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    endedAt: timestamp('endedAt', { withTimezone: true }),
  },
  table => ({
    MathWhiteboardSession_liveSessionId_idx: index('MathWhiteboardSession_liveSessionId_idx').on(
      table.liveSessionId
    ),
    MathWhiteboardSession_tutorId_idx: index('MathWhiteboardSession_tutorId_idx').on(table.tutorId),
    MathWhiteboardSession_status_idx: index('MathWhiteboardSession_status_idx').on(table.status),
    MathWhiteboardSession_createdAt_idx: index('MathWhiteboardSession_createdAt_idx').on(
      table.createdAt
    ),
  })
)

export const mathWhiteboardPage = pgTable(
  'MathWhiteboardPage',
  {
    id: text('id').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    name: text('name').notNull(),
    order: integer('order').notNull(),
    width: integer('width').notNull(),
    height: integer('height').notNull(),
    backgroundType: text('backgroundType').notNull(),
    backgroundColor: text('backgroundColor').notNull(),
    elements: jsonb('elements').notNull(),
    vectorClock: jsonb('vectorClock').notNull(),
    lastModified: timestamp('lastModified', { withTimezone: true })
      .notNull()
      .$onUpdate(() => new Date()),
    modifiedBy: text('modifiedBy'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    MathWhiteboardPage_sessionId_idx: index('MathWhiteboardPage_sessionId_idx').on(table.sessionId),
    MathWhiteboardPage_order_idx: index('MathWhiteboardPage_order_idx').on(table.order),
    MathWhiteboardPage_sessionId_order_key: uniqueIndex(
      'MathWhiteboardPage_sessionId_order_key'
    ).on(table.sessionId, table.order),
  })
)

export const mathWhiteboardParticipant = pgTable(
  'MathWhiteboardParticipant',
  {
    id: text('id').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    userId: text('userId').notNull(),
    role: enums.roleEnum('role').notNull(),
    canEdit: boolean('canEdit').notNull(),
    canChat: boolean('canChat').notNull(),
    canUseAI: boolean('canUseAI').notNull(),
    cursorX: doublePrecision('cursorX'),
    cursorY: doublePrecision('cursorY'),
    cursorColor: text('cursorColor').notNull(),
    isTyping: boolean('isTyping').notNull(),
    joinedAt: timestamp('joinedAt', { withTimezone: true }).notNull().defaultNow(),
    leftAt: timestamp('leftAt', { withTimezone: true }),
  },
  table => ({
    MathWhiteboardParticipant_sessionId_idx: index('MathWhiteboardParticipant_sessionId_idx').on(
      table.sessionId
    ),
    MathWhiteboardParticipant_userId_idx: index('MathWhiteboardParticipant_userId_idx').on(
      table.userId
    ),
    MathWhiteboardParticipant_sessionId_userId_key: uniqueIndex(
      'MathWhiteboardParticipant_sessionId_userId_key'
    ).on(table.sessionId, table.userId),
  })
)

export const mathWhiteboardSnapshot = pgTable(
  'MathWhiteboardSnapshot',
  {
    id: text('id').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    thumbnailUrl: text('thumbnailUrl'),
    pages: jsonb('pages').notNull(),
    viewState: jsonb('viewState'),
    createdBy: text('createdBy').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    MathWhiteboardSnapshot_sessionId_idx: index('MathWhiteboardSnapshot_sessionId_idx').on(
      table.sessionId
    ),
    MathWhiteboardSnapshot_createdAt_idx: index('MathWhiteboardSnapshot_createdAt_idx').on(
      table.createdAt
    ),
  })
)

export const mathAIInteraction = pgTable(
  'MathAIInteraction',
  {
    id: text('id').primaryKey().notNull(),
    sessionId: text('sessionId').notNull(),
    userId: text('userId').notNull(),
    type: enums.mathAIInteractionTypeEnum('type').notNull(),
    inputText: text('inputText'),
    inputLatex: text('inputLatex'),
    inputImage: text('inputImage'),
    output: text('output').notNull(),
    outputLatex: text('outputLatex'),
    modelUsed: text('modelUsed').notNull(),
    latencyMs: integer('latencyMs').notNull(),
    tokensUsed: integer('tokensUsed'),
    steps: jsonb('steps'),
    createdAt: timestamp('createdAt', { withTimezone: true }).notNull().defaultNow(),
  },
  table => ({
    MathAIInteraction_sessionId_idx: index('MathAIInteraction_sessionId_idx').on(table.sessionId),
    MathAIInteraction_type_idx: index('MathAIInteraction_type_idx').on(table.type),
    MathAIInteraction_createdAt_idx: index('MathAIInteraction_createdAt_idx').on(table.createdAt),
  })
)
