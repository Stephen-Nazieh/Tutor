// @ts-nocheck
import { create } from 'zustand'
import { liveClassStore } from './live-class.store'
import { communicationStore } from './communication.store'
import { courseBuilderStore } from './course-builder.store'

export type State = ReturnType<typeof createLiveClassStore> & 
                   ReturnType<typeof createCommunicationStore> & 
                   ReturnType<typeof createCourseBuilderStore>

// Live Class Store
export const useLiveClassStore = liveClassStore

// Communication Store  
export const useCommunicationStore = communicationStore

// Course Builder Store
export const useCourseBuilderStore = courseBuilderStore