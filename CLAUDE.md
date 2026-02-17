# Story Project

Interactive choose-your-own-adventure story player. Users read narrative nodes and make
choices that branch the story along different paths in a directed graph.

## Tech Stack

- **React 19** with **TypeScript**
- **Vite 7** — dev server and build tooling
- **Vitest** — test framework
- **ESLint 9** — linting with typescript-eslint, react-hooks, and react-refresh plugins

## Project Structure

```
src/
  main.tsx                  # Entry point — renders App in StrictMode
  App.tsx                   # Root component — delegates to StoryPlayer
  index.css                 # Global theme (dark/light mode, typography, buttons)
  vite-env.d.ts             # Vite client type declarations
  types/
    story.ts                # Shared TypeScript types (Choice, StoryNode, StoryData)
  components/
    StoryPlayer.tsx         # Smart component — owns state, composes child components
    StoryPlayer.module.css
    TitleScreen.tsx          # Title screen with story metadata and start button
    TitleScreen.module.css
    StoryNode.tsx            # Renders node title and text
    StoryNode.module.css
    ChoiceList.tsx           # Renders choice buttons and go-back button
    ChoiceList.module.css
    EndingScreen.tsx         # Restart and go-back buttons for terminal nodes
    EndingScreen.module.css
    ErrorScreen.tsx          # Broken-link error fallback
    ErrorScreen.module.css
  hooks/
    usePersistedState.ts    # Custom hook — useState synced to localStorage
  story/
    story.json              # All story content (node graph with metadata)
    __tests__/
      story.test.ts         # Story graph integrity tests (63 tests)
```

## Commands

| Action        | Command           |
|---------------|-------------------|
| Dev server    | `npm run dev`     |
| Build         | `npm run build`   |
| Preview build | `npm run preview` |
| Lint          | `npm run lint`    |
| Test          | `npm test`        |
| Type check    | `npx tsc -b`     |

## Key Concepts

- **Story data** is a directed graph of nodes defined in `src/story/story.json`
- **Navigation** uses a history array in StoryPlayer — supports going back
- **Persistence** — progress is saved to localStorage via `usePersistedState`
- **Ending nodes** have an empty `choices` array and show restart/go-back buttons
- **Transitions** — fade-in/fade-out CSS animations on node changes
- **Broken links** (invalid `nextId`) are handled defensively — see `src/components/ErrorScreen.tsx`

## Adding Story Content

Edit `src/story/story.json` only. Root object has `title`, `author`, `description`,
`startNodeId`, and `nodes`. Each node needs a unique key and follows:
`{ title, text, choices: [{ label, nextId }] }`. Set `choices: []` for endings.
Run `npm test` to validate the graph integrity after changes.

## Additional Documentation

Check these files when working in their respective areas:

- [Architectural Patterns](.claude/docs/architectural_patterns.md) — data-driven UI,
  node graph navigation, state management, component hierarchy, CSS module conventions
