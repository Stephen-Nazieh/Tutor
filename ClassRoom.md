# ClassRoom UX – Findings and Recommendations

Findings and recommendations for the tutor class/teaching page: improving UX and reducing clutter.

---

## Current layout (brief)

- **Top:** Session Timer and Session Agenda (tutor only). Timer shows current phase and progress; agenda lists phases (e.g. Introduction & Ice Breaker, Concept Review, Group Practice, Q&A and Wrap-up) and can be expanded to show the full list with add/edit.
- **Header bar:** Back to dashboard link, title (“Tutor Class Dashboard”), connection status; then a long row of actions: Command (⌘K), Engagement, Polls, Mute, Start Video, Share Screen, Leave, Open Assets (and Return to Classroom when in a breakout).
- **Tabs:** Classroom | Course Dev | Breakout Rooms | AI Assistant (tutor view).
- **Main area:** Whiteboard (grid background) with its own toolbar (pen, eraser, text, shapes, colors, undo/redo, zoom, Clear, Save). Optionally a resizable Assets panel beside the whiteboard.
- **Side panels (tutor):** Engagement Dashboard and Quick Polls open as overlays/panels when their header buttons are toggled.
- **Footer (TutorControls):** Student count, struggling count, three quick-message buttons, whiteboard page navigation (New Page, 1/1, Next Page), broadcast target selector, and broadcast message input.

---

## Findings

### Main control bar (header)

- Many primary actions sit in a single row: Command, Engagement, Polls, Mute, Start Video, Share Screen, Leave, Open Assets. This creates high visual density and cognitive load.
- “Leave” is placed next to frequently used controls (e.g. Share Screen), which increases the risk of accidental clicks.
- **Code:** [tutorme-app/src/app/class/components/ClassRoomContent.tsx](tutorme-app/src/app/class/components/ClassRoomContent.tsx) – header block (approx. lines 633–756).

### Session Agenda

- The Session Agenda is a fixed block rendered above the main header when the timer is shown. When expanded, it stays visible and uses a lot of vertical space.
- There is no option to show it as a slide-out sidebar or to default to collapsed, so the whiteboard gets less space when the agenda is open.
- **Code:** [tutorme-app/src/components/class/session-manager/session-timer.tsx](tutorme-app/src/components/class/session-manager/session-timer.tsx) – “Session Agenda” section and expand/collapse state.

### Navigation

- “Back to dashboard” and “Tutor Class Dashboard” (as the main title) appear in the same header, and the tab row (Classroom, Course Dev, Breakout Rooms, AI Assistant) repeats context. This can feel redundant.
- **Code:** [tutorme-app/src/app/class/components/ClassRoomContent.tsx](tutorme-app/src/app/class/components/ClassRoomContent.tsx) – header and TabsList.

### Critical action placement

- “Leave” (and any “End Class” in related flows) is in the same row as high-frequency actions, with no clear visual separation. The main class view does not consistently use a confirmation dialog before leaving/ending.
- **Code:** [tutorme-app/src/app/class/components/ClassRoomContent.tsx](tutorme-app/src/app/class/components/ClassRoomContent.tsx) – Leave button in header. Compare with [tutorme-app/src/app/tutor/live-class/components/LiveClassHub.tsx](tutorme-app/src/app/tutor/live-class/components/LiveClassHub.tsx) “End Class?” dialog for a safer pattern.

### Footer (TutorControls)

- A single row contains: student count, struggling count, three quick-message buttons, page navigation (New Page, current page, Next), broadcast target dropdown, and broadcast input. On smaller screens this becomes dense and hard to scan.
- **Code:** [tutorme-app/src/components/class/tutor-controls.tsx](tutorme-app/src/components/class/tutor-controls.tsx).

### Whiteboard toolbar

- The whiteboard toolbar (drawing tools, colors, undo/redo, zoom, Clear, Save) is standard and not a major source of clutter. Optional improvement: ensure “Clear” and “Save” are easy to find and not easily confused with destructive actions.
- **Code:** [tutorme-app/src/components/class/simple-whiteboard.tsx](tutorme-app/src/components/class/simple-whiteboard.tsx), [tutorme-app/src/components/class/enhanced-whiteboard.tsx](tutorme-app/src/components/class/enhanced-whiteboard.tsx).

---

## Recommendations

1. **Group header actions (high)**  
   Move Command, Engagement, and Polls into an “Interaction” or “Tools” dropdown/menu. Keep Mute, Start Video, and Share Screen as the main visible media controls. This reduces visible buttons and clarifies hierarchy.  
   **Where:** [tutorme-app/src/app/class/components/ClassRoomContent.tsx](tutorme-app/src/app/class/components/ClassRoomContent.tsx) header – add a grouped menu/dropdown and leave 2–3 primary media buttons visible.

2. **Safer critical action (high)**  
   Separate “Leave” / “End Class” visually (e.g. right-aligned or in a “Session” menu) and always show a confirmation dialog before ending or leaving the class.  
   **Where:** [tutorme-app/src/app/class/components/ClassRoomContent.tsx](tutorme-app/src/app/class/components/ClassRoomContent.tsx) – relocate Leave and add/use a confirmation modal (e.g. similar to LiveClassHub’s “End Class?” dialog).

3. **Collapsible Session Agenda (medium)**  
   Default the agenda to collapsed, or move it into a slide-out sidebar. Expose a compact “Agenda” chip or button that expands the agenda or opens a drawer. This frees vertical space for the whiteboard.  
   **Where:** [tutorme-app/src/components/class/session-manager/session-timer.tsx](tutorme-app/src/components/class/session-manager/session-timer.tsx) – e.g. set default `expanded` to false; or render the agenda in a slide-over panel triggered from ClassRoomContent.

4. **Simplify top navigation (medium)**  
   Use one clear “Back” (to dashboard) and one concise title (e.g. “Class” or the room/session name). Avoid repeating “Tutor Class Dashboard” as both the main title and the tab context.  
   **Where:** [tutorme-app/src/app/class/components/ClassRoomContent.tsx](tutorme-app/src/app/class/components/ClassRoomContent.tsx) – shorten the title or derive it from room/session; keep a single back link.

5. **Footer streamlining (low)**  
   On narrow viewports, put “Quick messages” in an overflow (“More”) menu or show only 1–2. Keep student count and page navigation (New Page, current page, Next) always visible.  
   **Where:** [tutorme-app/src/components/class/tutor-controls.tsx](tutorme-app/src/components/class/tutor-controls.tsx) – responsive layout and an optional “More” for quick messages.

---

## Reference – key files

| Purpose | Path |
|--------|-----|
| Class room page entry | `tutorme-app/src/app/class/[roomId]/page.tsx` |
| Main class UI (header, tabs, layout) | `tutorme-app/src/app/class/components/ClassRoomContent.tsx` |
| Session Timer & Agenda | `tutorme-app/src/components/class/session-manager/session-timer.tsx` |
| Footer (student count, pages, broadcast) | `tutorme-app/src/components/class/tutor-controls.tsx` |
| Command palette (⌘K) | `tutorme-app/src/components/class/command-palette/command-palette.tsx` |
| Engagement dashboard | `tutorme-app/src/components/class/engagement/engagement-dashboard.tsx` |
| Quick Polls | `tutorme-app/src/components/class/polls/quick-poll.tsx` |
| Simple whiteboard | `tutorme-app/src/components/class/simple-whiteboard.tsx` |
| Enhanced whiteboard | `tutorme-app/src/components/class/enhanced-whiteboard.tsx` |
| End Class dialog (reference pattern) | `tutorme-app/src/app/tutor/live-class/components/LiveClassHub.tsx` |
