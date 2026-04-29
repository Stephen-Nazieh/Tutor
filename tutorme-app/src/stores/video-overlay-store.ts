import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type VideoOverlayState = {
  open: boolean
  roomUrl: string | null
  token: string | null
  autoRecord: boolean
  openOverlay: (input: { roomUrl: string; token?: string | null; autoRecord?: boolean }) => void
  closeOverlay: () => void
}

export const useVideoOverlayStore = create<VideoOverlayState>()(
  immer(set => ({
    open: false,
    roomUrl: null,
    token: null,
    autoRecord: false,
    openOverlay: input =>
      set(draft => {
        draft.open = true
        draft.roomUrl = input.roomUrl
        draft.token = input.token || null
        draft.autoRecord = !!input.autoRecord
      }),
    closeOverlay: () =>
      set(draft => {
        draft.open = false
      }),
  }))
)
