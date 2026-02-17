# Architectural Patterns

## Data-Driven UI via JSON

Story content is fully separated from rendering logic. All narrative content lives in
`src/story/story.json` as a flat map of node objects keyed by string IDs. The UI layer
reads and renders this data — it never modifies it.

When adding new story content, edit `story.json` only. When changing how stories are
displayed, edit component files only.

### Story Node Schema

Each node follows this shape (see `src/story/story.json:7-15` for example):

- `title` (string) — heading displayed for the node
- `text` (string) — narrative body text
- `choices` (array) — list of `{ label, nextId }` objects; empty array `[]` marks an ending

The root object has `title`, `author`, `description`, `startNodeId`, and a `nodes` map.
Types are defined in `src/types/story.ts`.

## Node-Based Navigation (Directed Graph)

The story is structured as a directed graph. Each node references other nodes via `nextId`
in its choices. Navigation state is tracked as a history array (`string[]`) in StoryPlayer
— see `src/components/StoryPlayer.tsx:21`. The current node is derived as the last entry
in the history.

Nodes can form cycles (e.g., `glowingPath` links back to `camp` at `src/story/story.json:108`).

## History-Based Back Navigation

Instead of a single `currentNodeId`, StoryPlayer maintains a `history` array. Choosing a
node pushes onto the array; going back pops from it. This enables undo without losing
the forward path context — see `src/components/StoryPlayer.tsx:28-36`.

## Terminal Node Convention

Ending nodes have an empty `choices: []` array. StoryPlayer detects this and renders
EndingScreen (with restart and go-back buttons) — see `src/components/StoryPlayer.tsx:67-72`.

## Defensive Node Lookup

StoryPlayer handles missing/broken node IDs gracefully by checking if the looked-up node
exists before rendering — see `src/components/StoryPlayer.tsx:48-50`. ErrorScreen renders
the broken-link fallback.

## CSS Modules

Each component has a co-located `.module.css` file (e.g., `StoryPlayer.module.css`).
Styles are imported as `styles` and applied via `className={styles.xxx}`. Global styles
in `src/index.css` handle base theming (dark/light mode, typography, button defaults).

## Smart/Presentational Split

StoryPlayer is the single "smart" component that owns all state and logic. Child components
(StoryNode, ChoiceList, EndingScreen, TitleScreen, ErrorScreen) are pure presentational —
they receive data and callbacks via props with no internal state.

## Component Hierarchy

`main.tsx` → `App` → `StoryPlayer` → `TitleScreen` | `StoryNode` + `ChoiceList`/`EndingScreen` | `ErrorScreen`

App (`src/App.tsx:3`) is a thin wrapper. All story logic lives in StoryPlayer.

## State Management

No external state library. StoryPlayer uses two pieces of state:
- `history` (string[]) — navigation history, persisted to localStorage
- `showTitle` (boolean) — whether to show the title screen, persisted to localStorage

Both use the custom `usePersistedState` hook (`src/hooks/usePersistedState.ts`) which
wraps `useState` with automatic localStorage sync. Restart clears persisted state
via `clearPersistedState`.

## Transition Pattern

Node changes use a fade-out/fade-in transition. The `transitionTo` helper in StoryPlayer
(`src/components/StoryPlayer.tsx:38-43`) applies a CSS fade-out class, waits for the
duration, then executes the state change and triggers a CSS fade-in animation via a
changing React `key` on the content wrapper.
