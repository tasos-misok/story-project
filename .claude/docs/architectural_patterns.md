# Architectural Patterns

## Data-Driven UI via JSON

Story content is fully separated from rendering logic. All narrative content lives in
`src/story/story.json` as a flat map of node objects keyed by string IDs. The UI layer
(`src/components/StoryPlayer.jsx`) only reads and renders this data — it never modifies it.

When adding new story content, edit `story.json` only. When changing how stories are
displayed, edit `StoryPlayer.jsx` only.

### Story Node Schema

Each node in `story.json` follows this shape (see `src/story/story.json:5-13` for example):

- `title` (string) — heading displayed for the node
- `text` (string) — narrative body text
- `choices` (array) — list of `{ label, nextId }` objects; empty array `[]` marks an ending

The root object has `title`, `startNodeId`, and a `nodes` map.

## Node-Based Navigation (Directed Graph)

The story is structured as a directed graph. Each node references other nodes via `nextId`
in its choices. Navigation state is a single string (`currentNodeId`) managed by
`useState` — see `src/components/StoryPlayer.jsx:6`.

Nodes can form cycles (e.g., `glowingPath` links back to `camp` at `src/story/story.json:106`).

## Terminal Node Convention

Ending nodes have an empty `choices: []` array. The StoryPlayer detects this and renders a
"Restart" button instead of choices — see `src/components/StoryPlayer.jsx:42-48`.

## Defensive Node Lookup

StoryPlayer handles missing/broken node IDs gracefully by checking if the looked-up node
exists before rendering — see `src/components/StoryPlayer.jsx:13-23`. This prevents crashes
from typos in `story.json` `nextId` values.

## Inline Styles

StoryPlayer uses inline `style` objects rather than CSS classes for its layout — see
`src/components/StoryPlayer.jsx:26-36`. Global styles in `src/index.css` handle base
theming (dark/light mode, typography, button defaults).

## Component Hierarchy

The app uses a simple delegation chain: `main.jsx` → `App` → `StoryPlayer`.
App (`src/App.jsx:35`) is a thin wrapper that renders StoryPlayer as the sole child.
All story logic lives in StoryPlayer — App exists as the composition root.

## State Management

No external state library. A single `useState` hook in StoryPlayer tracks `currentNodeId`.
The restart function resets it to `story.startNodeId` — see `src/components/StoryPlayer.jsx:10`.
